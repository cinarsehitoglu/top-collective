"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = await register(name, email, password, phone);
    if (ok) {
      router.push("/");
    } else {
      setError("Bu e-posta adresi zaten kayıtlı.");
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Kayıt Ol</CardTitle>
          <CardDescription>Ücretsiz hesap oluştur, ilan vermeye başla</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Ad Soyad</label>
              <Input placeholder="Adınız ve soyadınız" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">E-posta</label>
              <Input type="email" placeholder="ornek@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Telefon</label>
              <Input type="tel" placeholder="05XX XXX XX XX" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Şifre</label>
              <Input type="password" placeholder="En az 3 karakter" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={3} />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">Kayıt Ol</Button>
            <div className="text-center text-sm text-muted-foreground">
              <Link href="/giris" className="text-primary hover:underline">
                Zaten hesabın var mı? Giriş Yap
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
