import { NextRequest, NextResponse } from "next/server";
import { prisma, Prisma } from "@top-collective/database";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    const categorySlug = searchParams.get("category");
    const userId = searchParams.get("userId");

    const where: Prisma.ListingWhereInput = { status: "ACTIVE" };

    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    if (userId) {
      where.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where,
      include: {
        user: { select: { id: true, name: true } },
        category: { select: { id: true, name: true, slug: true } },
        images: { orderBy: { sortOrder: "asc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(listings);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, price, categoryId, userId, images } = body;

    if (!title || !description || !price || !categoryId || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        categoryId,
        userId,
        images: images?.length
          ? { create: images.map((url: string, i: number) => ({ url, sortOrder: i })) }
          : undefined,
      },
      include: {
        user: { select: { id: true, name: true } },
        category: { select: { id: true, name: true, slug: true } },
        images: { orderBy: { sortOrder: "asc" } },
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
