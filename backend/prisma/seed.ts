import bcrypt from "bcrypt";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("SafargoAdmin!2026", 12);

  await prisma.user.upsert({
    where: { email: "admin@safargo.local" },
    update: {},
    create: {
      email: "admin@safargo.local",
      name: "Safargo Admin",
      role: Role.ADMIN,
      passwordHash,
      homeAirport: "JFK",
      travelStyle: "curated"
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
