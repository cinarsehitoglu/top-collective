import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@top-collective/database";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    const where = q
      ? {
          OR: [
            { name: { contains: q } },
            { email: { contains: q } },
          ],
        }
      : {};

    const users = await prisma.user.findMany({
      where,
      select: { id: true, name: true, email: true, role: true, badge: true, badgeColor: true, createdAt: true },
      take: 20,
    });

    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
