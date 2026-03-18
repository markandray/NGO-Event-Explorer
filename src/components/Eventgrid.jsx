import EventCard from "./Eventcard";

export default function EventGrid({ loading, error, events, registeredEvents, onRegister }) {
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "#7AAF8A", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🌱</div>
        <p style={{ fontSize: 15 }}>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", color: "#A32D2D", background: "#FCEBEB", borderRadius: 12, fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ fontSize: 32 }}>⚠️</div>
        <p style={{ fontWeight: 500 }}>Failed to load events: {error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "#7AAF8A", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
        <p style={{ fontSize: 16, fontWeight: 500, color: "#3B6D11" }}>No events found</p>
        <p style={{ fontSize: 14, color: "#7AAF8A" }}>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7AAF8A", marginBottom: "1.5rem" }}>
        Showing {events.length} event{events.length !== 1 ? "s" : ""}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            registered={registeredEvents.has(event.id)}
            onRegister={onRegister}
          />
        ))}
      </div>
    </>
  );
}