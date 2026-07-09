"use client";

import { useParams, notFound } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, ShieldCheck, MessageCircle } from "lucide-react";

export default function ProfilePage() {
  const params = useParams();
  const { getUserById, user: currentUser } = useAuth();
  const profile = getUserById(params.id as string);

  if (!profile) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary shrink-0">
              {profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                {profile.role === "admin" && (
                  <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                    <ShieldCheck className="mr-1 h-3 w-3" />
                    Admin
                  </Badge>
                )}
              </div>
              <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Katılım: {new Date(profile.createdAt).toLocaleDateString("tr-TR")}
                </span>
              </div>
              {currentUser && currentUser.id !== profile.id && (
                <Button className="mt-4">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Mesaj Gönder
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">İlanları</h2>
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 text-center">
          <p className="text-muted-foreground">Henüz ilanı bulunmuyor.</p>
        </div>
      </div>
    </div>
  );
}
