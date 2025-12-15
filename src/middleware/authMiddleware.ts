import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/apiError';
import { JwtPayload } from '../modules/auth/auth.types';
import { env } from '../config/env';
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('Missing or invalid authorization header');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token,
      env.ACCESS_TOKEN_SECRET
    ) as JwtPayload;

    req.user = decoded; // ✅ attach user context
    next();
  } catch (error) {
    throw new UnauthorizedError('Invalid or expired access token');
  }
};
