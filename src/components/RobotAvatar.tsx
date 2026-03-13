const ASCII_ROBOT = `
   ┌────────────┐
   │  ○      ○  │
   │     ──     │
   │  ────────  │
   └────┬──┬────┘
        │  │
   ┌────┘  └────┐
  ╱              ╲
 ╱  ┌──────────┐  ╲
 ‾‾‾┴──────────┴‾‾‾`.trimStart();

interface RobotAvatarProps {
  className?: string;
}

const RobotAvatar = ({ className }: RobotAvatarProps) => (
  <div
    className={className}
    style={{
      background: "#080808",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      containerType: "inline-size",
    }}
  >
    <pre
      style={{
        color: "#c8a050",
        fontFamily: "'Courier New', monospace",
        fontSize: "clamp(7px, 3.5cqw, 13px)",
        lineHeight: 1.25,
        margin: 0,
        userSelect: "none",
        whiteSpace: "pre",
      }}
    >
      {ASCII_ROBOT}
    </pre>
  </div>
);

export default RobotAvatar;
