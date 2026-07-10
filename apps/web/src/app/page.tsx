"use client";

import { useState, useEffect } from "react";
import { CategoryCard } from "@/components/category-card";
import { ListingCard } from "@/components/listing-card";
import { Search, Sparkles, Users, Package, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ListingItem } from "@/data/mock";
import { SearchBar } from "@/components/search-bar";
import { useLang } from "@/context/lang-context";

export default function HomePage() {
  const { t } = useLang();
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/listings").then(r => r.json()).then(setListings).catch(() => {});
    fetch("/api/categories").then(r => r.json()).then(setCategories).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/[0.07] via-background to-purple-500/[0.04] pb-8 pt-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/[0.06] via-transparent to-transparent" />
        <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-purple-500/[0.03] blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border bg-background/70 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Koleksiyoncular için özel platform
            </div>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Koleksiyonluk parçaları al, sat, keşfet. Tutkularını paylaşan koleksiyoncularla buluş.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="flex-1 max-w-md">
                <SearchBar large />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">{t("home.categories")}</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-lg font-semibold">{t("home.listings")}</h2>
          {listings.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {listings.map((listing: ListingItem) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border bg-gradient-to-b from-muted/40 to-background py-20 text-center">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.04] via-transparent to-transparent" />
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted/50">
                <Package className="h-10 w-10 text-muted-foreground/40" />
              </div>
              <h3 className="mt-5 text-base font-medium text-muted-foreground">{t("home.nolistings")}</h3>
              <p className="mt-1 text-sm text-muted-foreground/60">{t("home.nolistings.desc")}</p>
              <a href="/ilan-ver">
                <Button className="mt-6" size="default">{t("home.create")}</Button>
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold">{t("home.why")}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">Koleksiyonculuk deneyimini bir üst seviyeye taşı</p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="group relative rounded-2xl border bg-card p-7 transition-all hover:border-primary/40 hover:shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/[0.12] to-purple-500/[0.12] text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{t("why.safe")}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{t("why.safe.desc")}</p>
            </div>
            <div className="group relative rounded-2xl border bg-card p-7 transition-all hover:border-primary/40 hover:shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/[0.12] to-purple-500/[0.12] text-primary">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{t("why.easy")}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{t("why.easy.desc")}</p>
            </div>
            <div className="group relative rounded-2xl border bg-card p-7 transition-all hover:border-primary/40 hover:shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/[0.12] to-purple-500/[0.12] text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{t("why.free")}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{t("why.free.desc")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
