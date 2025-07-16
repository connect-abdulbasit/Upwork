import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { SignupRequest, SigninRequest } from '../../types';
import { signupUser, signinUser } from './auth.service';

const router = express.Router();
router.use(cookieParser());

router.post('/signup', async (req: Request<{}, {}, SignupRequest>, res: Response): Promise<void> => {
  try {
    const { token, email } = await signupUser(req.body);

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
    if (err instanceof Error && err.message === 'Email already in use') {
      res.status(409).json({ msg: 'Email already in use' });
    } else {
      res.status(500).json({ msg: 'Server error' });
    }
  }
});

router.post('/signin', async (req: Request<{}, {}, SigninRequest>, res: Response): Promise<void> => {
  try {
    const { token, email } = await signinUser(req.body);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 60 * 60 * 1000,
    });

    console.log(`${email} logged in successfully`);
    res.json({ msg: 'Signin successful' });
  } catch (err) {
    console.error(err);
    if (err instanceof Error && err.message === 'Invalid email or password') {
      res.status(401).json({ msg: 'Invalid email or password' });
    } else {
      res.status(500).json({ msg: 'Server error' });
    }
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
