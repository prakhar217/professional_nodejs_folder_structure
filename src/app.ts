import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./modules/user/user.routes";
import authRoutes from "./modules/auth/auth.routes";
import errorHandler from "./middleware/errorHandler";
import httpLogger from "./middleware/httpLogger";
import helmet from "helmet";
import cors from "cors";
import { corsOptions } from "./config/cors";
import { apiLimiter } from "./middleware/rateLimiters";

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(cors(corsOptions));

app.use(httpLogger); // ⬅ FIRST (request lifecycle)
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.use('/api', apiLimiter);

app.use(errorHandler); // ⬅ LAST (error capture)

app.disable('x-powered-by');


export default app;
