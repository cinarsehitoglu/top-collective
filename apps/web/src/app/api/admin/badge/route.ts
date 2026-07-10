import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@top-collective/database";

export async function POST(req: NextRequest) {
  try {
    const { userId, adminId } = await req.json();
    if (!userId || !adminId) {
      return NextResponse.json({ error: "userId and adminId required" }, { status: 400 });
    }

    const admin = await prisma.user.findUnique({ where: { id: adminId } });
    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const target = await prisma.user.findUnique({ where: { id: userId } });
    if (!target) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newBadge = target.badge === "trusted" ? null : "trusted";
    await prisma.user.update({ where: { id: userId }, data: { badge: newBadge } });

    return NextResponse.json({ badge: newBadge });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
