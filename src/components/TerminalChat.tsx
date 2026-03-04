import { useState, useRef, useEffect, useCallback } from "react";
import { Send } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
  isTyping?: boolean;
}

const SUGGESTIONS = [
  { label: "Kjernekompetanse", query: "kompetanse" },
  { label: "Stilling ledig", query: "stilling" },
  { label: "Håndbok", query: "håndbok" },
];

function getMockResponse(input: string): string {
  const q = input.toLowerCase();

  if (/kompetanse|teknologi|stack|tech/.test(q)) {
    return "Vi jobber med hele embedded-stacken:\n\n• C / C++ — Firmware & systemkode\n• Rust — Sikker lavnivåkode\n• RTOS — FreeRTOS, Zephyr m.fl.\n• Embedded Linux — Kernel, drivere, BSP\n• Yocto — Distribusjon & bygg\n• Security — TrustZone, sikker boot, krypto\n• ARM — Cortex-M/A, RISC-V\n• CI / Test — Hardware-in-the-loop, automatisert test";
  }

  if (/stilling|jobb|karriere|ansett|ledig/.test(q)) {
    return "Vi ser etter Senior Embedded Konsulenter.\n\nKrav:\n• 5+ års erfaring\n• C / C++ / Rust (ett eller flere)\n• Embedded systemer / RTOS / Embedded Linux\n• Trives i team og tar ansvar for kvalitet\n\nVi tilbyr rendyrket fokus på embedded, sterkt fagmiljø og markedsledende betingelser. Kontakt jr@stacq.no for en uformell prat.";
  }

  if (/lønn|provisjon|betalt|inntekt/.test(q)) {
    return "Vi tilbyr 70% provisjonsbasert lønn av fakturert beløp. Dette inkluderer arbeidsgiveravgift, pensjon og feriepenger. Din kompetanse og erfaring påvirker direkte din inntekt.";
  }

  if (/forsikring|pensjon|trygg/.test(q)) {
    return "Vi har solide ordninger:\n\n• 6% innskuddspensjon fra første krone (DNB)\n• Yrkesskadeforsikring\n• Helseforsikring\n• Fritidsulykke\n• Gruppeliv\n• Uførepensjon\n• Ansvarsforsikring";
  }

  if (/ferie|permisjon|fravær|fri/.test(q)) {
    return "Du står fritt til å ta så mye ferie du ønsker, så lenge det er avtalt med kunden. Ved familieforøkelse gir vi kr 100.000 i gave ved inngangen til fødselspermisjonen, i tillegg til NAVs dekning.";
  }

  if (/håndbok|handbook|verdier|kultur/.test(q)) {
    return "STACQ-håndboken dekker:\n\n• Lønn — 70% provisjonsmodell\n• Arbeidstid — Frihet under ansvar\n• Utstyr — Fritt valg av verktøy\n• Kjerneverdier — Kvalitet, stolthet, langsiktighet\n• Fravær — Inkl. kr 100.000 fødselsgave\n• Forsikring & pensjon — 6% pensjon + full pakke\n• Etikk & miljø — Bærekraft og integritet\n\nSpør gjerne om et spesifikt tema!";
  }

  if (/kontakt|epost|telefon|mail/.test(q)) {
    return "Ta gjerne kontakt:\n\n• Jon Richard Nygaard — 93 287 267 — jr@stacq.no\n• Thomas Eriksen — 97 500 321 — thomas@stacq.no\n\nVi holder til i Øvre Slottsgate 27, Oslo.";
  }

  if (/bransje|domene|forsvar|medtech|industri|energi/.test(q)) {
    return "Vi jobber innen fire hoveddomener:\n\n• Forsvar — Kritiske systemer med strenge krav til robusthet og sikkerhet\n• Medtech — Medisinsk-teknisk utstyr der pålitelighet redder liv\n• Industri — Automasjon, IoT og sanntidsstyring\n• Energi — Smart infrastruktur og styringssystemer";
  }

  return "Jeg kan svare på spørsmål om STACQs kompetanse, bransjer, ledige stillinger, lønn, forsikring, ferie, og håndboken vår. Hva lurer du på?";
}

const TerminalChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hei! Jeg er STACQs assistent. Spør meg om kompetanse, stillinger, eller håndboken vår.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = useCallback(
    (text?: string) => {
      const msg = (text || input).trim();
      if (!msg || isTyping) return;

      setInput("");
      setMessages((prev) => [...prev, { role: "user", content: msg }]);
      setIsTyping(true);

      // Simulate typing delay
      const response = getMockResponse(msg);
      const delay = Math.min(400 + response.length * 2, 1200);

      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant", content: response }]);
        setIsTyping(false);
      }, delay);
    },
    [input, isTyping]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-2xl border border-border shadow-md overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[13px] font-medium text-muted-foreground">STACQ Assistent</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-foreground rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-secondary text-muted-foreground px-4 py-3 rounded-2xl rounded-bl-md text-[14px]">
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          </div>
        )}

        {/* Suggestion chips — only show after first message */}
        {messages.length === 1 && !isTyping && (
          <div className="flex flex-wrap gap-2 pt-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                onClick={() => handleSend(s.query)}
                className="px-3.5 py-1.5 rounded-full border border-border text-[13px] font-medium text-foreground hover:bg-secondary transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Spør om kompetanse, stillinger, håndbok..."
            className="flex-1 bg-secondary text-foreground placeholder:text-muted-foreground px-4 py-2.5 rounded-xl text-[14px] outline-none focus:ring-2 focus:ring-ring transition-shadow"
            disabled={isTyping}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TerminalChat;
