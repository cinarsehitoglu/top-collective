"use client";

import { MessageCircle } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MessagesPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <MessageCircle className="h-12 w-12 text-muted-foreground/50" />
        <h2 className="mt-4 text-xl font-semibold">Mesajları Görmek İçin Giriş Yap</h2>
        <Link href="/giris">
          <Button className="mt-4">Giriş Yap</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Mesajlar</h1>
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-16 text-center">
        <MessageCircle className="h-12 w-12 text-muted-foreground/50" />
        <p className="mt-4 text-muted-foreground">Henüz mesajın yok.</p>
      </div>
    </div>
  );
}
