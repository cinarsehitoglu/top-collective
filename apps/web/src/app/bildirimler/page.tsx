"use client";

import { Bell, Info, ShoppingBag, Star } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useLang } from "@/context/lang-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { timeAgo } from "@/lib/utils";

const demos = [
  { id: "1", icon: Info, titleKey: "notif.demo1", descKey: "notif.demo1.desc", time: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
  { id: "2", icon: ShoppingBag, titleKey: "notif.demo2", descKey: "notif.demo2.desc", time: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: "3", icon: Star, titleKey: "notif.demo3", descKey: "notif.demo3.desc", time: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
];

export default function NotificationsPage() {
  const { user } = useAuth();
  const { t } = useLang();

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <Bell className="h-12 w-12 text-muted-foreground/50" />
        <h2 className="mt-4 text-xl font-semibold">{t("notif.login")}</h2>
        <Link href="/giris"><Button className="mt-4">{t("nav.login")}</Button></Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">{t("notif.title")}</h1>
      <div className="space-y-2">
        {demos.map((n) => {
          const Icon = n.icon;
          return (
            <Card key={n.id} className="p-4 flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{t(n.titleKey)}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{timeAgo(n.time)}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
