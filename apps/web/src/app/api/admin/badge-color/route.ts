import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@top-collective/database";

export async function POST(req: NextRequest) {
  try {
    const { adminId } = await req.json();
    if (!adminId) {
      return NextResponse.json({ error: "adminId required" }, { status: 400 });
    }

    const admin = await prisma.user.findUnique({ where: { id: adminId } });
    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const newColor = admin.badgeColor === "green" ? "red" : "green";
    await prisma.user.update({ where: { id: adminId }, data: { badgeColor: newColor } });

    return NextResponse.json({ badgeColor: newColor });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
