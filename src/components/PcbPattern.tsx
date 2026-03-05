import { useMemo } from "react";

const PcbPattern = () => {
  const dots = useMemo(() => {
    const result: { x: number; y: number; size: number; opacity: number; connected?: { x: number; y: number } }[] = [];
    const gridSize = 28;
    const cols = Math.ceil(1400 / gridSize);
    const rows = Math.ceil(320 / gridSize);

    // Seeded random for consistency
    const seed = (x: number, y: number) => {
      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const rand = seed(col, row);
        if (rand > 0.35) continue; // sparse dots

        const x = col * gridSize + (seed(col + 1, row) - 0.5) * 6;
        const y = row * gridSize + (seed(col, row + 1) - 0.5) * 6;

        // Fade: stronger at top-right, fading toward bottom and left
        const fadeX = Math.pow(x / 1400, 0.4);
        const fadeY = 1 - Math.pow(y / 320, 1.5);
        const opacity = fadeX * fadeY * (0.12 + rand * 0.18);

        const size = 1.2 + seed(col + 3, row) * 1.8;

        // Some dots connect to neighbors via traces
        let connected: { x: number; y: number } | undefined;
        if (seed(col + 5, row + 2) > 0.6) {
          const dirX = seed(col + 7, row) > 0.5 ? 1 : 0;
          const dirY = seed(col, row + 7) > 0.5 ? 1 : 0;
          if (dirX || dirY) {
            connected = {
              x: x + dirX * gridSize,
              y: y + dirY * gridSize,
            };
          }
        }

        result.push({ x, y, size, opacity, connected });
      }
    }
    return result;
  }, []);

  return (
    <div className="absolute inset-x-0 top-0 h-[320px] overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        className="w-full h-full"
        viewBox="0 0 1400 320"
        preserveAspectRatio="xMidYMin slice"
        fill="none"
      >
        {dots.map((dot, i) => (
          <g key={i}>
            {dot.connected && (
              <line
                x1={dot.x}
                y1={dot.y}
                x2={dot.connected.x}
                y2={dot.connected.y}
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
                opacity={dot.opacity * 0.6}
              />
            )}
            <circle
              cx={dot.x}
              cy={dot.y}
              r={dot.size}
              fill="hsl(var(--primary))"
              opacity={dot.opacity}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default PcbPattern;
