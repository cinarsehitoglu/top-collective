"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, User, Package } from "lucide-react";
import { useAuth } from "@/context/auth-context";

interface SearchResult {
  type: "user" | "listing";
  id: string;
  title: string;
  subtitle: string;
}

export function SearchBar({ large }: { large?: boolean }) {
  const router = useRouter();
  const { users } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!query.trim()) { setResults([]); setOpen(false); return; }
    const q = query.toLowerCase();
    const matches: SearchResult[] = [];

    users.forEach((u) => {
      if (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) {
        matches.push({ type: "user", id: u.id, title: u.name, subtitle: u.email });
      }
    });

    try {
      const listings = JSON.parse(localStorage.getItem("tc_listings") || "[]");
      listings.forEach((l: any) => {
        if (l.title?.toLowerCase().includes(q)) {
          matches.push({ type: "listing", id: l.id, title: l.title, subtitle: `${l.price} ${l.currency}` });
        }
      });
    } catch {}

    setResults(matches.slice(0, 6));
    setOpen(matches.length > 0);
  }, [query, users]);

  const go = (result: SearchResult) => {
    setOpen(false);
    setQuery("");
    router.push(result.type === "user" ? `/profil/${result.id}` : `/ilan/${result.id}`);
  };

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Ürün, kategori veya kullanıcı ara..."
        className={`pl-9 ${large ? "h-12 text-base" : ""}`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => { if (results.length > 0) setOpen(true); }}
      />
      {open && (
        <div className="absolute top-full mt-1 w-full rounded-lg border bg-white shadow-lg z-50">
          {results.map((r) => (
            <button
              key={r.type + r.id}
              onClick={() => go(r)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                {r.type === "user" ? <User className="h-4 w-4 text-primary" /> : <Package className="h-4 w-4 text-primary" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{r.title}</p>
                <p className="text-xs text-muted-foreground truncate">{r.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
