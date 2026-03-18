export default function Footer({ registeredCount }) {
  if (registeredCount === 0) return null;

  return (
    <div style={{
      position: "sticky", bottom: 0, background: "#1A3C2E", color: "#E8F5EC",
      padding: "14px 2rem", display: "flex", alignItems: "center", justifyContent: "center",
      gap: 12, fontFamily: "'DM Sans', sans-serif",
    }}>
      <span style={{ fontSize: 18 }}>🎉</span>
      <span style={{ fontSize: 14, fontWeight: 500 }}>
        You've registered for{" "}
        <strong style={{ color: "#4CAF82" }}>{registeredCount}</strong>{" "}
        event{registeredCount !== 1 ? "s" : ""}. Thank you for making a difference!
      </span>
    </div>
  );
}