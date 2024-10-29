import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/encryption'; // Gunakan fungsi hashPassword yang sudah dibuat

const prisma = new PrismaClient();

async function main() {
  const superAdmin = await prisma.users.upsert({
    where: { email: 'mufid@admin.com' },
    update: {},
    create: {
      username: 'mufid',
      email: 'mufid@admin.com',
      password: await hashPassword('@Password'),
      role: 'ADMIN',
      profile: {
        create: {
          fullname: 'Mufid',
          phone: '+62 8820 0633 9191',
          avatar: 'https://wallpapercave.com/wp/wp12549694.jpg',
        },
      },
    },
  });

  console.log({ superAdmin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
