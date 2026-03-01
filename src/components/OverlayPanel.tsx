import { useState, useEffect, useRef } from "react";
import { X, ArrowLeft, Phone, Mail } from "lucide-react";
import stacqLogo from "@/assets/stacq-logo-black.png";
import jonRichardImg from "@/assets/jon-richard-nygaard.avif";
import thomasEriksenImg from "@/assets/thomas-eriksen.avif";
import HandbookOverlay from "@/components/HandbookOverlay";

interface OverlayPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const JobOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-[92%] md:w-[38%] md:min-w-[370px] bg-background border-l border-border overflow-y-auto animate-slide-in-right flex flex-col shadow-lg">
        <div className="sticky top-0 z-10 px-6 md:px-[96px] py-4 bg-background border-b border-border">
          <div className="max-w-[640px] w-full">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-accent hover:underline text-[13px]"
            >
              <ArrowLeft className="w-4 h-4" />
              Tilbake
            </button>
          </div>
        </div>

        <div className="p-6 md:p-[96px] flex-1">
          <div className="max-w-[640px] w-full space-y-10">
            <h2 className="text-[38px] font-bold text-foreground leading-[1.15]">
              Senior Embedded Konsulent
            </h2>

            <div className="space-y-3 text-foreground text-[18px] leading-[1.7]">
              <p>
                STACQ er et rendyrket konsulentselskap for embedded-utviklere. Vi jobber kun med embedded og lavnivå – og leverer kode som brukes i virkelige produkter.
              </p>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="text-[22px] font-semibold text-foreground mb-4">Hvorfor STACQ</h3>
                <ul className="space-y-2 text-foreground text-[18px] leading-[1.7]">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-[2px]">–</span>
                    <span>Rendyrket fokus på embedded og lavnivå</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-[2px]">–</span>
                    <span>Prosjekter med reell betydning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-[2px]">–</span>
                    <span>Sterkt fagmiljø (lavt ego, høy standard)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-[2px]">–</span>
                    <span>Faglig utvikling på dine premisser</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-[2px]">–</span>
                    <span>Fleksibilitet og tillit i hverdagen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-[2px]">–</span>
                    <span>Markedsledende betingelser</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[22px] font-semibold text-foreground mb-4">Vi ser etter</h3>
                <ul className="space-y-2 text-foreground text-[18px] leading-[1.7]">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-[2px]">–</span>
                    <span>5+ års erfaring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-[2px]">–</span>
                    <span>C / C++ / Rust (ett eller flere)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-[2px]">–</span>
                    <span>Embedded systemer / RTOS / Embedded Linux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-[2px]">–</span>
                    <span>Trives i team og tar ansvar for kvalitet</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[22px] font-semibold text-foreground mb-4">Ta kontakt</h3>
                <p className="text-foreground text-[18px] leading-[1.7]">
                  Send en kort søknad eller ta kontakt for en uformell prat.
                </p>
                <div className="mt-4 space-y-1">
                  <a href="mailto:jr@stacq.no" className="block text-[14px] text-accent hover:underline">jr@stacq.no</a>
                  <a href="tel:93287267" className="block text-[14px] text-accent hover:underline">93287267</a>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <a href="#" className="text-[14px] text-accent hover:underline">
                  STACQ Handbook →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-[96px] py-6 border-t border-border mt-auto">
          <div className="max-w-[640px] w-full">
            <p className="text-[13px] text-muted-foreground">
              STACQ AS · Øvre Slottsgate 27, 0157 Oslo · post@stacq.no · Org.nr. 931 871 389 MVA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OverlayPanel = ({ isOpen, onClose }: OverlayPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isJobOpen && !isHandbookOpen) onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, isJobOpen, isHandbookOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 animate-fade-in"
        style={{ background: "rgba(36,41,47,0.08)" }}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className={`absolute right-0 top-0 h-full w-full md:w-[42%] md:min-w-[440px] bg-background border-l border-border overflow-y-auto animate-slide-in-right transition-opacity duration-200 flex flex-col shadow-lg ${(isJobOpen || isHandbookOpen) ? "opacity-40" : "opacity-100"}`}
      >

        <div className="p-6 md:p-[96px] flex-1">
          <div className="max-w-[640px] w-full space-y-10">
            {/* Intro */}
            <section className="space-y-5">
              <h1 className="text-[44px] font-bold text-foreground leading-[1.15] pb-5 border-b border-border">Konsulentselskapet STACQ</h1>
              <p className="text-[20px] font-semibold text-foreground leading-[1.5]">
                Velkommen til STACQ. Vi er et norsk konsulentselskap med ekspertise innen embedded- og lavnivåprogrammering.
              </p>
              <p className="text-foreground text-[18px] leading-[1.7]">
                STACQ hjelper med å dekke IT-konsulentbehov og er spesialister innen embedded-systemer og systemutvikling. Vår omfattende erfaring og spisskompetanse gjør oss til en pålitelig partner for spesialkompetanse.
              </p>
            </section>

            {/* Kompetanse */}
            <section className="space-y-4">
              <h2 className="text-[24px] font-semibold text-foreground leading-[1.35]">Ekspertise innen embedded- og lavnivåprogrammering</h2>
              <div className="space-y-3 text-foreground text-[18px] leading-[1.7]">
                <p>Erfarne ingeniører med tung systemforståelse og bakgrunn fra krevende teknologimiljøer.</p>
                <p>Vi utvikler robuste og sikre løsninger med fokus på kvalitet, presisjon og ansvar.</p>
              </div>
              <div className="code-block w-full text-[14px] leading-[1.6]">
                <div className="mt-0">
                  <div className="font-semibold text-[#4caf50] leading-[1.3]">Språk</div>
                  <div>C, C++, Rust, Python, Assembly</div>
                </div>
                <div className="mt-3">
                  <div className="font-semibold text-[#4caf50] leading-[1.3]">Firmware & sanntid</div>
                  <div>Bare-metal og RTOS (FreeRTOS, Zephyr, ThreadX)</div>
                  <div>Bootloader, secure boot og TrustZone</div>
                </div>
                <div className="mt-3">
                  <div className="font-semibold text-[#4caf50] leading-[1.3]">Embedded Linux</div>
                  <div>Yocto, board bring-up og kernel-tilpasning</div>
                  <div>Qt / applikasjonslag</div>
                  <div>OTA og systemtjenester</div>
                </div>
                <div className="mt-3">
                  <div className="font-semibold text-[#4caf50] leading-[1.3]">Maskinvare</div>
                  <div>ARM Cortex-M / Cortex-A</div>
                  <div>STM32, NXP i.MX, Nordic nRF, ESP32</div>
                  <div>FPGA / HDL</div>
                </div>
                <div className="mt-3">
                  <div className="font-semibold text-[#4caf50] leading-[1.3]">Kommunikasjon</div>
                  <div>CAN / CANopen</div>
                  <div>Modbus (RTU / TCP)</div>
                  <div>SPI, I2C, UART, RS485</div>
                  <div>TCP/IP, MQTT, BLE, Zigbee, ISO15118</div>
                </div>
                <div className="mt-3">
                  <div className="font-semibold text-[#4caf50] leading-[1.3]">System</div>
                  <div>Sanntidssystemer</div>
                  <div>Sikkerhetskritiske og regulerte systemer (IEC 62304)</div>
                  <div>Sensor- og motorstyring</div>
                  <div>Arkitektur, test og CI/CD for embedded</div>
                </div>
              </div>
            </section>

            {/* Jobb hos oss */}
            <section className="space-y-4">
              <h2 className="text-[24px] font-semibold text-foreground leading-[1.35]">Jobb hos oss</h2>
              <div className="space-y-1">
                <button
                  onClick={() => setIsJobOpen(true)}
                  className="block text-[14px] text-accent hover:underline"
                >
                  Se ledige stillinger →
                </button>
                <button
                  onClick={() => setIsHandbookOpen(true)}
                  className="block text-[14px] text-accent hover:underline"
                >
                  STACQ Handbook →
                </button>
              </div>
            </section>

            {/* Kontakt */}
            <section className="space-y-6">
              <h2 className="text-[24px] font-semibold text-foreground leading-[1.35]">Kontakt</h2>
              <div className="grid grid-cols-2 gap-6">
                {/* Jon Richard */}
                <div className="flex items-start gap-3">
                  <img src={jonRichardImg} alt="Jon Richard Nygaard" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[15px] font-semibold text-foreground">Jon Richard Nygaard <span className="font-normal text-muted-foreground">| Partner</span></p>
                    <a href="tel:93287267" className="flex items-center gap-2 text-[14px] text-accent hover:underline">
                      <Phone className="w-3.5 h-3.5" /> 93 287 267
                    </a>
                    <a href="mailto:jr@stacq.no" className="flex items-center gap-2 text-[14px] text-accent hover:underline">
                      <Mail className="w-3.5 h-3.5" /> jr@stacq.no
                    </a>
                  </div>
                </div>
                {/* Thomas */}
                <div className="flex items-start gap-3">
                  <img src={thomasEriksenImg} alt="Thomas Eriksen" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[15px] font-semibold text-foreground">Thomas Eriksen <span className="font-normal text-muted-foreground">| Partner</span></p>
                    <a href="tel:97500321" className="flex items-center gap-2 text-[14px] text-accent hover:underline">
                      <Phone className="w-3.5 h-3.5" /> 97 500 321
                    </a>
                    <a href="mailto:thomas@stacq.no" className="flex items-center gap-2 text-[14px] text-accent hover:underline">
                      <Mail className="w-3.5 h-3.5" /> thomas@stacq.no
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <JobOverlay isOpen={isJobOpen} onClose={() => setIsJobOpen(false)} />
      <HandbookOverlay isOpen={isHandbookOpen} onClose={() => setIsHandbookOpen(false)} />
    </div>
  );
};

export default OverlayPanel;
