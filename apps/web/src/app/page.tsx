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
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-purple-500/5 pb-10 pt-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Koleksiyoncular için özel platform
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Koleksiyonunu{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Büyüt
              </span>
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Koleksiyonluk parçaları al, sat, keşfet. Tutkularını paylaşan koleksiyoncularla buluş.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="flex-1 max-w-lg">
                <SearchBar large />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-semibold">{t("home.categories")}</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-xl font-semibold">{t("home.listings")}</h2>
          {listings.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {listings.map((listing: ListingItem) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border bg-gradient-to-b from-muted/50 to-background py-20 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
              <Package className="h-16 w-16 text-muted-foreground/30" />
              <h3 className="mt-4 text-lg font-medium text-muted-foreground">{t("home.nolistings")}</h3>
              <p className="mt-1 text-sm text-muted-foreground/70">{t("home.nolistings.desc")}</p>
              <a href="/ilan-ver">
                <Button className="mt-6" size="lg">{t("home.create")}</Button>
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-b from-muted/30 to-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">{t("home.why")}</h2>
            <p className="mt-2 text-muted-foreground">Koleksiyonculuk deneyimini bir üst seviyeye taşı</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="group relative rounded-2xl border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{t("why.safe")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t("why.safe.desc")}</p>
            </div>
            <div className="group relative rounded-2xl border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary">
                <Search className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{t("why.easy")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t("why.easy.desc")}</p>
            </div>
            <div className="group relative rounded-2xl border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{t("why.free")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t("why.free.desc")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
