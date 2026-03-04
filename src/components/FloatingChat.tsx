import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronUp, ChevronDown, Bot, MessageSquare } from "lucide-react";
import jonRichard from "@/assets/jon-richard-nygaard.avif";

type Mode = "bot" | "human";

interface Message {
  role: "assistant" | "user";
  content: string;
  avatar?: string;
  name?: string;
}

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

const HUMAN_RESPONSES = [
  "Hei! Takk for meldingen. Jeg tar en titt og vender tilbake snart 👋",
  "God melding! La meg sjekke litt og komme tilbake til deg.",
  "Takk for at du tar kontakt! Jeg ringer deg gjerne for en uformell prat. Send meg nummeret ditt på jr@stacq.no 😊",
  "Spennende! Vi er alltid interessert i å snakke med dyktige folk. Har du tid til en kaffe denne uken?",
];

const FloatingChat = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState<Mode>("bot");
  const [botMessages, setBotMessages] = useState<Message[]>([
    { role: "assistant", content: "Hei! Jeg er STACQs assistent. Spør meg om kompetanse, stillinger, eller håndboken vår." },
  ]);
  const [humanMessages, setHumanMessages] = useState<Message[]>([
    { role: "assistant", content: "Hei! Jeg er Jon Richard. Send meg en melding så svarer jeg så fort jeg kan.", avatar: jonRichard, name: "Jon Richard" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const humanResponseIndex = useRef(0);

  const messages = mode === "bot" ? botMessages : humanMessages;
  const setMessages = mode === "bot" ? setBotMessages : setHumanMessages;

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [botMessages, humanMessages, scrollToBottom]);

  const handleSend = useCallback(
    (text?: string) => {
      const msg = (text || input).trim();
      if (!msg || isTyping) return;

      setInput("");
      setMessages((prev) => [...prev, { role: "user", content: msg }]);
      setIsTyping(true);
      setIsExpanded(true);

      if (mode === "bot") {
        const response = getMockBotResponse(msg);
        const delay = Math.min(400 + response.length * 2, 1200);
        setTimeout(() => {
          setBotMessages((prev) => [...prev, { role: "assistant", content: response }]);
          setIsTyping(false);
        }, delay);
      } else {
        const delay = 3000 + Math.random() * 2000;
        setTimeout(() => {
          const resp = HUMAN_RESPONSES[humanResponseIndex.current % HUMAN_RESPONSES.length];
          humanResponseIndex.current++;
          setHumanMessages((prev) => [...prev, { role: "assistant", content: resp, avatar: jonRichard, name: "Jon Richard" }]);
          setIsTyping(false);
        }, delay);
      }
    },
    [input, isTyping, mode, setMessages]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50">
      {/* Expanded chat panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 420, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-card border-t border-border shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.1)] overflow-hidden"
          >
            <div className="max-w-2xl mx-auto h-full flex flex-col">
              {/* Mode tabs */}
              <div className="flex items-center gap-1 px-4 pt-3 pb-2">
                <button
                  onClick={() => setMode("bot")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                    mode === "bot" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  STACQ Bot
                </button>
                <button
                  onClick={() => setMode("human")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                    mode === "human" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Snakk med oss
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {messages.map((msg, i) => (
                  <div key={`${mode}-${i}`} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
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
                    {mode === "human" && (
                      <img src={jonRichard} alt="Jon Richard" className="w-7 h-7 rounded-full object-cover mr-2 mt-1 flex-shrink-0" />
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input bar — always visible */}
      <div className="bg-card border-t border-border">
        <div className="max-w-2xl mx-auto flex items-center gap-2 px-4 py-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:bg-secondary transition-colors flex-shrink-0"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsExpanded(true)}
            placeholder={mode === "bot" ? "Spør STACQ Bot..." : "Skriv en melding til Jon Richard..."}
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
    </div>
  );
};

export default FloatingChat;
