import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@top-collective/database";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true, name: true, email: true, phone: true, role: true,
        bio: true, photoUrl: true, isVerified: true, createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
