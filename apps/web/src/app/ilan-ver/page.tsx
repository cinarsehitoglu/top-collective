"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { categories } from "@/data/mock";
import Link from "next/link";

export default function CreateListingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("TRY");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-xl font-semibold">İlan Vermek İçin Giriş Yap</h2>
        <Link href="/giris"><Button className="mt-4">Giriş Yap</Button></Link>
      </div>
    );
  }

  const addImages = (files: FileList | null) => {
    if (!files) return;
    const newImages = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 10));
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;
    const listing = {
      id: "ilan-" + Date.now(),
      title,
      category,
      price: Number(price),
      currency,
      location,
      description: desc,
      imageCount: images.length,
      userId: user.id,
      createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("tc_listings") || "[]");
    existing.unshift(listing);
    localStorage.setItem("tc_listings", JSON.stringify(existing));
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold">İlan Ver</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fotoğraflar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative h-28 w-28 overflow-hidden rounded-lg border">
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {images.length < 10 && (
                <label className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed hover:border-primary">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <span className="mt-1 text-xs text-muted-foreground">{images.length === 0 ? "Fotoğraf Ekle" : "Devam"}</span>
                  <input ref={fileRef} type="file" className="hidden" accept="image/*" multiple onChange={(e) => { addImages(e.target.files); e.target.value = ""; }} />
                </label>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">İlan Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Başlık *</label>
              <Input placeholder="Örn: iPhone 15 Pro Max 256GB" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Kategori</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Kategori seçin</option>
                {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fiyat *</label>
                <Input type="number" placeholder="0" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Para Birimi</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="TRY">TL</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Konum</label>
              <Input placeholder="Örn: İstanbul / Kadıköy" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Açıklama</label>
              <textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Ürününüz hakkında detaylı bilgi verin..." value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="submit">Yayınla</Button>
        </div>
      </form>
    </div>
  );
}
