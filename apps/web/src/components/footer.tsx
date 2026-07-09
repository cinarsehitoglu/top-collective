import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold">Top Collective</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/hakkimizda">Hakkımızda</Link></li>
              <li><Link href="/iletisim">İletişim</Link></li>
              <li><Link href="/kariyer">Kariyer</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Kategoriler</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/kategori/emlak">Emlak</Link></li>
              <li><Link href="/kategori/vasita">Vasıta</Link></li>
              <li><Link href="/kategori/ikinci-el">İkinci El</Link></li>
              <li><Link href="/kategori/hizmetler">Hizmetler</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Yardım</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/yardim">Yardım Merkezi</Link></li>
              <li><Link href="/guvenlik">Güvenlik</Link></li>
              <li><Link href="/kvkk">KVKK</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Bizi Takip Edin</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Instagram</li>
              <li>Twitter / X</li>
              <li>Facebook</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; 2026 Top Collective. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
