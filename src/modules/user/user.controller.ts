import { Request, Response } from 'express';

export const getAllUsers = async (req: Request, res: Response) => {
  const currentUserId = req.user?.userId;

  res.json({
    success: true,
    message: `Hello user ${currentUserId}`,
  });
};
