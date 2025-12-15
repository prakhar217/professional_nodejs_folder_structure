import express from 'express';
import userRoutes from './modules/user/user.routes';
import authRoutes from './modules/auth/auth.routes';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(express.json());

// routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Global Error Handler (must be last)
app.use(errorHandler);

export default app;