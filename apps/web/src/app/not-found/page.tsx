"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLang } from "@/context/lang-context";

export default function NotFound() {
  const { t } = useLang();
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground/30">404</h1>
      <h2 className="mt-4 text-xl font-semibold">{t("404.title")}</h2>
      <p className="mt-2 text-muted-foreground">{t("404.desc")}</p>
      <Link href="/"><Button className="mt-6">{t("404.home")}</Button></Link>
    </div>
  );
}
