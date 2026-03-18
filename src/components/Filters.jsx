import { categories } from "../utils/constants";

export default function Filters({ searchText, setSearchText, filter, setFilter, categoryFilter, setCategoryFilter }) {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #E8EDE6", padding: "1rem 2rem" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search events by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            flex: 1, minWidth: 200, padding: "9px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
            border: "1.5px solid #D4E8DA", borderRadius: 8, outline: "none", background: "#F6FAF7", color: "#1A3C2E",
          }}
        />

        <div style={{ display: "flex", gap: 6 }}>
          {["all", "upcoming", "past"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "8px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                border: "1.5px solid", borderColor: filter === f ? "#1A3C2E" : "#D4E8DA",
                borderRadius: 20, cursor: "pointer", background: filter === f ? "#1A3C2E" : "transparent",
                color: filter === f ? "#fff" : "#3B6D11", transition: "all 0.18s",
                textTransform: "capitalize",
              }}
            >
              {f === "all" ? "All Events" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            padding: "8px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 13,
            border: "1.5px solid #D4E8DA", borderRadius: 8, background: "#F6FAF7", color: "#1A3C2E", cursor: "pointer",
          }}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
}