"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, Send, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useLang } from "@/context/lang-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { timeAgo } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  listingId?: string;
  sender: { id: string; name: string };
  receiver: { id: string; name: string };
  createdAt: string;
}

export default function MessagesPage() {
  const { user } = useAuth();
  const { t } = useLang();
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sellerId = searchParams.get("sellerId");
  const listingId = searchParams.get("listingId");

  useEffect(() => {
    if (!user) return;
    fetch(`/api/messages?userId=${user.id}`).then(r => r.json()).then(setMessages).catch(() => {});
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!text.trim() || !user || !sellerId || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text.trim(), senderId: user.id, receiverId: sellerId, listingId: listingId || undefined }),
      });
      if (res.ok) {
        const msg = await res.json();
        setMessages(prev => [...prev, msg]);
        setText("");
      }
    } catch {}
    setSending(false);
  };

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <MessageCircle className="h-12 w-12 text-muted-foreground/50" />
        <h2 className="mt-4 text-xl font-semibold">{t("msg.login")}</h2>
        <Link href="/giris"><Button className="mt-4">{t("nav.login")}</Button></Link>
      </div>
    );
  }

  const partnerMessages = sellerId ? messages.filter(m => (m.senderId === user.id && m.receiverId === sellerId) || (m.senderId === sellerId && m.receiverId === user.id)) : messages;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-6">
        {sellerId && (
          <Link href="/mesajlar">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
        )}
        <h1 className="text-2xl font-bold">{sellerId ? "Sohbet" : t("msg.title")}</h1>
      </div>
      {sellerId ? (
        <Card className="p-4 flex flex-col h-[65vh]">
          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            {partnerMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageCircle className="h-8 w-8 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">Mesaj göndererek sohbeti başlat</p>
              </div>
            )}
            {partnerMessages.map((m) => (
              <div key={m.id} className={`flex ${m.senderId === user.id ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-xl px-4 py-2 text-sm ${m.senderId === user.id ? "bg-primary text-white" : "bg-muted"}`}>
                  <p>{m.content}</p>
                  <p className={`text-xs mt-1 ${m.senderId === user.id ? "text-white/70" : "text-muted-foreground"}`}>{timeAgo(m.createdAt)}</p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
            <Input value={text} onChange={(e) => setText(e.target.value)} placeholder={t("msg.placeholder")} />
            <Button type="submit" size="icon" disabled={sending}><Send className="h-4 w-4" /></Button>
          </form>
        </Card>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <p className="mt-4">Bir ilan detay sayfasından mesaj gönderebilirsin.</p>
        </div>
      )}
    </div>
  );
}