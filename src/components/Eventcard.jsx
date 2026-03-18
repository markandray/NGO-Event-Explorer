import { categoryColors, formatDate, isUpcoming } from "../utils/constants";

export default function EventCard({ event, registered, onRegister }) {
  const upcoming = isUpcoming(event.date);
  const cat = categoryColors[event.category];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        border: registered ? "2px solid #4CAF82" : "1.5px solid #E8EDE6",
        overflow: "hidden",
        transition: "transform 0.18s, box-shadow 0.18s",
        boxShadow: registered ? "0 2px 16px rgba(76,175,130,0.12)" : "0 1px 6px rgba(26,60,46,0.05)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(26,60,46,0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = registered
          ? "0 2px 16px rgba(76,175,130,0.12)"
          : "0 1px 6px rgba(26,60,46,0.05)";
      }}
    >
      <div style={{ height: 4, background: cat.border }} />

      <div style={{ padding: "1.1rem 1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 20, background: cat.bg, color: cat.text, border: `1px solid ${cat.border}` }}>
            {event.category}
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 20, background: upcoming ? "#E8F5EC" : "#F1EFE8", color: upcoming ? "#0F6E56" : "#5F5E5A", border: `1px solid ${upcoming ? "#9FE1CB" : "#D3D1C7"}` }}>
            {upcoming ? "Upcoming" : "Past"}
          </span>
        </div>

        <h3 style={{ fontFamily: "'Lora', serif", fontSize: 16, fontWeight: 600, color: "#1A3C2E", margin: "0 0 6px", lineHeight: 1.35 }}>
          {event.title}
        </h3>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#5A7A65", lineHeight: 1.55, margin: "0 0 12px", fontWeight: 300 }}>
          {event.description}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 13 }}>📅</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#3B6D11", fontWeight: 500 }}>{formatDate(event.date)}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 13 }}>📍</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#5A7A65" }}>{event.location}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 13 }}>👥</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#5A7A65" }}>{event.spots} spots · {event.organizer}</span>
          </div>
        </div>

        <button
          onClick={() => upcoming && onRegister(event.id)}
          style={{
            width: "100%", padding: "10px 0", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
            borderRadius: 8, border: "1.5px solid", cursor: "pointer", transition: "all 0.18s",
            background: registered ? "#E8F5EC" : upcoming ? "#1A3C2E" : "transparent",
            borderColor: registered ? "#4CAF82" : upcoming ? "#1A3C2E" : "#D4E8DA",
            color: registered ? "#0F6E56" : upcoming ? "#fff" : "#9FE1CB",
          }}
        >
          {registered ? "Registered ✅" : upcoming ? "Register Now" : "View Details"}
        </button>
      </div>
    </div>
  );
}