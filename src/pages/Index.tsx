import { useState } from "react";
import { Phone, Mail } from "lucide-react";
import OverlayPanel from "@/components/OverlayPanel";
import stacqLogoBlack from "@/assets/stacq-logo-black.png";
import jonRichardImg from "@/assets/jon-richard-nygaard.avif";
import thomasEriksenImg from "@/assets/thomas-eriksen.avif";

const Index = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ═══ STICKY HEADER ═══ */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-[768px] mx-auto px-6 h-14 flex items-center justify-between">
          <img src={stacqLogoBlack} alt="STACQ" className="h-5" />
          <a href="#kontakt" className="text-sm font-medium text-accent hover:underline">
            Kontakt oss
          </a>
        </div>
      </header>

      <main className="max-w-[768px] mx-auto px-6">
        {/* ═══ INTRO ═══ */}
        <section className="py-12 md:py-16 border-b border-border">
          <h1 className="text-[28px] md:text-[32px] font-bold leading-tight text-foreground">
            STACQ
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Embedded konsulenter for lavnivåprogrammering. Vi skriver firmware, systemsoftware og maskinvarenær kode for selskaper som bygger fysiske produkter.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["C / C++", "Rust", "Firmware", "Embedded Linux", "Yocto", "RTOS", "ARM", "Security"].map((tag) => (
              <code key={tag} className="code-badge">{tag}</code>
            ))}
          </div>
          <div className="mt-6">
            <button
              onClick={() => setIsOverlayOpen(true)}
              className="text-sm font-medium text-accent hover:underline"
            >
              Mer om STACQ →
            </button>
          </div>
        </section>

        {/* ═══ OM OSS ═══ */}
        <section className="py-10 md:py-14 border-b border-border">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">Om oss</h2>
          <p className="mt-4 text-base leading-[1.7] text-foreground">
            STACQ er et norsk konsulentselskap som jobber utelukkende med embedded- og lavnivåprogrammering.
          </p>
          <p className="mt-3 text-base leading-[1.7] text-muted-foreground">
            Vi leverer spesialiserte konsulenter innen hele embedded-stacken — fra drivere og bootloadere til applikasjonslag og sikkerhet. Vi skriver firmware, systemsoftware og maskinvarenær kode for selskaper som bygger fysiske produkter — fra forsvarssystemer til medisinsk utstyr.
          </p>
        </section>

        {/* ═══ KOMPETANSE ═══ */}
        <section className="py-10 md:py-14 border-b border-border">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">Kompetanse</h2>
          <p className="mt-4 text-base leading-[1.7] text-muted-foreground">
            Dyp teknisk kompetanse innen hele embedded-stacken.
          </p>
          <table className="docs-table mt-6">
            <thead>
              <tr>
                <th className="w-1/3">Teknologi</th>
                <th>Område</th>
              </tr>
            </thead>
            <tbody>
              {[
                { tech: "C / C++", area: "Firmware & systemkode" },
                { tech: "Rust", area: "Sikker lavnivåkode" },
                { tech: "RTOS", area: "FreeRTOS, Zephyr, m.fl." },
                { tech: "Embedded Linux", area: "Kernel, drivere, BSP" },
                { tech: "Yocto", area: "Distribusjon & bygg" },
                { tech: "Security", area: "TrustZone, sikker boot, krypto" },
                { tech: "ARM", area: "Cortex-M/A, RISC-V" },
                { tech: "CI / Test", area: "Hardware-in-the-loop, automatisert test" },
              ].map((row) => (
                <tr key={row.tech}>
                  <td><code className="code-badge">{row.tech}</code></td>
                  <td className="text-muted-foreground">{row.area}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ═══ DOMENER ═══ */}
        <section className="py-10 md:py-14 border-b border-border">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">Domener</h2>
          <p className="mt-4 text-base leading-[1.7] text-muted-foreground">
            Vi jobber der software møter hardware — i bransjer der pålitelighet er kritisk.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              { name: "Forsvar", desc: "Kritiske systemer med strenge krav til robusthet og sikkerhet." },
              { name: "Medtech", desc: "Medisinsk-teknisk utstyr der pålitelighet redder liv." },
              { name: "Industri", desc: "Automasjon, IoT og sanntidsstyring i industrielle omgivelser." },
              { name: "Energi", desc: "Smart infrastruktur og styringssystemer for energisektoren." },
            ].map((d) => (
              <li key={d.name} className="text-base leading-[1.7]">
                <strong className="text-foreground">{d.name}</strong>
                <span className="text-muted-foreground"> — {d.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ═══ KARRIERE ═══ */}
        <section className="py-10 md:py-14 border-b border-border">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">Karriere</h2>
          <div className="admonition mt-6">
            <p className="font-semibold text-foreground">💡 Vi ansetter</p>
            <p className="mt-2 text-[15px] leading-[1.7] text-foreground">
              Små team, høy standard, lav terskel. Vi ser etter folk som skriver god kode og trives med å jobbe tett på hardware.
            </p>
            <button
              onClick={() => setIsOverlayOpen(true)}
              className="mt-3 text-sm font-medium text-accent hover:underline"
            >
              Se ledige stillinger →
            </button>
          </div>
        </section>

        {/* ═══ KONTAKT ═══ */}
        <section id="kontakt" className="py-10 md:py-14 border-b border-border">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">Kontakt</h2>
          <div className="mt-6 space-y-4">
            {[
              { name: "Jon Richard Nygaard", img: jonRichardImg, phone: "93 287 267", phoneFull: "93287267", email: "jr@stacq.no" },
              { name: "Thomas Eriksen", img: thomasEriksenImg, phone: "97 500 321", phoneFull: "97500321", email: "thomas@stacq.no" },
            ].map((person) => (
              <div key={person.name} className="flex items-center gap-4 p-4 rounded border border-border">
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-semibold text-foreground">{person.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
                    <a href={`tel:${person.phoneFull}`} className="flex items-center gap-1.5 text-accent">
                      <Phone className="w-3.5 h-3.5" /> {person.phone}
                    </a>
                    <a href={`mailto:${person.email}`} className="flex items-center gap-1.5 text-accent">
                      <Mail className="w-3.5 h-3.5" /> {person.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border">
        <div className="max-w-[768px] mx-auto px-6 py-8">
          <p className="text-xs text-muted-foreground">
            STACQ AS · Øvre Slottsgate 27, 0157 Oslo · post@stacq.no · Org.nr. 931 871 389
          </p>
        </div>
      </footer>

      <OverlayPanel isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </div>
  );
};

export default Index;
