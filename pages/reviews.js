import { useEffect, useState } from "react"; 
import { useRouter } from "next/router";
import ReviewCard from "../components/ReviewCard";

export default function Reviews() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState({ minRating: 0, category: "all", search: "" });

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/reviews/hostaway");
      const data = await res.json();
      const approvals = JSON.parse(localStorage.getItem("approvals") || "{}");
      const items = data.result.map(r => ({ ...r, approved: Boolean(approvals[r.id]) }));
      setReviews(items);
    }
    load();
  }, []);

  function toggleApprove(id) {
    const approvals = JSON.parse(localStorage.getItem("approvals") || "{}");
    approvals[id] = !approvals[id];
    localStorage.setItem("approvals", JSON.stringify(approvals));
    setReviews(prev => prev.map(r => (r.id === id ? { ...r, approved: approvals[id] } : r)));
  }

  const filtered = reviews.filter(r => {
    if (filter.minRating > 0 && (r.rating == null || r.rating < filter.minRating)) return false;
    if (filter.category !== "all" && !r.categories?.some(c => c.category === filter.category)) return false;
    if (filter.search && !r.publicReview.toLowerCase().includes(filter.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "10px" }}>
      <h1>Flex Living - Reviews Dashboard</h1>

      {/* Button to go back to Properties */}
      <button
        onClick={() => router.push("/")}
        style={{
          margin: "10px 0",
          padding: "8px 12px",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Go to Property Dashboard
      </button>

      <div>
        {filtered.map(r => (
          <ReviewCard key={r.id} review={r} onToggleApprove={toggleApprove} />
        ))}
        {filtered.length === 0 && <div>No reviews match your filters.</div>}
      </div>
    </div>
  );
}
