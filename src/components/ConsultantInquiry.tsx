import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ConsultantInquiryProps {
  consultantName: string;
}

const ConsultantInquiry = ({ consultantName }: ConsultantInquiryProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const firstName = consultantName.split(" ")[0];

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail) return;

    setStatus("sending");
    const { error } = await supabase.from("website_leads").insert({
      email: email.trim(),
      consultant_name: consultantName,
      message: "Forespørsel om tilgjengelighet"
    });

    if (error) {
      console.error("Lead insert error:", error);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  };

  if (status === "sent") {
    return (
      <div className="mt-12 pt-6 border-t border-border">
        <p className="text-[15px] text-muted-foreground">
          Takk! Vi tar kontakt med deg snart.
        </p>
      </div>);

  }

  return (
    <div className="mt-12 pt-6 border-t border-border">
      <p className="text-[16px] font-semibold text-foreground mb-2">
        Er {firstName} tilgjengelig?
      </p>
      

      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="din@epost.no"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className="w-full text-[15px] text-foreground placeholder:text-muted-foreground border border-border focus:border-primary outline-none transition-colors"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            background: "hsl(var(--surface))",
            borderRadius: "2px",
            padding: "12px 16px"
          }} />
        
        {status === "error" &&
        <p className="text-[13px] mt-2" style={{ color: "hsl(var(--accent))" }}>
            Noe gikk galt. Prøv igjen.
          </p>
        }
        <button
          type="submit"
          disabled={!isValidEmail || status === "sending"}
          className="w-full mt-3 text-[14px] font-medium transition-opacity disabled:opacity-40"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            background: "hsl(var(--accent))",
            color: "#09090B",
            padding: "12px 20px",
            borderRadius: "2px"
          }}>
          
          {status === "sending" ? "Sender..." : "Sjekk tilgjengelighet →"}
        </button>
      </form>
    </div>);

};

export default ConsultantInquiry;