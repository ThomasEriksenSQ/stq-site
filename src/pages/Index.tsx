import { useState } from "react";
import OverlayPanel from "@/components/OverlayPanel";

const COMPETENCIES = [
  { tech: "C / C++", area: "Firmware & systemkode" },
  { tech: "Rust", area: "Sikker lavnivåkode" },
  { tech: "RTOS", area: "FreeRTOS, Zephyr, m.fl." },
  { tech: "Embedded Linux", area: "Kernel, drivere, BSP" },
  { tech: "Yocto", area: "Distribusjon & bygg" },
  { tech: "Security", area: "TrustZone, sikker boot, krypto" },
  { tech: "ARM", area: "Cortex-M/A, RISC-V" },
  { tech: "CI / Test", area: "Hardware-in-the-loop, automatisert test" },
];

const DOMAINS = [
  { name: "Forsvar", desc: "Kritiske systemer med strenge krav til robusthet og sikkerhet." },
  { name: "Medtech", desc: "Medisinsk-teknisk utstyr der pålitelighet redder liv." },
  { name: "Industri", desc: "Automasjon, IoT og sanntidsstyring i industrielle omgivelser." },
  { name: "Energi", desc: "Smart infrastruktur og styringssystemer for energisektoren." },
];

const CONTACTS = [
  { name: "Jon Richard Nygaard", phone: "93 287 267", phoneFull: "93287267", email: "jr@stacq.no" },
  { name: "Thomas Eriksen", phone: "97 500 321", phoneFull: "97500321", email: "thomas@stacq.no" },
];

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8" style={{ background: "#050505" }}>
      {/* CRT Monitor */}
      <div className="w-full max-w-[900px]">
        <div className="crt-monitor">
          <div className="crt-screen p-6 md:p-10">
            {/* Content layer above scanlines */}
            <div className="relative z-10 terminal-text text-[13px] md:text-[14px] leading-relaxed">

              {/* Man page header */}
              <div className="manpage-header mb-6">
                <span>STACQ(1)</span>
                <span>STACQ Manual</span>
                <span>STACQ(1)</span>
              </div>

              {/* NAME */}
              <div className="mb-5">
                <div className="section-heading">NAME</div>
                <div className="section-body mt-1">
                  stacq — embedded konsulenter for lavnivåprogrammering
                </div>
              </div>

              {/* SYNOPSIS */}
              <div className="mb-5">
                <div className="section-heading">SYNOPSIS</div>
                <div className="section-body mt-1 flex flex-wrap gap-x-3 gap-y-1">
                  {["C/C++", "Rust", "Firmware", "Embedded Linux", "Yocto", "RTOS", "ARM", "Security"].map((t) => (
                    <span key={t} className="terminal-bright">[{t}]</span>
                  ))}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="mb-5">
                <div className="section-heading">DESCRIPTION</div>
                <div className="section-body mt-1 space-y-2">
                  <p>
                    STACQ er et norsk konsulentselskap som jobber utelukkende med
                    embedded- og lavnivåprogrammering.
                  </p>
                  <p className="terminal-dim">
                    Vi leverer spesialiserte konsulenter innen hele embedded-stacken
                    — fra drivere og bootloadere til applikasjonslag og sikkerhet.
                    Vi skriver firmware, systemsoftware og maskinvarenær kode for
                    selskaper som bygger fysiske produkter — fra forsvarssystemer
                    til medisinsk utstyr.
                  </p>
                </div>
              </div>

              {/* KOMPETANSE */}
              <div className="mb-5">
                <div className="section-heading">KOMPETANSE</div>
                <div className="section-body mt-1">
                  {COMPETENCIES.map((row) => (
                    <div key={row.tech} className="flex">
                      <span className="terminal-bright w-[180px] shrink-0">{row.tech}</span>
                      <span className="terminal-dim">{row.area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DOMENER */}
              <div className="mb-5">
                <div className="section-heading">DOMENER</div>
                <div className="section-body mt-1 space-y-1">
                  {DOMAINS.map((d) => (
                    <div key={d.name}>
                      <span className="terminal-bright">{d.name}</span>
                      <span className="terminal-dim"> — {d.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* KARRIERE */}
              <div className="mb-5">
                <div className="section-heading">KARRIERE</div>
                <div className="section-body mt-1">
                  <p>Vi ansetter. Små team, høy standard, lav terskel.</p>
                  <p className="terminal-dim">
                    Vi ser etter folk som skriver god kode og trives med å jobbe tett på hardware.
                  </p>
                  <button
                    onClick={() => setIsOverlayOpen(true)}
                    className="crt-link mt-1 inline-block"
                  >
                    Se ledige stillinger →
                  </button>
                </div>
              </div>

              {/* KONTAKT */}
              <div className="mb-5" id="kontakt">
                <div className="section-heading">KONTAKT</div>
                <div className="section-body mt-1">
                  {CONTACTS.map((c) => (
                    <div key={c.name} className="flex flex-wrap gap-x-4">
                      <span className="terminal-bright w-[180px] shrink-0">{c.name}</span>
                      <a href={`tel:${c.phoneFull}`} className="crt-link">{c.phone}</a>
                      <a href={`mailto:${c.email}`} className="crt-link">{c.email}</a>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEE ALSO / CTA */}
              <div className="mb-6">
                <div className="section-heading">SEE ALSO</div>
                <div className="section-body mt-1">
                  <button
                    onClick={() => setIsOverlayOpen(true)}
                    className="crt-button"
                  >
                    Mer om STACQ →
                  </button>
                </div>
              </div>

              {/* Footer / status bar */}
              <div className="status-bar text-[12px] flex justify-between">
                <span>STACQ AS · Øvre Slottsgate 27, 0157 Oslo · Org.nr. 931 871 389</span>
                <span className="blink-cursor">Manual page stacq(1) line 1 </span>
              </div>
            </div>
          </div>
        </div>

        {/* Monitor stand */}
        <div className="crt-stand" />
      </div>

      <OverlayPanel isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </div>
  );
};

export default Index;
