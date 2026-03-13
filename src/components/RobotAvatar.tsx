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
    style={{ background: "#080808", display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <pre
      style={{
        color: "#c8a050",
        fontFamily: "'Courier New', monospace",
        fontSize: "clamp(8px, 1.6vw, 14px)",
        lineHeight: 1.25,
        margin: 0,
        userSelect: "none",
      }}
    >
      {ASCII_ROBOT}
    </pre>
  </div>
);

export default RobotAvatar;
