import { Router } from 'express';
import { login, register, refreshToken } from './auth.controller';
import { validate } from '../../middleware/validateRequest';
import { loginSchema, registerSchema, refreshSchema } from './auth.validation';
import { authLimiter } from '../../middleware/rateLimiters';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', authLimiter,validate(loginSchema), login);
router.post('/refresh', validate(refreshSchema), refreshToken);

export default router;
