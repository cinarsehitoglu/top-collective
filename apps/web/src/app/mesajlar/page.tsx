"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useLang } from "@/context/lang-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { timeAgo } from "@/lib/utils";

interface ChatMessage {
  id: string; from: string; text: string; time: string;
}

const STORAGE_KEY = "tc_messages";

function loadMessages(): ChatMessage[] {
  try { const d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : []; } catch { return []; }
}
function saveMessages(msgs: ChatMessage[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs)); }

export default function MessagesPage() {
  const { user } = useAuth();
  const { t } = useLang();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");

  useEffect(() => { setMessages(loadMessages()); }, []);

  const send = () => {
    if (!text.trim() || !user) return;
    const msg: ChatMessage = { id: Date.now().toString(), from: user.id, text: text.trim(), time: new Date().toISOString() };
    const updated = [...messages, msg];
    setMessages(updated); saveMessages(updated); setText("");
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

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">{t("msg.title")}</h1>
      <Card className="p-4 flex flex-col h-[60vh]">
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <MessageCircle className="h-8 w-8 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">{t("msg.empty")}</p>
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === user.id ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-xl px-4 py-2 text-sm ${m.from === user.id ? "bg-primary text-white" : "bg-muted"}`}>
                <p>{m.text}</p>
                <p className={`text-xs mt-1 ${m.from === user.id ? "text-white/70" : "text-muted-foreground"}`}>{timeAgo(m.time)}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder={t("msg.placeholder")} />
          <Button type="submit" size="icon"><Send className="h-4 w-4" /></Button>
        </form>
      </Card>
    </div>
  );
}
