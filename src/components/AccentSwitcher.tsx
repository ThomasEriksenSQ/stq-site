import { useState } from "react";

const ACCENTS = [
  { label: "Kobber", hex: "#C4703A", hsl: "23 54% 50%" },
  { label: "Stålblå", hex: "#7B9EAE", hsl: "200 22% 58%" },
];

const AccentSwitcher = () => {
  const [active, setActive] = useState(0);

  const pick = (i: number) => {
    setActive(i);
    const { hsl } = ACCENTS[i];
    document.documentElement.style.setProperty("--accent", hsl);
    document.documentElement.style.setProperty("--primary", hsl);
    document.documentElement.style.setProperty("--ring", hsl);
  };

  return (
    <div
      className="fixed z-40 flex flex-col items-center gap-1.5"
      style={{ bottom: 80, right: 24 }}
    >
      <span
        className="text-[10px] font-mono tracking-[0.1em]"
        style={{ color: "hsl(var(--text-faint))" }}
      >
        ACCENT
      </span>
      <div
        className="flex items-center border border-border"
        style={{
          background: "hsl(var(--surface))",
          borderRadius: 2,
          padding: "8px 10px",
          gap: 8,
        }}
      >
        {ACCENTS.map((a, i) => (
          <button
            key={a.hex}
            aria-label={a.label}
            onClick={() => pick(i)}
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: a.hex,
              cursor: "pointer",
              outline: active === i ? "2px solid white" : "none",
              outlineOffset: active === i ? 2 : 0,
              transition: "outline 0.2s ease, outline-offset 0.2s ease",
              border: "none",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AccentSwitcher;
