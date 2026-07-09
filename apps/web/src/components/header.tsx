"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle, MessageCircle, User, Bell, LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            TC
          </div>
          <span className="text-xl font-bold">Top Collective</span>
        </Link>

        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Ne arıyorsunuz?" className="pl-9" />
          </div>
          <Button variant="outline" size="sm" className="hidden md:flex">
            Kategoriler
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Link href="/ilan-ver">
                <Button size="sm" className="hidden sm:flex">
                  <PlusCircle className="mr-1 h-4 w-4" />
                  İlan Ver
                </Button>
              </Link>
              <div className="flex items-center gap-1 pl-2 border-l">
                <Link href={`/profil/${user.id}`}>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      {user.name.charAt(0)}
                    </div>
                    <span className="hidden text-sm font-medium md:inline">{user.name}</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={logout} title="Çıkış">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/giris">
                <Button variant="outline" size="sm">
                  <User className="mr-1 h-4 w-4" />
                  <span className="hidden sm:inline">Giriş Yap</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
