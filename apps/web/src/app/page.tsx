"use client";

import { useState, useEffect } from "react";
import { categories } from "@/data/mock";
import { CategoryCard } from "@/components/category-card";
import { ListingCard } from "@/components/listing-card";
import { Search, SlidersHorizontal, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ListingItem } from "@/data/mock";
import { SearchBar } from "@/components/search-bar";

export default function HomePage() {
  const [listings, setListings] = useState<ListingItem[]>([]);

  useEffect(() => {
    try {
      const data = localStorage.getItem("tc_listings");
      if (data) setListings(JSON.parse(data));
    } catch {}
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-b from-primary/5 to-background pb-8 pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Alışverişin Yeni Adresi
            </h1>
            <p className="mt-2 text-muted-foreground">
              İkinci el veya sıfır ürünler, hizmet ilanları — aradığın her şey burada
            </p>
            <div className="mt-6 flex gap-2">
              <div className="flex-1 max-w-md">
                <SearchBar large />
              </div>
              <Button variant="outline" size="icon" className="h-12 w-12 shrink-0">
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-semibold">Kategoriler</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-semibold">İlanlar</h2>
          {listings.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {listings.map((listing: ListingItem) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-16 text-center">
              <Inbox className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium text-muted-foreground">Henüz ilan verilmedi</h3>
              <p className="mt-1 text-sm text-muted-foreground/70">İlk ilanı sen ver, topluluğa katkıda bulun!</p>
              <a href="/ilan-ver">
                <Button className="mt-6">İlan Ver</Button>
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Neden Top Collective?</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border bg-white p-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">1</div>
              <h3 className="mt-4 font-semibold">Güvenli Alışveriş</h3>
              <p className="mt-2 text-sm text-muted-foreground">Doğrulanmış kullanıcılar ve güvenli ödeme altyapısı</p>
            </div>
            <div className="rounded-xl border bg-white p-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">2</div>
              <h3 className="mt-4 font-semibold">Kolay Kullanım</h3>
              <p className="mt-2 text-sm text-muted-foreground">Adım adım ilan verme, akıllı filtreleme</p>
            </div>
            <div className="rounded-xl border bg-white p-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">3</div>
              <h3 className="mt-4 font-semibold">Ücretsiz İlan</h3>
              <p className="mt-2 text-sm text-muted-foreground">Temel ilan verme tamamen ücretsiz</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
