"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/context/lang-context";
import { ListingCard } from "@/components/listing-card";
import Link from "next/link";

export default function CategoryPage() {
  const params = useParams();
  const { t } = useLang();
  const [category, setCategory] = useState<any | null>(undefined);
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/categories").then(r => r.json()).then(cats => {
      const c = cats.find((x: any) => x.slug === params.slug);
      setCategory(c || null);
      if (c) {
        fetch(`/api/listings?category=${c.slug}`).then(r => r.json()).then(setListings).catch(() => {});
      }
    }).catch(() => setCategory(null));
  }, [params.slug]);

  if (category === undefined) return <div className="p-8 text-center text-muted-foreground">{t("loading")}</div>;
  if (category === null) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{category.name}</h1>
        <p className="text-muted-foreground">{t("category.nolistings")}</p>
      </div>
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-16 text-center">
          <Inbox className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium text-muted-foreground">{t("category.nolistings")}</h3>
          <p className="mt-1 text-sm text-muted-foreground/70">{t("category.nolistings.desc")}</p>
          <Link href="/ilan-ver"><Button className="mt-6">{t("home.create")}</Button></Link>
        </div>
      )}
    </div>
  );
}
