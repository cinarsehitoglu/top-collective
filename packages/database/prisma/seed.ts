import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminExists = await prisma.user.findUnique({ where: { email: "cinarsehitoglu@gmail.com" } });
  if (!adminExists) {
    const hash = await bcrypt.hash("admin123", 10);
    await prisma.user.create({
      data: {
        name: "Cinar Sehitoglu",
        email: "cinarsehitoglu@gmail.com",
        passwordHash: hash,
        role: "ADMIN",
        badgeColor: "green",
      },
    });
    console.log("Admin user created");
  }

  const catCount = await prisma.category.count();
  if (catCount === 0) {
    await prisma.category.createMany({
      data: [
        { name: "Koleksiyon Ürünleri", slug: "koleksiyon-urunleri", icon: "album", sortOrder: 1 },
        { name: "Oyuncak & Figür", slug: "oyuncak-figur", icon: "dices", sortOrder: 2 },
        { name: "Kart & Oyun", slug: "kart-oyun", icon: "gamepad", sortOrder: 3 },
        { name: "Para & Pul", slug: "para-pul", icon: "coins", sortOrder: 4 },
      ],
    });
    console.log("Categories seeded");
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
