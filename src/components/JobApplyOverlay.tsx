import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface JobApplyOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHandbok?: () => void;
}

const JobApplyOverlay = ({ isOpen, onClose, onOpenHandbok }: JobApplyOverlayProps) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cvError, setCvError] = useState("");

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    let hasError = false;

    if (!form.name.trim()) {
      setNameError("Vennligst oppgi fullt navn.");
      hasError = true;
    }

    if (!form.email.trim()) {
      setEmailError("Vennligst oppgi e-postadresse.");
      hasError = true;
    } else if (!isValidEmail(form.email)) {
      setEmailError("Vennligst oppgi en gyldig e-postadresse.");
      hasError = true;
    }

    if (!form.phone.trim()) {
      setPhoneError("Vennligst oppgi telefonnummer.");
      hasError = true;
    }

    if (!file) {
      setCvError("Vennligst last opp CV (PDF).");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    let cvUrl: string | null = null;

    // Upload CV if provided
    if (file) {
      const safeName = form.name.toLowerCase().replace(/\s+/g, "-");
      const filePath = `${Date.now()}-${safeName}.pdf`;
      const { error: uploadError } = await supabase.storage
        .from("cvs")
        .upload(filePath, file, { contentType: "application/pdf" });

      if (!uploadError) {
        const { data } = supabase.storage.from("cvs").getPublicUrl(filePath);
        cvUrl = data.publicUrl;
      }
      // If upload fails, continue without cv_url
    }

    const { error } = await supabase.from("website_applications").insert({
      full_name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      cv_url: cvUrl,
    });

    setLoading(false);

    if (error) {
      setErrorMsg("Noe gikk galt. Prøv igjen eller send e-post direkte til post@stacq.no.");
    } else {
      setSubmitted(true);

      // Send email notification (fire-and-forget)
      try {
        await supabase.functions.invoke("send-application-email", {
          body: {
            full_name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim() || null,
            cv_url: cvUrl,
          },
        });
      } catch (emailErr) {
        console.error("Failed to send application email notification:", emailErr);
      }
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", message: "" });
      setFileName("");
      setFile(null);
      setErrorMsg("");
      setEmailError("");
      setNameError("");
      setPhoneError("");
      setCvError("");
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
            className="fixed top-0 right-0 bottom-0 z-50 w-full md:w-[45%] md:min-w-[370px] bg-background overflow-y-auto flex flex-col"
          >
            {/* Mobile close — sticky top bar */}
            <div
              className="sticky top-0 z-10 px-6 py-4 md:hidden backdrop-blur-xl"
              style={{ background: "hsla(var(--background) / 0.85)" }}
            >
              <button onClick={handleClose} className="text-[13px] font-medium text-muted-foreground">
                ← Lukk
              </button>
            </div>

            <div className="pt-6 md:pt-24 pb-16 px-8 md:px-16 flex-1">
              {/* Desktop close button */}
              <button
                onClick={handleClose}
                className="hidden md:flex absolute top-6 right-6 w-8 h-8 rounded-full bg-secondary items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-full max-w-prose mx-auto">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center pt-20"
                  >
                    <h2 className="text-[28px] font-bold text-foreground">Takk for søknaden!</h2>
                    <p className="mt-4 text-muted-foreground text-[16px] leading-relaxed">
                      Takk! Vi har mottatt søknaden din og tar kontakt snart.
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
                    <h2 className="text-[28px] font-bold text-foreground tracking-tight">Bli med i Team STACQ!</h2>
                    <div className="mt-6 space-y-4 text-[15px] text-muted-foreground leading-relaxed">
                      <p>Vi ser alltid etter dyktige og erfarne kollegaer som ønsker å bli med.</p>
                      <div>
                        <h3 className="text-foreground font-semibold mb-2">Kan ett eller flere av</h3>
                        <ul className="space-y-1.5 list-disc list-inside">
                          <li>Utvikling i C, C++ og Rust.</li>
                          <li>Embedded software, fra mikrokontrollere til Linux-baserte systemer.</li>
                          <li>Hardware-nær utvikling og lavnivå-programmering.</li>
                          <li>Bare-metal, RTOS og sanntidssystemer.</li>
                          <li>Forståelse for elektronikk, gjerne erfaring med FPGA.</li>
                          <li>Evne til å ta ansvar og bidra positivt til miljøet.</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-foreground font-semibold mb-2">Hva vi tilbyr</h3>
                        <ul className="space-y-1.5 list-disc list-inside">
                          <li>Markedsledende betingelser.</li>
                          <li>Høy lønn og gode pensjonsordninger.</li>
                          <li>Trygt og inkluderende arbeidsmiljø.</li>
                          <li>Sterkt og tilgjengelig fagmiljø.</li>
                          <li>Frihet og fleksibilitet.</li>
                          <li>Moderne verktøy og utstyr.</li>
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
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          setNameError("");
                        }}
                        className="w-full bg-secondary text-foreground placeholder:text-muted-foreground px-4 py-2.5 rounded-lg text-[14px] outline-none focus:ring-2 focus:ring-ring transition-shadow border-0"
                      />
                      {nameError && <p className="text-[13px] text-destructive -mt-2">{nameError}</p>}

                      <input
                        type="email"
                        placeholder="E-post"
                        required
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          setEmailError("");
                        }}
                        className="w-full bg-secondary text-foreground placeholder:text-muted-foreground px-4 py-2.5 rounded-lg text-[14px] outline-none focus:ring-2 focus:ring-ring transition-shadow border-0"
                      />
                      {emailError && <p className="text-[13px] text-destructive -mt-2">{emailError}</p>}

                      <input
                        type="tel"
                        placeholder="Telefon"
                        required
                        value={form.phone}
                        onChange={(e) => {
                          setForm({ ...form, phone: e.target.value });
                          setPhoneError("");
                        }}
                        className="w-full bg-secondary text-foreground placeholder:text-muted-foreground px-4 py-2.5 rounded-lg text-[14px] outline-none focus:ring-2 focus:ring-ring transition-shadow border-0"
                      />
                      {phoneError && <p className="text-[13px] text-destructive -mt-2">{phoneError}</p>}

                      {/* CV upload */}
                      <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-border bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors">
                        <Upload className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-[14px] text-muted-foreground">{fileName || "Last opp CV (PDF)"}</span>
                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            setFileName(f?.name || "");
                            setFile(f || null);
                            setCvError("");
                          }}
                        />
                      </label>
                      {cvError && <p className="text-[13px] text-destructive -mt-2">{cvError}</p>}

                      {errorMsg && <p className="text-[13px] text-destructive">{errorMsg}</p>}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-[15px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {loading ? "Sender..." : "Send søknad →"}
                      </button>
                    </form>

                    <div className="mt-10">
                      <button onClick={() => onOpenHandbok?.()} className="text-[14px] text-primary hover:underline">
                        Les håndboken vår →
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 md:px-16 py-6 border-t border-border mt-auto">
              <div className="w-full max-w-prose mx-auto">
                <p className="text-[12px] text-muted-foreground">
                  STACQ AS · Øvre Slottsgate 27, 0157 Oslo · post@stacq.no · Org.nr. 932 575 442 MVA
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default JobApplyOverlay;
