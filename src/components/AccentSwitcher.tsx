import { useState, useEffect } from "react";

const ACCENTS = [
  { name: "Copper", value: "#C4703A" },
  { name: "Steel Blue", value: "#7B9EAE" },
];

const AccentSwitcher = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("stacq-accent");
    if (saved) {
      const idx = ACCENTS.findIndex((a) => a.value === saved);
      if (idx >= 0) {
        setActiveIndex(idx);
        root.style.setProperty("--accent", saved);
      }
    }
  }, []);

  const handleSwitch = (index: number) => {
    setActiveIndex(index);
    const color = ACCENTS[index].value;
    document.documentElement.style.setProperty("--accent", color);
    localStorage.setItem("stacq-accent", color);
  };

  return (
    <div
      className="fixed flex items-center gap-2"
      style={{ bottom: "80px", right: "24px", zIndex: 40 }}
    >
      <span
        className="font-mono uppercase"
        style={{ fontSize: "10px", color: "hsl(var(--muted-foreground))" }}
      >
        Accent
      </span>
      {ACCENTS.map((accent, i) => (
        <button
          key={accent.name}
          onClick={() => handleSwitch(i)}
          aria-label={`Switch accent to ${accent.name}`}
          className="rounded-full border-2 transition-all"
          style={{
            width: "16px",
            height: "16px",
            backgroundColor: accent.value,
            borderColor: activeIndex === i ? "hsl(var(--foreground))" : "transparent",
          }}
        />
      ))}
    </div>
  );
};

export default AccentSwitcher;
