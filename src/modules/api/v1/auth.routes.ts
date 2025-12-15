import { Router } from 'express';
import { login, register , refreshToken } from '../../auth/auth.controller';
import { validate } from '../../../middleware/validateRequest';
import { loginSchema , registerSchema} from '../../auth/auth.validation';
import { authLimiter } from '../../../middleware/rateLimiters';


const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/refresh', refreshToken);

export default router;
