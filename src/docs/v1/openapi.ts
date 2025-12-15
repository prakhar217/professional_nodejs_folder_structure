import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import { LoginBodySchema , RegisterBodySchema , AuthResponseSchema} from '../../modules/auth/auth.schemas';

export const registry = new OpenAPIRegistry();

// Schemas
registry.register('LoginBody', LoginBodySchema);
registry.register('RegisterBody', RegisterBodySchema);
registry.register('AuthResponse', AuthResponseSchema);

// Paths
registry.registerPath({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: LoginBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Login success',
      content: {
        'application/json': {
          schema: AuthResponseSchema,
        },
      },
    },
  },
});

export const openApiDocument = new OpenApiGeneratorV3(
  registry.definitions
).generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'Backend API',
    version: 'v1',
  },
  servers: [{ url: '/api/v1' }],
});
