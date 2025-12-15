import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './modules/user/user.routes';
import authRoutes from './modules/auth/auth.routes';
import errorHandler from './middleware/errorHandler';
import httpLogger from './middleware/httpLogger';

const app = express();

app.use(httpLogger);        // ⬅ FIRST (request lifecycle)
app.use(express.json());
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);      // ⬅ LAST (error capture)

export default app;
