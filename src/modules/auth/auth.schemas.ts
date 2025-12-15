import { z } from '../../lib/openapi';

export const LoginBodySchema = z
  .object({
    email: z.string().email().openapi({ example: 'user@example.com' }),
    password: z.string().min(6).openapi({ example: 'password123' }),
  })
  .openapi('LoginBody');

export const RegisterBodySchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  })
  .openapi('RegisterBody');

export const AuthResponseSchema = z
  .object({
    accessToken: z.string(),
  })
  .openapi('AuthResponse');
