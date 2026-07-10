import Link from "next/link";
import { Album, Dices, Gamepad2, Palette, Radio, Package } from "lucide-react";
import type { Category } from "@/data/mock";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  album: Album,
  dices: Dices,
  gamepad: Gamepad2,
  palette: Palette,
  radio: Radio,
};

export function CategoryCard({ category }: { category: Category }) {
  const Icon = iconMap[category.icon] || Package;

  return (
    <Link
      href={`/kategori/${category.slug}`}
      className="flex flex-col items-center gap-2 rounded-xl border p-4 transition-all hover:border-primary hover:shadow-sm"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <span className="text-sm font-medium text-center">{category.name}</span>
      <span className="text-xs text-muted-foreground">{category.count.toLocaleString("tr-TR")} ilan</span>
    </Link>
  );
}
