import { z } from 'zod';
import {
  LoginBodySchema,
  RegisterBodySchema,
} from './auth.schemas';

export const loginSchema = z.object({
  body: LoginBodySchema,
});

export const registerSchema = z.object({
  body: RegisterBodySchema,
});
