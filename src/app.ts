import express from "express";
import cookieParser from "cookie-parser";
import authV1Routes from './modules/api/v1/auth.routes';
import userV1Routes from './modules/api/v1/user.routes';
import errorHandler from "./middleware/errorHandler";
import httpLogger from "./middleware/httpLogger";
import helmet from "helmet";
import cors from "cors";
import { corsOptions } from "./config/cors";
import { apiLimiter } from "./middleware/rateLimiters";
import './lib/openapi'; // MUST be first
import { setupSwagger } from "./docs/v1/swagger";

const app = express();

setupSwagger(app);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(cors(corsOptions));

app.use(httpLogger); // ⬅ FIRST (request lifecycle)
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authV1Routes);
app.use('/api/v1/users', userV1Routes);

app.use('/api', apiLimiter);

app.use(errorHandler); // ⬅ LAST (error capture)

app.disable('x-powered-by');


export default app;
