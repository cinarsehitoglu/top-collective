"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useLang } from "@/context/lang-context";
import Link from "next/link";

const MAX_IMAGES = 5;
const MAX_SIZE_MB = 100;

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function CreateListingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useLang();
  const fileRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<{ dataUrl: string; name: string }[]>([]);
  const [imageError, setImageError] = useState("");
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("TRY");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/categories").then(r => r.json()).then(setCategories).catch(() => {});
  }, []);

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-xl font-semibold">{t("create.login")}</h2>
        <Link href="/giris"><Button className="mt-4">{t("nav.login")}</Button></Link>
      </div>
    );
  }

  const addImages = async (files: FileList | null) => {
    setImageError("");
    if (!files) return;
    const arr = Array.from(files);
    for (const f of arr) {
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        setImageError(`${f.name} çok büyük (max ${MAX_SIZE_MB}MB)`);
        continue;
      }
      if (!f.type.startsWith("image/")) {
        setImageError(`${f.name} bir resim dosyası değil`);
        continue;
      }
      if (images.length >= MAX_IMAGES) {
        setImageError(`En fazla ${MAX_IMAGES} fotoğraf eklenebilir`);
        break;
      }
      const dataUrl = await readAsDataURL(f);
      setImages((prev) => [...prev, { dataUrl, name: f.name }]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description: desc,
          price: Number(price),
          currency,
          location,
          categoryId,
          userId: user.id,
          images: images.map((img) => img.dataUrl),
        }),
      });
      if (res.ok) router.push("/");
    } catch {}
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold">{t("create.title")}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">{t("create.photos")}</CardTitle></CardHeader>
          <CardContent>
            {imageError && (
              <div className="mb-3 flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-950 p-3 text-sm text-red-600 dark:text-red-400">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                {imageError}
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative h-28 w-28 overflow-hidden rounded-lg border dark:border-gray-700">
                  <img src={img.dataUrl} alt="" className="h-full w-full object-cover" />
                  <button type="button" onClick={() => removeImage(i)}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {images.length < MAX_IMAGES && (
                <label className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed hover:border-primary">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <span className="mt-1 text-xs text-muted-foreground">{images.length === 0 ? t("create.addphoto") : t("create.addmore")}</span>
                  <input ref={fileRef} type="file" className="hidden" accept="image/*" multiple
                    onChange={(e) => { addImages(e.target.files); e.target.value = ""; }} />
                </label>
              )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Masaüstünden veya telefonundan fotoğraf seç. Max {MAX_IMAGES} fotoğraf, her biri max {MAX_SIZE_MB}MB.</p>
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
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Kategori seçin</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
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
