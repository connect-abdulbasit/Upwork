import 'dotenv/config';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth/authRoutes';


const app = express();
app.use(express.json());
app.use(cookieParser());    
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers)
}));

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
