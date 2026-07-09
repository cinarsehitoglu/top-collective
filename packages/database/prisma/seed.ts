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
      },
    });
    console.log("Admin user created");
  }

  const catCount = await prisma.category.count();
  if (catCount === 0) {
    await prisma.category.createMany({
      data: [
        { name: "Emlak", slug: "emlak", icon: "building", sortOrder: 1 },
        { name: "Vasıta", slug: "vasita", icon: "car", sortOrder: 2 },
        { name: "İkinci El Eşya", slug: "ikinci-el-esya", icon: "sofa", sortOrder: 3 },
        { name: "Hayvanlar", slug: "hayvanlar", icon: "dog", sortOrder: 4 },
        { name: "İş İlanları", slug: "is-ilanlari", icon: "briefcase", sortOrder: 5 },
        { name: "Hizmetler", slug: "hizmetler", icon: "wrench", sortOrder: 6 },
        { name: "Özel Dersler", slug: "ozel-dersler", icon: "book", sortOrder: 7 },
        { name: "Toplu Satışlıklar", slug: "toplu-satisliklar", icon: "package", sortOrder: 8 },
        { name: "Koleksiyon Ürünleri", slug: "koleksiyon-urunleri", icon: "album", sortOrder: 9 },
      ],
    });
    console.log("Categories seeded");
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
