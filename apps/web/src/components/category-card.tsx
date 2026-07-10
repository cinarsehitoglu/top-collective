import Link from "next/link";
import { Album, Dices, Gamepad2, Coins, Package } from "lucide-react";
import type { Category } from "@/data/mock";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  album: Album,
  dices: Dices,
  gamepad: Gamepad2,
  coins: Coins,
};

export function CategoryCard({ category }: { category: Category }) {
  const Icon = iconMap[category.icon] || Package;

  return (
    <Link
      href={`/kategori/${category.slug}`}
      className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border bg-gradient-to-b from-card to-muted/30 p-6 transition-all hover:border-primary/50 hover:shadow-md"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 transition-transform group-hover:scale-110">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <span className="text-base font-semibold text-center">{category.name}</span>
      <span className="text-xs text-muted-foreground">{category.count.toLocaleString("tr-TR")} ilan</span>
    </Link>
  );
}
