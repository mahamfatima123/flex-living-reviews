// components/Filters.js
export default function Filters({ filters, setFilters }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "20px" }}>
      <select onChange={(e) => setFilters({ ...filters, rating: e.target.value })} value={filters.rating} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}>
        <option value="">Filter by Rating</option>
        <option value="8">8+</option>
        <option value="7">7+</option>
        <option value="6">6+</option>
      </select>

      <select onChange={(e) => setFilters({ ...filters, category: e.target.value })} value={filters.category} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}>
        <option value="">Filter by Category</option>
        <option value="cleanliness">Cleanliness</option>
        <option value="communication">Communication</option>
        <option value="respect_house_rules">House Rules</option>
      </select>

      <select onChange={(e) => setFilters({ ...filters, channel: e.target.value })} value={filters.channel} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}>
        <option value="">Filter by Channel</option>
        <option value="Hostaway">Hostaway</option>
        <option value="Google">Google</option>
        <option value="Airbnb">Airbnb</option>
      </select>

      <input type="text" placeholder="2025-08-01 - 2025-08-31" onBlur={(e) => setFilters({ ...filters, dateRange: e.target.value })} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }} />
    </div>
  );
}
