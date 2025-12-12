import express from 'express';
import userRoutes from './modules/user/user.routes';
import authRoutes from './modules/auth/auth.routes';

const app = express();

app.use(express.json());

// routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

export default app;