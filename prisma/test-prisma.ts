import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  console.log('Testing Prisma connection...');
  const users = await prisma.user.findMany();
  console.log('Users:', users);
}

test()
  .catch(console.error)
  .finally(() => prisma.$disconnect());