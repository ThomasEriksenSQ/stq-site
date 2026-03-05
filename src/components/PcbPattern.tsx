import { useMemo } from "react";

// Seeded pseudo-random
const seededRand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

interface Trace {
  points: { x: number; y: number }[];
  dotRadius: number;
  opacity: number;
}

const PcbPattern = () => {
  const traces = useMemo(() => {
    const result: Trace[] = [];
    const W = 1400;
    const H = 360;

    // Generate traces that start from edges and flow inward with 90° turns
    for (let i = 0; i < 45; i++) {
      const r1 = seededRand(i * 3.7);
      const r2 = seededRand(i * 5.3 + 1);
      const r3 = seededRand(i * 7.1 + 2);
      const r4 = seededRand(i * 11.3 + 3);
      const r5 = seededRand(i * 13.7 + 4);

      const points: { x: number; y: number }[] = [];
      let x: number, y: number;

      // Start from top or right edge
      const edge = r1 > 0.5 ? "top" : "right";
      if (edge === "top") {
        x = 200 + r2 * (W - 400);
        y = -5;
      } else {
        x = W + 5;
        y = r2 * H * 0.7;
      }
      points.push({ x, y });

      // Generate 2-4 segments with 90° turns
      const segments = 2 + Math.floor(r3 * 3);
      let horizontal = edge === "top" ? false : true; // first direction

      for (let s = 0; s < segments; s++) {
        const len = 30 + seededRand(i * 17 + s * 31) * 120;
        if (horizontal) {
          x += (seededRand(i * 23 + s * 41) > 0.4 ? -1 : 1) * len;
        } else {
          y += len;
        }
        // Clamp
        x = Math.max(20, Math.min(W - 20, x));
        y = Math.max(0, Math.min(H - 20, y));
        points.push({ x, y });
        horizontal = !horizontal;
      }

      // Fade based on how far the endpoint is from edges
      const endX = points[points.length - 1].x;
      const endY = points[points.length - 1].y;
      const centerDist = Math.sqrt(
        Math.pow((endX - W / 2) / (W / 2), 2) +
        Math.pow((endY - H / 2) / (H / 2), 2)
      );
      // Traces near edges are more visible, center fades out
      const edgeFade = Math.min(1, centerDist * 0.8);
      const opacity = 0.06 + edgeFade * 0.12 * r4;

      result.push({
        points,
        dotRadius: 1.5 + r5 * 2.5,
        opacity,
      });
    }

    return result;
  }, []);

  // Also generate some standalone junction dots
  const junctionDots = useMemo(() => {
    const dots: { x: number; y: number; r: number; opacity: number }[] = [];
    for (let i = 0; i < 30; i++) {
      const r1 = seededRand(i * 19.3 + 100);
      const r2 = seededRand(i * 23.7 + 200);
      const r3 = seededRand(i * 29.1 + 300);
      // Cluster near top-right and top areas
      const x = 100 + r1 * 1200;
      const y = 10 + r2 * 200;
      const distFromCenter = Math.sqrt(
        Math.pow((x - 700) / 700, 2) + Math.pow((y - 180) / 180, 2)
      );
      const opacity = 0.04 + Math.min(distFromCenter, 1) * 0.1 * r3;
      dots.push({ x, y, r: 1.5 + r3 * 2, opacity });
    }
    return dots;
  }, []);

  return (
    <div className="absolute inset-x-0 top-0 h-[360px] overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        className="w-full h-full"
        viewBox="0 0 1400 360"
        preserveAspectRatio="xMidYMin slice"
        fill="none"
      >
        {/* Circuit traces */}
        {traces.map((trace, i) => {
          const d = trace.points
            .map((p, j) => `${j === 0 ? "M" : "L"}${p.x},${p.y}`)
            .join(" ");
          const lastPoint = trace.points[trace.points.length - 1];
          return (
            <g key={i}>
              <path
                d={d}
                stroke="hsl(var(--primary))"
                strokeWidth="0.8"
                opacity={trace.opacity * 0.7}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Dot at end of trace */}
              <circle
                cx={lastPoint.x}
                cy={lastPoint.y}
                r={trace.dotRadius}
                fill="hsl(var(--primary))"
                opacity={trace.opacity}
              />
              {/* Small dot at start */}
              <circle
                cx={trace.points[0].x}
                cy={trace.points[0].y}
                r={1}
                fill="hsl(var(--primary))"
                opacity={trace.opacity * 0.5}
              />
            </g>
          );
        })}

        {/* Junction dots */}
        {junctionDots.map((dot, i) => (
          <circle
            key={`jd-${i}`}
            cx={dot.x}
            cy={dot.y}
            r={dot.r}
            fill="hsl(var(--primary))"
            opacity={dot.opacity}
          />
        ))}

        {/* Fade to transparent at bottom */}
        <defs>
          <linearGradient id="pcb-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="1" />
            <stop offset="0.7" stopColor="white" stopOpacity="1" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="pcb-mask">
            <rect width="1400" height="360" fill="url(#pcb-fade)" />
          </mask>
        </defs>
      </svg>
      {/* Bottom fade overlay */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default PcbPattern;
