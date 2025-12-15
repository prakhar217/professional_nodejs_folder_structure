import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../utils/apiError';

export const authorize =
  (...allowedRoles: Array<'USER' | 'ADMIN'>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      throw new ForbiddenError('You are not allowed to perform this action');
    }

    next();
  };
