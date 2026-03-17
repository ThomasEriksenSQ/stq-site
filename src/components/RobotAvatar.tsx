const ASCII_ROBOT = `┌────────────┐
│  ○      ○  │
│     ──     │
│  ────────  │
└────┬──┬────┘
     │  │
┌────┘  └────┐
╱            ╲
╱ ┌──────────┐╲
‾‾┴──────────┴‾‾`;

interface RobotAvatarProps {
  className?: string;
  fontSize?: string;
}

const RobotAvatar = ({ className, fontSize }: RobotAvatarProps) => (
  <div
    className={className}
    style={{
      background: "#080808",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <pre
      style={{
        color: "#c8a050",
        fontFamily: "'Courier New', monospace",
        fontSize: fontSize ?? "clamp(8px, 2.8vw, 18px)",
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
