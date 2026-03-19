import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, MessageSquare, X, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import thomasEriksenProfil from "@/assets/thomas-eriksen-profil.jpg";
import jonRichardProfil from "@/assets/jon-richard-nygaard-profil.jpg";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const SLACK_CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/slack-chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: { role: string; content: string }[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: "Nettverksfeil" }));
    onError(err.error || "Noe gikk galt");
    return;
  }

  if (!resp.body) { onError("Ingen respons"); return; }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });

    let nl: number;
    while ((nl = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, nl);
      buf = buf.slice(nl + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { onDone(); return; }
      try {
        const parsed = JSON.parse(json);
        const c = parsed.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch { /* partial chunk, wait */ }
    }
  }
  onDone();
}

type Mode = "bot" | "slack";
type SlackRecipient = { name: string; image: string; email: string } | null;

interface Message {
  role: "assistant" | "user";
  content: string;
  avatar?: string;
  name?: string;
}

const DEFAULT_SLACK_CONTACTS = [
  { name: "Thomas Eriksen", image: thomasEriksenProfil, email: "Daglig leder og Partner" },
  { name: "Jon Richard Nygaard", image: jonRichardProfil, email: "Partner" },
];

const BOT_SUGGESTIONS = [
  { label: "Kjernekompetanse", query: "Hva er STACQs kjernekompetanse?" },
  { label: "Stilling ledig", query: "Har dere ledige stillinger?" },
  { label: "Håndbok", query: "Fortell meg om håndboken deres" },
];


const FloatingChat = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [slackContacts, setSlackContacts] = useState(DEFAULT_SLACK_CONTACTS);

  useEffect(() => {
    supabase
      .from("consultants")
      .select("name, image_url")
      .in("name", ["Thomas Eriksen", "Jon Richard Nygaard"])
      .then(({ data }) => {
        if (data) {
          setSlackContacts((prev) =>
            prev.map((c) => {
              const match = data.find((d) => d.name === c.name);
              return match?.image_url ? { ...c, image: match.image_url } : c;
            })
          );
        }
      });
  }, []);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState<Mode>("slack");
  const [slackRecipient, setSlackRecipient] = useState<SlackRecipient>(null);
  const [botMessages, setBotMessages] = useState<Message[]>([
    { role: "assistant", content: "Hei! Jeg er STACQs assistent. Spør meg om kompetanse, stillinger, eller håndboken vår." },
  ]);
  const [slackMessages, setSlackMessages] = useState<Record<string, Message[]>>({});
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  

  const currentSlackMessages = slackRecipient ? (slackMessages[slackRecipient.name] || []) : [];
  const messages = mode === "bot" ? botMessages : currentSlackMessages;

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  useEffect(() => { scrollToBottom(); }, [botMessages, slackMessages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && isExpanded && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isExpanded]);

  const handleOpen = () => { setIsOpen(true); setIsExpanded(false); };
  const handleClose = () => { setIsOpen(false); setIsExpanded(false); };
  const handleExpand = () => { setIsExpanded(true); };

  const handleSend = useCallback(
    (text?: string) => {
      const msg = (text || input).trim();
      if (!msg || isTyping) return;
      setInput("");

      if (mode === "bot") {
        const userMsg = { role: "user" as const, content: msg };
        setBotMessages((prev) => [...prev, userMsg]);
        setIsTyping(true);
        const allMessages = [...botMessages, userMsg].map((m) => ({ role: m.role, content: m.content }));
        let assistantSoFar = "";
        streamChat({
          messages: allMessages,
          onDelta: (chunk) => {
            assistantSoFar += chunk;
            setBotMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && prev.length > botMessages.length + 1) {
                return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
              }
              return [...prev, { role: "assistant" as const, content: assistantSoFar }];
            });
            setIsTyping(false);
          },
          onDone: () => setIsTyping(false),
          onError: (errMsg) => { setIsTyping(false); toast.error(errMsg); },
        });
      } else if (slackRecipient) {
        const name = slackRecipient.name;
        const image = slackRecipient.image;
        setSlackMessages((prev) => ({
          ...prev,
          [name]: [...(prev[name] || []), { role: "user", content: msg }],
        }));
        setIsTyping(true);

        // Send to Slack via edge function
        fetch(SLACK_CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ recipient: name, message: msg }),
        })
          .then(async (resp) => {
            if (!resp.ok) {
              const err = await resp.json().catch(() => ({ error: "Nettverksfeil" }));
              throw new Error(err.error || "Kunne ikke sende melding");
            }
            setSlackMessages((prev) => ({
              ...prev,
              [name]: [...(prev[name] || []), {
                role: "assistant",
                content: `Meldingen din er sendt til ${name}. Du vil få svar på e-post eller telefon.`,
                avatar: image,
                name,
              }],
            }));
          })
          .catch((err) => {
            toast.error(err.message || "Kunne ikke sende melding");
          })
          .finally(() => setIsTyping(false));
      }
    },
    [input, isTyping, mode, slackRecipient]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleModeSwitch = (newMode: Mode) => {
    setMode(newMode);
    setSlackRecipient(null);
    if (!isExpanded) setIsExpanded(true);
  };

  const selectRecipient = (contact: typeof DEFAULT_SLACK_CONTACTS[0]) => {
    setSlackRecipient(contact);
    if (!slackMessages[contact.name]) {
      setSlackMessages((prev) => ({
        ...prev,
        [contact.name]: [
          { role: "assistant", content: `Hei! Send meg en melding så svarer jeg så fort jeg kan.`, avatar: contact.image, name: contact.name },
        ],
      }));
    }
  };

  const showContactPicker = mode === "slack" && !slackRecipient;

  const tabBtn = (m: Mode, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => m === mode && isExpanded ? null : handleModeSwitch(m)}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-mono tracking-[0.02em] transition-colors duration-300 ${
        mode === m
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
      style={{ borderRadius: '2px' }}
    >
      {icon}
      {label}
    </button>
  );

  // Bubble state (closed)
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpen}
          className="w-14 h-14 bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:opacity-90 transition-opacity"
          style={{ borderRadius: '2px' }}
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      </div>
    );
  }

  // Compact bar state
  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)]">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-card border border-border overflow-hidden"
          style={{ borderRadius: '2px' }}
        >
          <div className="px-3 py-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={handleExpand}
                onClick={handleExpand}
                placeholder="Send oss en Slack melding"
                className="flex-1 bg-background text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-[15px] font-mono outline-none border border-border focus:border-primary/40 transition-colors"
                style={{ borderRadius: '2px' }}
              />
              <button
                onClick={handleExpand}
                className="flex items-center justify-center w-9 h-9 bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex-shrink-0"
                style={{ borderRadius: '2px' }}
              >
                <Send className="w-4 h-4" />
              </button>
              <button
                onClick={handleClose}
                className="flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Expanded full chat
  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)]">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-card border border-border flex flex-col overflow-hidden"
        style={{ borderRadius: '2px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border">
          <div className="flex items-center gap-1">
            {tabBtn("slack", <MessageSquare className="w-3.5 h-3.5" />, "Ekte mennesker")}
            {tabBtn("bot", <Bot className="w-3.5 h-3.5" />, "STACQ-AI")}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(false)}
              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              title="Minimer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col overflow-hidden" style={{ height: 420 }}>
          {showContactPicker ? (
            <div className="flex-1 px-4 py-4 flex flex-col gap-3">
              <p className="text-[12px] text-muted-foreground font-mono">Hvem vil du sende melding til?</p>
              {slackContacts.map((contact) => (
                <button
                  key={contact.name}
                  onClick={() => selectRecipient(contact)}
                  className="flex items-center gap-4 p-4 border border-border hover:border-primary transition-colors cursor-pointer text-left group"
                  style={{ borderRadius: '2px' }}
                >
                  <div className="avatar-square" style={{ width: 56, height: 56, flexShrink: 0, borderRadius: 0, overflow: 'hidden' }}>
                    <img src={contact.image} alt={contact.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: 0, display: 'block' }} />
                  </div>
                  <div>
                    <span className="text-[13px] font-medium text-foreground block font-mono">{contact.name}</span>
                    <span className="text-[11px] text-muted-foreground font-mono">{contact.email}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <>
              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {mode === "slack" && slackRecipient && (
                  <button
                    onClick={() => setSlackRecipient(null)}
                    className="text-[11px] text-muted-foreground hover:text-foreground transition-colors mb-1 font-mono"
                  >
                    ← Velg annen person
                  </button>
                )}

                {messages.map((msg, i) => (
                  <div key={`${mode}-${slackRecipient?.name || ""}-${i}`} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && msg.avatar && (
                      <div className="avatar-square" style={{ width: 28, height: 28, flexShrink: 0, borderRadius: 0, overflow: 'hidden', marginRight: 8, marginTop: 4 }}>
                        <img src={msg.avatar} alt={msg.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: 0, display: 'block' }} />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2.5 text-[15px] font-mono leading-[1.75] whitespace-pre-line ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground"
                      }`}
                      style={{ borderRadius: '2px' }}
                    >
                      {msg.role === "assistant" && msg.name && (
                        <span className="block text-[11px] font-medium text-muted-foreground mb-1">{msg.name}</span>
                      )}
                      {msg.role === "assistant" && mode === "bot" ? (
                        <div className="prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_*]:font-mono">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : msg.content}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    {mode === "slack" && slackRecipient && (
                      <div className="avatar-square" style={{ width: 28, height: 28, flexShrink: 0, borderRadius: 0, overflow: 'hidden', marginRight: 8, marginTop: 4 }}>
                        <img src={slackRecipient.image} alt={slackRecipient.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: 0, display: 'block' }} />
                      </div>
                    )}
                    <div className="bg-secondary text-muted-foreground px-3.5 py-2.5 text-[15px]" style={{ borderRadius: '2px' }}>
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    </div>
                  </div>
                )}

                {/* Bot suggestions */}
                {mode === "bot" && botMessages.length === 1 && !isTyping && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {BOT_SUGGESTIONS.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => handleSend(s.query)}
                        className="px-3 py-1.5 border border-border text-[12px] font-mono text-foreground hover:border-primary/40 transition-colors"
                        style={{ borderRadius: '2px' }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-border px-3 py-3">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Skriv en melding..."
                    className="flex-1 bg-background text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-[15px] font-mono outline-none border border-border focus:border-primary/40 transition-colors"
                    style={{ borderRadius: '2px' }}
                    disabled={isTyping}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    className="flex items-center justify-center w-9 h-9 bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity flex-shrink-0"
                    style={{ borderRadius: '2px' }}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FloatingChat;
