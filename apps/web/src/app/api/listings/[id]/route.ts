import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@top-collective/database";

async function getCurrentUserId(req: NextRequest): Promise<string | null> {
  const email = req.headers.get("x-user-email");
  if (!email) return null;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user?.id || null;
  } catch { return null; }
}

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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getCurrentUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const listing = await prisma.listing.findUnique({ where: { id: params.id } });
    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const isAdmin = user?.role === "ADMIN";

    if (listing.userId !== userId && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.listingImage.deleteMany({ where: { listingId: params.id } });
    await prisma.listing.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
