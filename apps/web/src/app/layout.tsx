import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider } from "@/context/theme-context";
import { LangProvider } from "@/context/lang-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Top Collective",
  description: "İkinci el ve sıfır ürünler, hizmet ilanları - Türkiye'nin en güvenilir pazaryeri",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <LangProvider>
        <ThemeProvider>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
        </ThemeProvider>
        </LangProvider>
      </body>
    </html>
  );
}
