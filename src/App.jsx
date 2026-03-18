import { useState, useEffect } from "react";
import { mapPostToEvent, isUpcoming } from "./utils/constants";
import Header from "./components/Header";
import Filters from "./components/Filters";
import EventGrid from "./components/Eventgrid";
import Footer from "./components/Footer";

export default function App() {
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=21");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data.map(mapPostToEvent));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleRegister = (id) => {
    setRegisteredEvents((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter =
      filter === "all" ? true
      : filter === "upcoming" ? isUpcoming(event.date)
      : !isUpcoming(event.date);
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    return matchesSearch && matchesFilter && matchesCategory;
  });

  const upcomingCount = events.filter((e) => isUpcoming(e.date)).length;

  return (
    <div style={{ fontFamily: "'Lora', Georgia, serif", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      <Header
        totalEvents={events.length}
        upcomingCount={upcomingCount}
        registeredCount={registeredEvents.size}
      />

      <Filters
        searchText={searchText}
        setSearchText={setSearchText}
        filter={filter}
        setFilter={setFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem" }}>
        <EventGrid
          loading={loading}
          error={error}
          events={filteredEvents}
          registeredEvents={registeredEvents}
          onRegister={handleRegister}
        />
      </div>

      <Footer registeredCount={registeredEvents.size} />
    </div>
  );
}