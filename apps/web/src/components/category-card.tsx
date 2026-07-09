import Link from "next/link";
import { Building2, Car, Sofa, Dog, Briefcase, Wrench, Book, Package } from "lucide-react";
import type { Category } from "@/data/mock";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  building: Building2,
  car: Car,
  sofa: Sofa,
  dog: Dog,
  briefcase: Briefcase,
  wrench: Wrench,
  book: Book,
  package: Package,
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
