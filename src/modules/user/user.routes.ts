import { Router } from 'express';
import { authenticate } from '../../middleware/authMiddleware';
import { authorize } from '../../middleware/authorize';
import { asyncHandler } from '../../utils/asyncHandler';
import { getAllUsers } from './user.controller';

const router = Router();

// Only ADMIN can access
router.get(
  '/',
  authenticate,
  authorize('ADMIN'),
  asyncHandler(getAllUsers)
);

export default router;
