import prisma from '../../config/prisma';

export const userRepository = {
  findAll: () => {
    return prisma.user.findMany();
  },

  findById: (id: string) => {
    return prisma.user.findUnique({ where: { id } });
  },

  create: (data: { name: string; email: string; password: string }) => {
    return prisma.user.create({ data });
  },
};
