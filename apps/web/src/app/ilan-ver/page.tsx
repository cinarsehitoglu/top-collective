"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageOff } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useLang } from "@/context/lang-context";
import { categories } from "@/data/mock";
import Link from "next/link";

export default function CreateListingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useLang();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("TRY");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-xl font-semibold">{t("create.login")}</h2>
        <Link href="/giris"><Button className="mt-4">{t("nav.login")}</Button></Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;
    const listing = {
      id: "ilan-" + Date.now(),
      title, category, price: Number(price), currency, location, description: desc,
      userId: user.id, createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("tc_listings") || "[]");
    existing.unshift(listing);
    localStorage.setItem("tc_listings", JSON.stringify(existing));
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold">{t("create.title")}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">{t("create.photos")}</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 rounded-lg border-2 border-dashed p-6 text-sm text-muted-foreground">
              <ImageOff className="h-5 w-5 shrink-0" />
              <span>Görsel desteği henüz aktif değil. İlanını yayınladıktan sonra daha sonra ekleyebilirsin.</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">{t("create.info")}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("create.titlelabel")} *</label>
              <Input placeholder="Örn: iPhone 15 Pro Max 256GB" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("create.category")}</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">{t("create.category")} seçin</option>
                {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("create.price")} *</label>
                <Input type="number" placeholder="0" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("create.currency")}</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="TRY">TL</option><option value="USD">USD</option><option value="EUR">EUR</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("create.location")}</label>
              <Input placeholder="Örn: İstanbul / Kadıköy" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("create.description")}</label>
              <textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Ürününüz hakkında detaylı bilgi verin..." value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button type="submit">{t("create.publish")}</Button>
        </div>
      </form>
    </div>
  );
}
