import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import stacqLogoWhite from "@/assets/stacq-logo-white.png";
import stacqLogoBlack from "@/assets/stacq-logo-black.png";
import heroBgChip from "@/assets/hero-bg-chip.png";
import jonRichardImg from "@/assets/jon-richard-nygaard.avif";
import thomasEriksenImg from "@/assets/thomas-eriksen.avif";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay },
});

const categories = [
  { label: "Språk", items: ["C", "C++", "Rust", "Python", "Assembly"] },
  { label: "Firmware & sanntid", items: ["Bare-metal", "RTOS", "FreeRTOS", "Zephyr", "ThreadX", "Bootloader", "Secure Boot", "TrustZone"] },
  { label: "Embedded Linux", items: ["Yocto", "Board bring-up", "Kernel-tilpasning", "Qt", "OTA", "Systemtjenester"] },
  { label: "Maskinvare", items: ["ARM Cortex-M", "Cortex-A", "STM32", "NXP i.MX", "Nordic nRF", "ESP32", "FPGA / HDL"] },
  { label: "Kommunikasjon", items: ["CAN", "Modbus", "SPI", "I2C", "UART", "RS485", "TCP/IP", "MQTT", "BLE", "Zigbee", "ISO15118"] },
  { label: "System", items: ["Sanntidssystemer", "Sikkerhetskritiske systemer", "Sensor- og motorstyring", "Arkitektur", "Test", "CI/CD"] },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-hidden">
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

          <motion.h1 {...fadeUp(0.15)} className="text-[36px] md:text-[64px] lg:text-[72px] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
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
            <a
              href="#om"
              className="group text-[14px] font-medium tracking-[0.03em] px-6 py-2.5 rounded-md h-[42px] inline-flex items-center gap-2.5 transition-all duration-200 bg-white/[0.08] text-white/90 border border-white/[0.12] hover:bg-white/[0.13] hover:border-white/[0.22] hover:text-white"
            >
              Mer om STACQ
              <svg
                className="transition-transform duration-200 group-hover:translate-y-[1px]"
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 3v10" />
                <path d="M3 8l5 5 5-5" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Om STACQ */}
      <section id="om" className="px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="max-w-[720px]">
          <motion.h2 {...fadeUp(0)} className="text-[34px] md:text-[42px] font-bold text-foreground leading-[1.15] pb-6 border-b border-border">
            Konsulentselskapet STACQ
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="mt-8 text-[18px] font-semibold text-foreground leading-[1.5]">
            Velkommen til STACQ. Vi er et norsk konsulentselskap med ekspertise innen embedded- og lavnivåprogrammering.
          </motion.p>
          <motion.p {...fadeUp(0.15)} className="mt-4 text-foreground text-[16px] leading-[1.7]">
            STACQ er en teknologipartner med solid faglig tyngde og forståelse for hvordan teknologi skaper verdi over tid. Vi arbeider tett med kundene våre, leverer løsninger av høy kvalitet og bygger langsiktige samarbeid basert på tillit, ansvar og innovasjon.
          </motion.p>
        </div>
      </section>

      {/* Kompetanse */}
      <section className="px-8 md:px-16 lg:px-24 py-24 md:py-32 bg-secondary">
        <div className="max-w-[720px]">
          <motion.h2 {...fadeUp(0)} className="text-[26px] md:text-[32px] font-semibold text-foreground leading-[1.25] mb-4">
            Spesialister på embedded- og lavnivåutvikling
          </motion.h2>
          <motion.p {...fadeUp(0.05)} className="text-foreground text-[16px] leading-[1.7] mb-10">
            Erfarne ingeniører med solid systemforståelse og bakgrunn fra krevende teknologiprosjekter – ansvarsbevisste, samarbeidsorienterte og profesjonelle.
          </motion.p>
          <div className="space-y-6">
            {categories.map((category, i) => (
              <motion.div key={category.label} {...fadeUp(0.05 + i * 0.04)}>
                <p className="text-[13px] font-semibold text-muted-foreground mb-2">{category.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((item) => (
                    <span key={item} className="text-[13px] px-3 py-1 rounded-full border border-border bg-background text-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobb hos oss */}
      <section id="jobb" className="px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="max-w-[720px]">
          <motion.h2 {...fadeUp(0)} className="text-[26px] md:text-[32px] font-semibold text-foreground leading-[1.25] mb-6">
            Jobb hos oss
          </motion.h2>
          <motion.p {...fadeUp(0.05)} className="text-foreground text-[16px] leading-[1.7] mb-10">
            STACQ er et rendyrket konsulentselskap for embedded-utviklere. Vi jobber kun med embedded og lavnivå – og leverer kode som brukes i virkelige produkter.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div {...fadeUp(0.1)}>
              <h3 className="text-[18px] font-semibold text-foreground mb-4">Hvorfor STACQ</h3>
              <ul className="space-y-2 text-foreground text-[16px] leading-[1.7]">
                {["Rendyrket fokus på embedded og lavnivå", "Prosjekter med reell betydning", "Sterkt fagmiljø (lavt ego, høy standard)", "Faglig utvikling på dine premisser", "Fleksibilitet og tillit i hverdagen", "Markedsledende betingelser"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-[2px]">–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeUp(0.15)}>
              <h3 className="text-[18px] font-semibold text-foreground mb-4">Vi ser etter</h3>
              <ul className="space-y-2 text-foreground text-[16px] leading-[1.7]">
                {["5+ års erfaring", "C / C++ / Rust (ett eller flere)", "Embedded systemer / RTOS / Embedded Linux", "Trives i team og tar ansvar for kvalitet"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-[2px]">–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.2)} className="mt-10">
            <p className="text-foreground text-[16px] leading-[1.7]">
              Send en kort søknad eller ta kontakt for en uformell prat.
            </p>
            <div className="mt-3 space-y-1">
              <a href="mailto:jr@stacq.no" className="block text-[14px] text-accent hover:underline">jr@stacq.no</a>
              <a href="tel:93287267" className="block text-[14px] text-accent hover:underline">93 28 72 67</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="px-8 md:px-16 lg:px-24 py-24 md:py-32 bg-secondary">
        <div className="max-w-[720px]">
          <motion.h2 {...fadeUp(0)} className="text-[26px] md:text-[32px] font-semibold text-foreground leading-[1.25] mb-8">
            Kontakt
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <motion.div {...fadeUp(0.05)} className="flex items-start gap-4">
              <img src={jonRichardImg} alt="Jon Richard Nygaard" className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
              <div className="space-y-1.5">
                <p className="text-[16px] font-semibold text-foreground">
                  Jon Richard Nygaard <span className="font-normal text-muted-foreground">| Partner</span>
                </p>
                <a href="tel:93287267" className="flex items-center gap-2 text-[14px] text-accent hover:underline">
                  <Phone className="w-3.5 h-3.5" /> 93 287 267
                </a>
                <a href="mailto:jr@stacq.no" className="flex items-center gap-2 text-[14px] text-accent hover:underline">
                  <Mail className="w-3.5 h-3.5" /> jr@stacq.no
                </a>
              </div>
            </motion.div>
            <motion.div {...fadeUp(0.1)} className="flex items-start gap-4">
              <img src={thomasEriksenImg} alt="Thomas Eriksen" className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
              <div className="space-y-1.5">
                <p className="text-[16px] font-semibold text-foreground">
                  Thomas Eriksen <span className="font-normal text-muted-foreground">| Partner</span>
                </p>
                <a href="tel:97500321" className="flex items-center gap-2 text-[14px] text-accent hover:underline">
                  <Phone className="w-3.5 h-3.5" /> 97 500 321
                </a>
                <a href="mailto:thomas@stacq.no" className="flex items-center gap-2 text-[14px] text-accent hover:underline">
                  <Mail className="w-3.5 h-3.5" /> thomas@stacq.no
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 md:px-16 lg:px-24 py-8 border-t border-border">
        <div className="max-w-[720px] flex items-center justify-between">
          <p className="text-[13px] text-muted-foreground">
            STACQ AS · Øvre Slottsgate 27, 0157 Oslo · post@stacq.no · Org.nr. 931 871 389 MVA
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
