import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, MessageSquare, ChevronDown, X, MessageCircle } from "lucide-react";
import jonRichard from "@/assets/jon-richard-nygaard.avif";
import thomasEriksen from "@/assets/thomas-eriksen.avif";

type Mode = "bot" | "slack";
type SlackRecipient = { name: string; image: string; email: string } | null;

interface Message {
  role: "assistant" | "user";
  content: string;
  avatar?: string;
  name?: string;
}

const SLACK_CONTACTS = [
  { name: "Thomas Eriksen", image: thomasEriksen, email: "thomas@stacq.no" },
  { name: "Jon Richard Nygaard", image: jonRichard, email: "jr@stacq.no" },
];

const BOT_SUGGESTIONS = [
  { label: "Kjernekompetanse", query: "kompetanse" },
  { label: "Stilling ledig", query: "stilling" },
  { label: "Håndbok", query: "håndbok" },
];

function getMockBotResponse(input: string): string {
  const q = input.toLowerCase();
  if (/kompetanse|teknologi|stack|tech/.test(q))
    return "Vi jobber med hele embedded-stacken:\n\n• C / C++ — Firmware & systemkode\n• Rust — Sikker lavnivåkode\n• RTOS — FreeRTOS, Zephyr m.fl.\n• Embedded Linux — Kernel, drivere, BSP\n• Yocto — Distribusjon & bygg\n• Security — TrustZone, sikker boot, krypto\n• ARM — Cortex-M/A, RISC-V\n• CI / Test — Hardware-in-the-loop, automatisert test";
  if (/stilling|jobb|karriere|ansett|ledig/.test(q))
    return "Vi ser etter Senior Embedded Konsulenter.\n\nKrav:\n• 5+ års erfaring\n• C / C++ / Rust (ett eller flere)\n• Embedded systemer / RTOS / Embedded Linux\n• Trives i team og tar ansvar for kvalitet\n\nKontakt jr@stacq.no for en uformell prat.";
  if (/lønn|provisjon|betalt|inntekt/.test(q))
    return "Vi tilbyr 70% provisjonsbasert lønn av fakturert beløp. Dette inkluderer arbeidsgiveravgift, pensjon og feriepenger.";
  if (/forsikring|pensjon|trygg/.test(q))
    return "Vi har solide ordninger:\n\n• 6% innskuddspensjon fra første krone\n• Yrkesskadeforsikring\n• Helseforsikring\n• Fritidsulykke\n• Gruppeliv\n• Uførepensjon";
  if (/ferie|permisjon|fravær|fri/.test(q))
    return "Du står fritt til å ta så mye ferie du ønsker, avtalt med kunden. Ved familieforøkelse gir vi kr 100.000 i gave.";
  if (/håndbok|handbook|verdier|kultur/.test(q))
    return "STACQ-håndboken dekker:\n\n• Lønn — 70% provisjonsmodell\n• Arbeidstid — Frihet under ansvar\n• Utstyr — Fritt valg av verktøy\n• Kjerneverdier — Kvalitet, stolthet, langsiktighet\n• Forsikring & pensjon — Full pakke\n\nSpør gjerne om et spesifikt tema!";
  if (/kontakt|epost|telefon|mail/.test(q))
    return "Ta gjerne kontakt:\n\n• Jon Richard Nygaard — 93 287 267 — jr@stacq.no\n• Thomas Eriksen — 97 500 321 — thomas@stacq.no";
  if (/bransje|domene|forsvar|medtech|industri|energi/.test(q))
    return "Vi jobber innen:\n\n• Medisinsk teknologi\n• Halvleder og chip-utvikling\n• Energi og elektrisk mobilitet\n• Forbrukerelektronikk\n• Forsvar og sikkerhetskritiske systemer\n• Industriell automasjon\n• Telekom og kommunikasjon\n• IoT og smarte enheter";
  return "Jeg kan svare på spørsmål om STACQs kompetanse, bransjer, ledige stillinger, lønn, forsikring, ferie, og håndboken vår. Hva lurer du på?";
}

const SLACK_RESPONSES: Record<string, string[]> = {
  "Thomas Eriksen": [
    "Hei! Takk for meldingen. Jeg tar en titt og vender tilbake snart 👋",
    "God melding! La meg sjekke litt og komme tilbake til deg.",
    "Takk! Jeg ringer deg gjerne. Send meg nummeret ditt på thomas@stacq.no 😊",
  ],
  "Jon Richard Nygaard": [
    "Hei! Takk for at du tar kontakt. Jeg svarer deg så fort jeg kan 👋",
    "Spennende! Vi er alltid interessert i å snakke med dyktige folk. Har du tid til en kaffe denne uken?",
    "Takk for meldingen! Send meg nummeret ditt på jr@stacq.no, så ringer jeg deg.",
  ],
};

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState<Mode>("bot");
  const [slackRecipient, setSlackRecipient] = useState<SlackRecipient>(null);
  const [botMessages, setBotMessages] = useState<Message[]>([
    { role: "assistant", content: "Hei! Jeg er STACQs assistent. Spør meg om kompetanse, stillinger, eller håndboken vår." },
  ]);
  const [slackMessages, setSlackMessages] = useState<Record<string, Message[]>>({});
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const responseIndex = useRef<Record<string, number>>({});

  const currentSlackMessages = slackRecipient ? (slackMessages[slackRecipient.name] || []) : [];
  const messages = mode === "bot" ? botMessages : currentSlackMessages;

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [botMessages, slackMessages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && isExpanded && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isExpanded]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsExpanded(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsExpanded(false);
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleSend = useCallback(
    (text?: string) => {
      const msg = (text || input).trim();
      if (!msg || isTyping) return;
      setInput("");

      if (mode === "bot") {
        setBotMessages((prev) => [...prev, { role: "user", content: msg }]);
        setIsTyping(true);
        const response = getMockBotResponse(msg);
        const delay = Math.min(400 + response.length * 2, 1200);
        setTimeout(() => {
          setBotMessages((prev) => [...prev, { role: "assistant", content: response }]);
          setIsTyping(false);
        }, delay);
      } else if (slackRecipient) {
        const name = slackRecipient.name;
        const image = slackRecipient.image;
        setSlackMessages((prev) => ({
          ...prev,
          [name]: [...(prev[name] || []), { role: "user", content: msg }],
        }));
        setIsTyping(true);
        const delay = 2000 + Math.random() * 2000;
        const responses = SLACK_RESPONSES[name] || ["Takk for meldingen!"];
        const idx = responseIndex.current[name] || 0;
        responseIndex.current[name] = idx + 1;
        setTimeout(() => {
          setSlackMessages((prev) => ({
            ...prev,
            [name]: [...(prev[name] || []), { role: "assistant", content: responses[idx % responses.length], avatar: image, name }],
          }));
          setIsTyping(false);
        }, delay);
      }
    },
    [input, isTyping, mode, slackRecipient]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleModeSwitch = (newMode: Mode) => {
    setMode(newMode);
    setSlackRecipient(null);
    if (!isExpanded) setIsExpanded(true);
  };

  const selectRecipient = (contact: typeof SLACK_CONTACTS[0]) => {
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
          className="w-14 h-14 rounded-full bg-foreground text-background shadow-2xl flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      </div>
    );
  }

  // Compact bar state (default open, not expanded)
  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)]">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Mode tabs + close */}
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => { setMode("bot"); setSlackRecipient(null); }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                  mode === "bot" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                STACQ-AI
              </button>
              <button
                onClick={() => { setMode("slack"); setSlackRecipient(null); }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                  mode === "slack" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Chat direkte
              </button>
            </div>
            <button
              onClick={handleClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Compact input */}
          <div className="px-3 pb-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={handleExpand}
                placeholder="Spør vår AI eller chat direkte med oss"
                className="flex-1 bg-secondary text-foreground placeholder:text-muted-foreground px-4 py-2.5 rounded-xl text-[14px] outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
              <button
                onClick={() => { handleExpand(); }}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex-shrink-0"
              >
                <Send className="w-4 h-4" />
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
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header with mode tabs */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border">
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleModeSwitch("bot")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                mode === "bot" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              STACQ-AI
            </button>
            <button
              onClick={() => handleModeSwitch("slack")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                mode === "slack" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Chat direkte
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expanded content */}
        <div className="flex flex-col overflow-hidden" style={{ height: 420 }}>
          {/* Slack contact picker */}
          {showContactPicker ? (
            <div className="flex-1 px-4 py-4 flex flex-col gap-3">
              <p className="text-[13px] text-muted-foreground font-medium">Hvem vil du sende melding til?</p>
              {SLACK_CONTACTS.map((contact) => (
                <button
                  key={contact.name}
                  onClick={() => selectRecipient(contact)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-secondary transition-colors text-left"
                >
                  <img src={contact.image} alt={contact.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div>
                    <span className="text-[14px] font-medium text-foreground block">{contact.name}</span>
                    <span className="text-[12px] text-muted-foreground">{contact.email}</span>
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
                    className="text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-1"
                  >
                    ← Velg annen person
                  </button>
                )}

                {messages.map((msg, i) => (
                  <div key={`${mode}-${slackRecipient?.name || ""}-${i}`} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && msg.avatar && (
                      <img src={msg.avatar} alt={msg.name} className="w-7 h-7 rounded-full object-cover mr-2 mt-1 flex-shrink-0" />
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[14px] leading-relaxed whitespace-pre-line ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-secondary text-foreground rounded-bl-md"
                      }`}
                    >
                      {msg.role === "assistant" && msg.name && (
                        <span className="block text-[12px] font-semibold text-muted-foreground mb-1">{msg.name}</span>
                      )}
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    {mode === "slack" && slackRecipient && (
                      <img src={slackRecipient.image} alt={slackRecipient.name} className="w-7 h-7 rounded-full object-cover mr-2 mt-1 flex-shrink-0" />
                    )}
                    <div className="bg-secondary text-muted-foreground px-3.5 py-2.5 rounded-2xl rounded-bl-md text-[14px]">
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
                        className="px-3 py-1.5 rounded-full border border-border text-[13px] font-medium text-foreground hover:bg-secondary transition-colors"
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
                    className="flex-1 bg-secondary text-foreground placeholder:text-muted-foreground px-4 py-2.5 rounded-xl text-[14px] outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    disabled={isTyping}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity flex-shrink-0"
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
