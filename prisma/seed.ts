import { PrismaClient, Role, Level } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function cleanDatabase() {
  await prisma.booking.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  console.log('Starting database seed...');
  
  await cleanDatabase();
  
  // Create admin user
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@studio-elan.fr',
      name: 'Admin',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });
  
  // Create test client
  const clientPassword = await hash('client123', 10);
  const client = await prisma.user.create({
    data: {
      email: 'client@example.com',
      name: 'Test Client',
      password: clientPassword,
      role: Role.CLIENT,
    },
  });

  // Create courses
  const courses = [
    {
      title: 'Yoga Vinyasa',
      description: 'Un style dynamique qui synchronise le mouvement avec la respiration.',
      price: 25,
      duration: 60,
      level: Level.ALL_LEVELS,
      capacity: 15,
    },
    {
      title: 'Yoga Doux',
      description: 'Une pratique douce et accessible, parfaite pour les débutants.',
      price: 22,
      duration: 60,
      level: Level.BEGINNER,
      capacity: 12,
    },
    {
      title: 'Méditation',
      description: 'Séances guidées pour apaiser l'esprit et développer la pleine conscience.',
      price: 18,
      duration: 45,
      level: Level.ALL_LEVELS,
      capacity: 20,
    },
  ];

  const createdCourses = await Promise.all(
    courses.map(course => 
      prisma.course.create({
        data: course,
      })
    )
  );

  // Create sample bookings
  const bookings = [
    {
      userId: client.id,
      courseId: createdCourses[0].id,
      date: new Date('2025-01-15T10:00:00Z'),
      status: 'CONFIRMED',
    },
    {
      userId: client.id,
      courseId: createdCourses[1].id,
      date: new Date('2025-01-16T14:00:00Z'),
      status: 'PENDING',
    },
  ];

  await Promise.all(
    bookings.map(booking =>
      prisma.booking.create({
        data: booking,
      })
    )
  );

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });