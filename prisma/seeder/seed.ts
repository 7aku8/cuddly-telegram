import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  console.info('Start seeding...');

  console.info('Seeding users finished!');
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(0);
  })
  .finally(() => prisma.$disconnect() as unknown as void);
