import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authRepository } from './auth.repository';
import prisma from '../../config/prisma';
import { generateAccessToken, generateRefreshToken } from './auth.utils';

export const authService = {
  register: async (data: { name: string; email: string; password: string }) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword
      }
    });

    return user;
  },

  login: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const accessToken = generateAccessToken({id:user.id , role : user.role});
    const refreshToken = generateRefreshToken(user.id);

    await authRepository.createRefreshToken({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken };
  },

  refresh: async (token: string) => {
    const storedToken = await authRepository.findRefreshToken(token);

    if (!storedToken || storedToken.revoked) throw new Error('Invalid token');

    const { userId } = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as any;

    const newAccessToken = generateAccessToken(userId);
    const newRefreshToken = generateRefreshToken(userId);

    await authRepository.revokeToken(token);

    await authRepository.createRefreshToken({
      userId,
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 30 * 86400 * 1000),
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
};
