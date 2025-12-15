import jwt from 'jsonwebtoken';

export const generateAccessToken = (user: { id: string; role: string }) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '30d',
  });
};
