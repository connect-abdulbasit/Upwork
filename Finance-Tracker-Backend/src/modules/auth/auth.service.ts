import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db, schema } from '../../../database';
import { eq } from 'drizzle-orm';
import { SignupRequest, SigninRequest } from '../../types';

export async function signupUser({ email, password, firstName, lastName }: SignupRequest) {
  const existingUser = await db.query.users.findFirst({
    where: eq(schema.users.email, email),
  });

  if (existingUser) throw new Error('Email already in use');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db.insert(schema.users).values({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  }).returning({ id: schema.users.id });

  const token = jwt.sign(
    { userId: newUser[0].id, email },
    process.env.JWT_USER_KEY!,
    { expiresIn: '1h' }
  );

  return { token, email };
}

export async function signinUser({ email, password }: SigninRequest) {
  const user = await db.query.users.findFirst({
    where: eq(schema.users.email, email),
  });

  if (!user) throw new Error('Invalid email or password');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Invalid email or password');

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_USER_KEY!,
    { expiresIn: '1h' }
  );

  return { token, email };
}
