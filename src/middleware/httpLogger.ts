import pinoHttp from 'pino-http';
import logger from '../utils/logger';
import { randomUUID } from 'crypto';

const httpLogger = pinoHttp({
  logger,
  genReqId: (req) => {
    return req.headers['x-request-id'] as string || randomUUID();
  },
  customLogLevel: (res, err) => {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
});

export default httpLogger;
