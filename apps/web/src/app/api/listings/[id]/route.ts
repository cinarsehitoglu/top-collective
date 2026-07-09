import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@top-collective/database";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true, photoUrl: true, createdAt: true } },
        category: { select: { id: true, name: true, slug: true } },
        images: { orderBy: { sortOrder: "asc" } },
      },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
