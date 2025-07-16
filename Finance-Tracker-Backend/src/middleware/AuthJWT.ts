import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, JwtPayload } from '../types';

const VerifyUserJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(403).json({ msg: 'Unauthorized: No token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_USER_KEY!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Unauthorized: Invalid token' });
  }
};

export default VerifyUserJWT;
