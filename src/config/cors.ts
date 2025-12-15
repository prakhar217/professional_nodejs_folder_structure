import { CorsOptions } from 'cors';
import { env } from './env';

export const corsOptions: CorsOptions = {
  origin: env.CORS_ORIGIN ? env.CORS_ORIGIN.split(',') : false,
  credentials: true,
};
