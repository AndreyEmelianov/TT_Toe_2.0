import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: { login: 'user', passwordHash: 'asdfgh', rating: 1000 },
  });
  const user2 = await prisma.user.create({
    data: { login: 'user2', passwordHash: 'asdfgh2', rating: 500 },
  });

  // await prisma.game.create({
  //   data: {
  //     status: 'idle',
  //     field: Array(9).fill(null),
  //     players: {
  //       connect: {
  //         id: user.id,
  //       },
  //     },
  //   },
  // });
  // await prisma.game.create({
  //   data: {
  //     status: 'idle',
  //     field: Array(9).fill(null),
  //     players: {
  //       connect: {
  //         id: user2.id,
  //       },
  //     },
  //   },
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
