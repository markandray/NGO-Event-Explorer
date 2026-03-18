export default function Header({ totalEvents, upcomingCount, registeredCount }) {
  return (
    <div style={{ background: "#1A3C2E", color: "#E8F5EC", padding: "2.5rem 2rem 2rem" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#4CAF82", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 18 }}>🤝</span>
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "#9FE1CB", fontWeight: 500 }}>
            Social Impact Platform
          </span>
        </div>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 600, margin: "0 0 8px", lineHeight: 1.2, color: "#E8F5EC" }}>
          NGO Event Explorer
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#9FE1CB", margin: "0 0 2rem", fontWeight: 300 }}>
          Discover, connect, and make a difference in your community.
        </p>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            { label: "Total Events", value: totalEvents },
            { label: "Upcoming", value: upcomingCount },
            { label: "Registered", value: registeredCount },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 20px", textAlign: "center", minWidth: 90 }}>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 26, fontWeight: 600, color: "#4CAF82", lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9FE1CB", marginTop: 4, fontWeight: 300 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}