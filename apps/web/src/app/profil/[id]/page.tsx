"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useLang } from "@/context/lang-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, ShieldCheck, Shield, Award, MessageCircle, Check } from "lucide-react";
import { ListingCard } from "@/components/listing-card";

export default function ProfilePage() {
  const params = useParams();
  const { user: currentUser, refreshUsers } = useAuth();
  const { t } = useLang();
  const [profile, setProfile] = useState<any | null>(undefined);
  const [listings, setListings] = useState<any[]>([]);

  const fetchProfile = () => {
    fetch(`/api/users/${params.id}`).then(r => {
      if (!r.ok) { setProfile(null); return; }
      return r.json();
    }).then(data => {
      setProfile(data);
      if (data?.id) {
        fetch(`/api/listings?userId=${data.id}`).then(r => r.json()).then(setListings).catch(() => {});
      }
    }).catch(() => setProfile(null));
  };

  useEffect(() => { fetchProfile(); }, [params.id]);

  const toggleBadge = async () => {
    if (!currentUser || currentUser.role !== "ADMIN") return;
    const res = await fetch("/api/admin/badge-color", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminId: currentUser.id }),
    });
    if (res.ok) { fetchProfile(); refreshUsers(); }
  };

  const toggleTrusted = async () => {
    if (!currentUser || currentUser.role !== "ADMIN" || !profile) return;
    const res = await fetch("/api/admin/badge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: profile.id, adminId: currentUser.id }),
    });
    if (res.ok) { fetchProfile(); }
  };

  if (profile === undefined) return <div className="p-8 text-center text-muted-foreground">{t("loading")}</div>;
  if (profile === null) notFound();

  const isAdmin = profile.role === "ADMIN";
  const isOwnProfile = currentUser?.id === profile.id;
  const badgeColor = profile.badgeColor || "green";
  const isTrusted = profile.badge === "trusted";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary shrink-0">
              {profile.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                {isAdmin && (
                  <Badge className={badgeColor === "green" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}>
                    {badgeColor === "green" ? <ShieldCheck className="mr-1 h-3 w-3" /> : <Shield className="mr-1 h-3 w-3" />}
                    {t("profile.admin")}
                  </Badge>
                )}
                {isTrusted && (
                  <Badge className="bg-red-500 hover:bg-red-600">
                    <Check className="mr-1 h-3 w-3" />{t("profile.trusted")}
                  </Badge>
                )}
              </div>
              <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="h-4 w-4" />{profile.email}</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{t("profile.join")}: {new Date(profile.createdAt).toLocaleDateString("tr-TR")}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {currentUser && currentUser.id !== profile.id && (
                  <Button size="sm" variant="outline"><MessageCircle className="mr-1 h-4 w-4" />{t("detail.sendmsg")}</Button>
                )}
                {isOwnProfile && isAdmin && (
                  <Button size="sm" variant="outline" onClick={toggleBadge}>
                    <Award className="mr-1 h-4 w-4" />{t("profile.badge.toggle")}
                  </Button>
                )}
                {currentUser?.role === "ADMIN" && !isOwnProfile && (
                  <Button size="sm" variant={isTrusted ? "destructive" : "default"} onClick={toggleTrusted}>
                    <Check className="mr-1 h-4 w-4" />{isTrusted ? t("profile.badge.remove") : t("profile.badge.give")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">{t("profile.listings")}</h2>
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 text-center">
            <p className="text-muted-foreground">{t("profile.nolistings")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
