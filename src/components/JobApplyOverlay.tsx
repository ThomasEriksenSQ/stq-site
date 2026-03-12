import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";

interface JobApplyOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHandbok?: () => void;
}

const JobApplyOverlay = ({ isOpen, onClose }: JobApplyOverlayProps) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", message: "" });
      setFileName("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[92vw] md:w-[45vw] bg-background overflow-y-auto"
          >
            <div className="pt-24 pb-16 px-8 md:px-16">
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-20">
                  <h2 className="text-[28px] font-bold text-foreground">Takk for søknaden!</h2>
                  <p className="mt-4 text-muted-foreground text-[16px] leading-relaxed">
                    Vi har mottatt din søknad og tar kontakt innen kort tid.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-[15px] font-medium hover:opacity-90 transition-opacity"
                  >
                    Lukk
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-[28px] font-bold text-foreground tracking-tight">Senior Embedded Konsulent</h2>
                  <div className="mt-6 space-y-4 text-[15px] text-muted-foreground leading-relaxed">
                    <p>Vi ser etter erfarne embedded-utviklere som brenner for kvalitet og vil jobbe med prosjekter som gjør en forskjell.</p>
                    <div>
                      <h3 className="text-foreground font-semibold mb-2">Krav</h3>
                      <ul className="space-y-1.5 list-disc list-inside">
                        <li>5+ års erfaring med embedded-systemer</li>
                        <li>C / C++ / Rust (ett eller flere)</li>
                        <li>Erfaring med RTOS eller Embedded Linux</li>
                        <li>Trives i team og tar ansvar for kvalitet</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold mb-2">Vi tilbyr</h3>
                      <ul className="space-y-1.5 list-disc list-inside">
                        <li>70% provisjonsbasert lønn</li>
                        <li>Norges sterkeste embedded-fagmiljø</li>
                        <li>Fritt valg av verktøy og utstyr</li>
                        <li>6% innskuddspensjon + full forsikringspakke</li>
                      </ul>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-10 space-y-4">
                    <h3 className="text-foreground font-semibold text-[16px]">Send søknad</h3>
                    <input
                      type="text"
                      placeholder="Fullt navn"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-secondary text-foreground placeholder:text-muted-foreground px-4 py-2.5 rounded-lg text-[14px] outline-none focus:ring-2 focus:ring-ring transition-shadow border-0"
                    />
                    <input
                      type="email"
                      placeholder="E-post"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-secondary text-foreground placeholder:text-muted-foreground px-4 py-2.5 rounded-lg text-[14px] outline-none focus:ring-2 focus:ring-ring transition-shadow border-0"
                    />
                    <input
                      type="tel"
                      placeholder="Telefon"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-secondary text-foreground placeholder:text-muted-foreground px-4 py-2.5 rounded-lg text-[14px] outline-none focus:ring-2 focus:ring-ring transition-shadow border-0"
                    />
                    <textarea
                      placeholder="Kort om deg og din erfaring"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-secondary text-foreground placeholder:text-muted-foreground px-4 py-2.5 rounded-lg text-[14px] outline-none focus:ring-2 focus:ring-ring transition-shadow border-0 resize-none"
                    />

                    {/* CV upload */}
                    <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-border bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors">
                      <Upload className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-[14px] text-muted-foreground">
                        {fileName || "Last opp CV (PDF)"}
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                      />
                    </label>

                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-[15px] font-medium hover:opacity-90 transition-opacity"
                    >
                      Send søknad →
                    </button>
                  </form>

                  <div className="mt-12 pt-6 border-t border-border">
                    <p className="text-[12px] text-muted-foreground">
                      STACQ AS · Øvre Slottsgate 27, 0157 Oslo · post@stacq.no · Org.nr. 931 871 389
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default JobApplyOverlay;
