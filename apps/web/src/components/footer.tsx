"use client";

import Link from "next/link";
import { useLang } from "@/context/lang-context";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold">{t("site.title")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/hakkimizda">{t("footer.about")}</Link></li>
              <li><Link href="/iletisim">{t("footer.contact")}</Link></li>
              <li><Link href="/kariyer">{t("footer.career")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">{t("nav.categories")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/kategori/emlak">Emlak</Link></li>
              <li><Link href="/kategori/vasita">Vasıta</Link></li>
              <li><Link href="/kategori/ikinci-el-esya">İkinci El</Link></li>
              <li><Link href="/kategori/hizmetler">Hizmetler</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">{t("footer.help")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/yardim">{t("footer.helpcenter")}</Link></li>
              <li><Link href="/guvenlik">{t("footer.security")}</Link></li>
              <li><Link href="/kvkk">{t("footer.kvkk")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">{t("footer.follow")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Instagram</li>
              <li>Twitter / X</li>
              <li>Facebook</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t dark:border-gray-700 pt-8 text-center text-sm text-muted-foreground">
          &copy; 2026 {t("site.title")}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
