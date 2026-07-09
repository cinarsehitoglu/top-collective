"use client";

import { useParams, notFound } from "next/navigation";
import { categories } from "@/data/mock";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CategoryPage() {
  const params = useParams();
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{category.name}</h1>
        <p className="text-muted-foreground">Bu kategoride henüz ilan bulunmuyor.</p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-16 text-center">
        <Inbox className="h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-medium text-muted-foreground">Henüz ilan verilmedi</h3>
        <p className="mt-1 text-sm text-muted-foreground/70">Bu kategoride ilk ilanı sen ver!</p>
        <Link href="/ilan-ver">
          <Button className="mt-6">İlan Ver</Button>
        </Link>
      </div>
    </div>
  );
}
