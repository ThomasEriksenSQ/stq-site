import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import OverlayPanel from "@/components/OverlayPanel";
import stacqLogoWhite from "@/assets/stacq-logo-white.png";
import heroBgChip from "@/assets/hero-bg-chip.png";
import jonRichardImg from "@/assets/jon-richard-nygaard.avif";
import thomasEriksenImg from "@/assets/thomas-eriksen.avif";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay },
});

const sectionFade = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="flex flex-col">
      {/* ═══ HERO ═══ */}
      <section className="relative h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroBgChip})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative max-w-[880px]">
          <motion.img {...fadeUp(0)} src={stacqLogoWhite} alt="STACQ" className="h-6 md:h-8 mb-8 md:mb-10" />

          <motion.h1
            {...fadeUp(0.15)}
            className="text-[36px] md:text-[64px] lg:text-[72px] font-semibold leading-[1.08] tracking-[-0.03em] text-white"
          >
            Embedded konsulenter som former fremtiden
          </motion.h1>

          <motion.div {...fadeUp(0.3)} className="mt-8 md:mt-10 flex flex-wrap gap-2.5">
            {["C / C++", "Rust", "Firmware", "Embedded Linux", "Yocto", "RTOS", "ARM", "Security"].map((tag) => (
              <span
                key={tag}
                className="text-[12.5px] font-medium px-3.5 py-1.5 rounded-full border border-white/15 text-white/75 bg-white/[0.04] backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
            <span className="text-[12.5px] font-medium px-3.5 py-1.5 rounded-full border border-white/10 text-white/45 bg-white/[0.03]">
              + More
            </span>
          </motion.div>

          <motion.div {...fadeUp(0.45)} className="mt-10 md:mt-12">
            <button
              onClick={() => setIsOverlayOpen(true)}
              className="group text-[14px] font-medium tracking-[0.03em] px-6 py-2.5 rounded-md h-[42px] flex items-center gap-2.5 transition-all duration-200 bg-white/[0.08] text-white/90 border border-white/[0.12] hover:bg-white/[0.13] hover:border-white/[0.22] hover:text-white"
            >
              Mer om STACQ
              <svg
                className="transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor"
                strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M4.5 11.5L11.5 4.5" />
                <path d="M5.5 4.5H11.5V10.5" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══ OM STACQ ═══ */}
      <section className="py-24 md:py-32 px-8 md:px-16 lg:px-24" style={{ background: "#fff" }}>
        <motion.div {...sectionFade} className="max-w-[880px] mx-auto">
          <p className="text-[13px] font-semibold uppercase tracking-[0.06em]" style={{ color: "#86868b" }}>
            Om STACQ
          </p>
          <h2 className="mt-6 text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-[-0.02em]" style={{ color: "#1d1d1f" }}>
            Embedded. Lavnivå.{" "}
            <span style={{ color: "#9ca3af" }}>Rendyrket.</span>
          </h2>
          <p className="mt-8 text-[17px] leading-[1.65]" style={{ color: "#1d1d1f" }}>
            STACQ er et norsk konsulentselskap som jobber utelukkende med embedded- og lavnivåprogrammering.
          </p>
          <p className="mt-4 text-[17px] leading-[1.65]" style={{ color: "#6e6e73" }}>
            Vi skriver firmware, systemsoftware og maskinvarenær kode for selskaper som bygger fysiske produkter — fra forsvarssystemer til medisinsk utstyr.
          </p>
        </motion.div>
      </section>

      {/* ═══ KOMPETANSE ═══ */}
      <section className="py-24 md:py-32 px-8 md:px-16 lg:px-24" style={{ background: "#f5f5f7" }}>
        <motion.div {...sectionFade} className="max-w-[880px] mx-auto">
          <p className="text-[13px] font-semibold uppercase tracking-[0.06em]" style={{ color: "#86868b" }}>
            Kompetanse
          </p>
          <h2 className="mt-6 text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-[-0.02em]" style={{ color: "#1d1d1f" }}>
            Dyp teknisk kompetanse
          </h2>
          <p className="mt-6 text-[17px] leading-[1.65]" style={{ color: "#6e6e73" }}>
            Vi leverer spesialiserte konsulenter innen hele embedded-stacken — fra drivere og bootloadere til applikasjonslag og sikkerhet.
          </p>

          <div
            className="mt-12 grid grid-cols-2 md:grid-cols-3"
            style={{ gap: "1px", background: "#e0e0e3", borderRadius: "12px", overflow: "hidden" }}
          >
            {[
              { title: "C / C++", desc: "Firmware & systemkode" },
              { title: "Rust", desc: "Sikker lavnivåkode" },
              { title: "RTOS", desc: "FreeRTOS, Zephyr, m.fl." },
              { title: "Embedded Linux", desc: "Kernel, drivere, BSP" },
              { title: "Yocto", desc: "Distribusjon & bygg" },
              { title: "Security", desc: "TrustZone, sikker boot" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center justify-center py-6 md:py-8" style={{ background: "#fff" }}>
                <span className="text-[15px] font-semibold" style={{ color: "#1d1d1f", fontFamily: "'SF Mono', ui-monospace, SFMono-Regular, monospace" }}>
                  {item.title}
                </span>
                <span className="mt-1 text-[12px]" style={{ color: "#86868b" }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ DOMENER ═══ */}
      <section className="py-24 md:py-32 px-8 md:px-16 lg:px-24" style={{ background: "#fff" }}>
        <motion.div {...sectionFade} className="max-w-[880px] mx-auto">
          <p className="text-[13px] font-semibold uppercase tracking-[0.06em]" style={{ color: "#86868b" }}>
            Domener
          </p>
          <h2 className="mt-6 text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-[-0.02em]" style={{ color: "#1d1d1f" }}>
            Der software møter hardware
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Forsvar", desc: "Kritiske systemer med strenge krav til robusthet og sikkerhet." },
              { name: "Medtech", desc: "Medisinsk-teknisk utstyr der pålitelighet redder liv." },
              { name: "Industri", desc: "Automasjon, IoT og sanntidsstyring i industrielle omgivelser." },
              { name: "Energi", desc: "Smart infrastruktur og styringssystemer for energisektoren." },
            ].map((domain) => (
              <div
                key={domain.name}
                className="p-6 rounded-2xl"
                style={{ background: "#f5f5f7" }}
              >
                <p className="text-[18px] font-semibold" style={{ color: "#1d1d1f" }}>{domain.name}</p>
                <p className="mt-2 text-[15px] leading-[1.6]" style={{ color: "#6e6e73" }}>{domain.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ KARRIERE ═══ */}
      <section className="py-24 md:py-32 px-8 md:px-16 lg:px-24" style={{ background: "#f5f5f7" }}>
        <motion.div {...sectionFade} className="max-w-[880px] mx-auto">
          <div className="p-8 md:p-12 rounded-2xl" style={{ background: "#fff" }}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.06em]" style={{ color: "#86868b" }}>
              Vi ansetter
            </p>
            <h2 className="mt-4 text-[28px] md:text-[36px] font-bold leading-[1.15] tracking-[-0.02em]" style={{ color: "#1d1d1f" }}>
              Bli en del av STACQ
            </h2>
            <p className="mt-6 text-[17px] leading-[1.65]" style={{ color: "#1d1d1f" }}>
              Små team, høy standard, lav terskel. Vi ser etter folk som skriver god kode og trives med å jobbe tett på hardware.
            </p>
            <div className="mt-8">
              <button
                onClick={() => setIsOverlayOpen(true)}
                className="group inline-flex items-center gap-2 text-[15px] font-medium transition-colors"
                style={{ color: "#0066cc" }}
              >
                Se ledige stillinger
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" style={{ fontSize: "16px" }}>›</span>
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ KONTAKT ═══ */}
      <section className="py-24 md:py-32 px-8 md:px-16 lg:px-24" style={{ background: "#fff" }}>
        <motion.div {...sectionFade} className="max-w-[880px] mx-auto">
          <p className="text-[13px] font-semibold uppercase tracking-[0.06em]" style={{ color: "#86868b" }}>
            Kontakt
          </p>
          <h2 className="mt-6 text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-[-0.02em]" style={{ color: "#1d1d1f" }}>
            Ta kontakt
          </h2>

          <div className="mt-10 flex flex-col gap-4">
            {[
              { name: "Jon Richard Nygaard", img: jonRichardImg, phone: "93 287 267", phoneFull: "93287267", email: "jr@stacq.no" },
              { name: "Thomas Eriksen", img: thomasEriksenImg, phone: "97 500 321", phoneFull: "97500321", email: "thomas@stacq.no" },
            ].map((person) => (
              <div
                key={person.name}
                className="flex items-center gap-5 p-5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-[56px] h-[56px] rounded-full object-cover flex-shrink-0"
                  style={{ border: "2px solid #2563eb" }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[15px] font-semibold" style={{ color: "#1d1d1f" }}>{person.name}</p>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: "#f3f4f6", color: "#6b7280" }}>Partner</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1">
                    <a href={`tel:${person.phoneFull}`} className="flex items-center gap-2 text-[13px]" style={{ color: "#0066cc" }}>
                      <Phone className="w-3.5 h-3.5" /> {person.phone}
                    </a>
                    <a href={`mailto:${person.email}`} className="flex items-center gap-2 text-[13px]" style={{ color: "#0066cc" }}>
                      <Mail className="w-3.5 h-3.5" /> {person.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-8 px-8 md:px-16 lg:px-24" style={{ background: "#f5f5f7" }}>
        <div className="max-w-[880px] mx-auto">
          <p className="text-[12px]" style={{ color: "#86868b" }}>
            STACQ AS · Øvre Slottsgate 27, 0157 Oslo · post@stacq.no · Org.nr. 931 871 389
          </p>
        </div>
      </footer>

      <OverlayPanel isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </div>
  );
};

export default Index;
