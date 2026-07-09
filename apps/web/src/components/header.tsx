"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, MessageCircle, User, Bell, LogOut, Moon, Sun, Globe } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useTheme } from "@/context/theme-context";
import { useLang } from "@/context/lang-context";
import { SearchBar } from "@/components/search-bar";

export function Header() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const { t, lang, setLang } = useLang();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-extrabold tracking-tight">Top Collective</span>
        </Link>

        <div className="flex flex-1 items-center gap-2">
          <SearchBar />
          <Button variant="outline" size="sm" className="hidden md:flex">
            {t("nav.categories")}
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => setLang(lang === "tr" ? "en" : "tr")} title={t("language")}>
            <Globe className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggle} title={theme === "light" ? t("nav.dark") : t("nav.light")}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          {user ? (
            <>
              <Link href="/bildirimler">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/mesajlar">
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/ilan-ver">
                <Button size="sm" className="hidden sm:flex">
                  <PlusCircle className="mr-1 h-4 w-4" />
                  {t("nav.create")}
                </Button>
              </Link>
              <div className="flex items-center gap-1 pl-2 border-l dark:border-gray-700">
                <Link href={`/profil/${user.id}`}>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      {user.name.charAt(0)}
                    </div>
                    <span className="hidden text-sm font-medium md:inline">{user.name}</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={logout} title={t("nav.logout")}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/giris">
                <Button variant="outline" size="sm">
                  <User className="mr-1 h-4 w-4" />
                  <span className="hidden sm:inline">{t("nav.login")}</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
