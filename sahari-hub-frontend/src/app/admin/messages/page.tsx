"use client";

import { useState, useEffect } from "react";
import { contactApi } from "@/lib/api";
import { ContactMessage } from "@/lib/types";
import { Mail, MailOpen, CheckCircle, User, Clock } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    try {
      const data = await contactApi.list();
      setMessages(data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (msg: ContactMessage) => {
    if (msg.isRead) return;
    try {
      await contactApi.markAsRead(msg.id);
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
      );
      if (selected?.id === msg.id) {
        setSelected({ ...msg, isRead: true });
      }
    } catch {
      /* ignore */
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display-lg-mobile text-primary">Messages</h1>
        {unreadCount > 0 && (
          <span className="bg-error text-white text-sm font-bold px-3 py-1 rounded-full">
            {unreadCount} unread
          </span>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-surface-container rounded-xl h-64" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-24">
          <Mail className="w-16 h-16 text-outline-variant/30 mx-auto mb-4" />
          <p className="font-body-lg text-on-surface-variant">No messages yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Message List */}
          <div className="flex flex-col gap-3 lg:col-span-1">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => { setSelected(msg); handleMarkAsRead(msg); }}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selected?.id === msg.id
                    ? "border-muted-gold bg-tertiary-fixed/20 shadow-sm"
                    : msg.isRead
                    ? "border-surface-container bg-background hover:bg-surface-container-low"
                    : "border-muted-gold/30 bg-background hover:bg-tertiary-fixed/10 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-label-md ${msg.isRead ? "text-on-surface-variant" : "text-primary font-bold"}`}>
                    {msg.name}
                  </span>
                  {!msg.isRead && (
                    <span className="w-2 h-2 rounded-full bg-muted-gold" />
                  )}
                </div>
                <p className="font-body-sm text-on-surface-variant line-clamp-2">{msg.message}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="w-3 h-3 text-on-surface-variant/50" />
                  <span className="text-xs text-on-surface-variant/50">
                    {new Date(msg.createdAt).toLocaleDateString("en-IN", {
                      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-headline-md text-primary">{selected.name}</h3>
                      <div className="flex items-center gap-2">
                        {selected.email && (
                          <a href={`mailto:${selected.email}`} className="font-body-sm text-muted-gold hover:underline">
                            {selected.email}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  {selected.isRead ? (
                    <span className="flex items-center gap-1 text-sm text-on-surface-variant">
                      <MailOpen className="w-4 h-4" /> Read
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm text-muted-gold font-bold">
                      <Mail className="w-4 h-4" /> Unread
                    </span>
                  )}
                </div>

                <div className="border-t border-surface-container pt-6">
                  <p className="font-body-md text-on-surface leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>

                <div className="border-t border-surface-container mt-6 pt-4 flex items-center justify-between">
                  <span className="font-body-sm text-on-surface-variant">
                    Received {new Date(selected.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                  {selected.email && (
                    <a
                      href={`mailto:${selected.email}?subject=Re: Your message to Sahari Hub`}
                      className="bg-primary text-white font-label-md uppercase tracking-widest px-6 py-2 hover:bg-secondary transition-colors shadow-sm text-sm"
                    >
                      Reply via Email
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8 flex flex-col items-center justify-center h-64 text-on-surface-variant">
                <Mail className="w-12 h-12 mb-3 opacity-30" />
                <p className="font-body-md">Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
