import swaggerUi from 'swagger-ui-express';
import { openApiDocument } from './openapi';
import { Express } from 'express';

export const setupSwagger = (app: Express) => {
  app.use('/docs/v1', swaggerUi.serve, swaggerUi.setup(openApiDocument));
};
