import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@studio-elan.fr' },
    update: {},
    create: {
      email: 'admin@studio-elan.fr',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create sample courses
  const courses = [
    {
      title: 'Yoga Vinyasa',
      description: 'Un style dynamique qui synchronise le mouvement avec la respiration.',
      price: 25,
      duration: 60,
      level: 'ALL_LEVELS',
      capacity: 15,
    },
    {
      title: 'Yoga Doux',
      description: 'Une pratique douce et accessible, parfaite pour les débutants.',
      price: 22,
      duration: 60,
      level: 'BEGINNER',
      capacity: 12,
    }
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { title: course.title },
      update: {},
      create: course,
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });