import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground/30">404</h1>
      <h2 className="mt-4 text-xl font-semibold">Sayfa Bulunamadı</h2>
      <p className="mt-2 text-muted-foreground">Aradığın sayfa mevcut değil veya kaldırılmış.</p>
      <Link href="/" className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Ana Sayfaya Dön</Link>
    </div>
  );
}
