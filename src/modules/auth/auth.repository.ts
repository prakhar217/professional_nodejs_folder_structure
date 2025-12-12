import prisma from '../../config/prisma';

export const authRepository = {
  createRefreshToken: (data: { userId: string; token: string; expiresAt: Date }) =>
    prisma.refreshToken.create({ data }),

  findRefreshToken: (token: string) =>
    prisma.refreshToken.findUnique({ where: { token } }),

  revokeToken: (token: string) =>
    prisma.refreshToken.update({
      where: { token },
      data: { revoked: true }
    }),
};
