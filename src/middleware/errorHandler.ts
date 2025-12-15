import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';
import logger from '../utils/logger';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(
    {
      err,
      requestId: req.id,
      path: req.path,
      method: req.method,
    },
    'Unhandled error'
  );

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};

export default errorHandler;
