"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function CreateListingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold">İlan Ver</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fotoğraflar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <label className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed hover:border-primary">
                <Upload className="h-6 w-6 text-muted-foreground" />
                <span className="mt-1 text-xs text-muted-foreground">Fotoğraf Ekle</span>
                <input type="file" className="hidden" accept="image/*" multiple />
              </label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">İlan Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Başlık</label>
              <Input placeholder="Örn: iPhone 15 Pro Max 256GB" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Kategori</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">Kategori seçin</option>
                <option value="emlak">Emlak</option>
                <option value="vasita">Vasıta</option>
                <option value="ikinci-el">İkinci El Eşya</option>
                <option value="hizmet">Hizmetler</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fiyat</label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Para Birimi</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="TRY">TL</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Konum</label>
              <Input placeholder="Örn: İstanbul / Kadıköy" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Açıklama</label>
              <textarea
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Ürününüz hakkında detaylı bilgi verin..."
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Taslak Kaydet</Button>
          <Button>Yayınla</Button>
        </div>
      </div>
    </div>
  );
}
