// src/routes/auth.routes.ts
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../../database';
import { SignupRequest, SigninRequest } from '../../types';

const router = express.Router();
router.use(cookieParser());

router.post('/signup', async (req: Request<{}, {}, SignupRequest>, res: Response): Promise<void>     => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    if (existingUser) {
      res.status(409).json({ msg: 'Email already in use' });
      return;
    }

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

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 60 * 60 * 1000,
    });

    console.log(`${email} signed up successfully`);
    res.status(201).json({ msg: 'Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
    return;
  }
});

router.post('/signin', async (req: Request<{}, {}, SigninRequest>, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    if (!user) {
      res.status(401).json({ msg: 'Invalid email or password' });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ msg: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_USER_KEY!,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 60 * 60 * 1000,
    });

    console.log(`${user.email} logged in successfully`);
    res.json({ msg: 'Signin successful' });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/logout', (_req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  });
  console.log('User logged out');
  res.json({ msg: 'Logged out successfully' });
});

export default router;
