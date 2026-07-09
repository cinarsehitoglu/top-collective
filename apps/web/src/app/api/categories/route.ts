import { NextResponse } from "next/server";
import { prisma } from "@top-collective/database";

export async function GET() {
  try {
    const cats = await prisma.category.findMany({
      where: { isActive: true },
      include: { _count: { select: { listings: true } } },
      orderBy: { sortOrder: "asc" },
    });

    const result = cats.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      icon: c.icon || "package",
      count: c._count.listings,
    }));

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
