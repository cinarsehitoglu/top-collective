"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, MessageCircle, Heart, Share2, Flag, Trash2 } from "lucide-react";
import { formatPrice, timeAgo } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { useLang } from "@/context/lang-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const { t } = useLang();
  const [listing, setListing] = useState<any | undefined>(undefined);
  const [seller, setSeller] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/listings/${params.id}`).then(r => {
      if (!r.ok) { setListing(null); return; }
      return r.json();
    }).then(data => {
      setListing(data);
      if (data?.userId) {
        fetch(`/api/users/${data.userId}`).then(r => r.ok && r.json()).then(s => setSeller(s)).catch(() => {});
      }
    }).catch(() => setListing(null));
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm("İlanı silmek istediğine emin misin?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/listings/${params.id}`, { method: "DELETE" });
      if (res.ok) router.push("/");
      else alert("Silinirken hata oluştu");
    } catch { alert("Silinirken hata oluştu"); }
    setDeleting(false);
  };

  if (listing === undefined) return <div className="p-8 text-center text-muted-foreground">{t("loading")}</div>;
  if (listing === null) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-center overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 h-80">
            <img src={listing.images?.[0]?.url || listing.images?.[0] || "/placeholder.svg"} alt={listing.title} className="h-full w-full object-cover" />
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  {listing.category && <Badge variant="secondary" className="mb-2">{listing.category.name}</Badge>}
                  <h1 className="text-2xl font-bold">{listing.title}</h1>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon"><Heart className="h-5 w-5" /></Button>
                  <Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button>
                </div>
              </div>
              <p className="mt-4 text-3xl font-bold text-primary">{formatPrice(listing.price, listing.currency)}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                {listing.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{listing.location}</span>}
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{timeAgo(listing.createdAt)}</span>
              </div>
              {listing.description && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">{t("detail.description")}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{listing.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Link href={seller ? `/profil/${seller.id}` : "#"} className="flex items-center gap-3 hover:opacity-80">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  {seller ? seller.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div>
                  <p className="font-medium">{seller?.name || "?"}</p>
                  <p className="text-sm text-muted-foreground">{listing.images?.length || 0} {t("detail.images")}</p>
                </div>
              </Link>
              {currentUser && currentUser.id !== listing.userId && (
                <Button className="w-full"><MessageCircle className="mr-2 h-4 w-4" />{t("detail.sendmsg")}</Button>
              )}
              <Button variant="outline" className="w-full"><Heart className="mr-2 h-4 w-4" />{t("detail.favorite")}</Button>
              {currentUser && (currentUser.id === listing.userId || (currentUser as any).role === "ADMIN") && (
                <Button variant="outline" className="w-full text-destructive hover:text-destructive" onClick={handleDelete} disabled={deleting}>
                  <Trash2 className="mr-2 h-4 w-4" />{deleting ? "Siliniyor..." : "İlanı Sil"}
                </Button>
              )}
            </CardContent>
          </Card>
          <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
            <Flag className="mr-2 h-4 w-4" />{t("detail.report")}
          </Button>
        </div>
      </div>
    </div>
  );
}
