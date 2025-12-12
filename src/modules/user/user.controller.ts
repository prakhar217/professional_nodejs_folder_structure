import { Request, Response } from 'express';
import { userService } from './user.service';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json({ success: true, data: users });
};
