import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer
} from "recharts";
import Footer from "../../components/Footer";

export default function PropertyDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [propertyReviews, setPropertyReviews] = useState([]);
  const [approvals, setApprovals] = useState({});
  const [search, setSearch] = useState("");
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function load() {
      const propsRes = await fetch("/data/properties.json");
      const propsData = await propsRes.json();
      const p = propsData.find(pr => pr.id === Number(id));
      setProperty(p);

      const res = await fetch("/api/reviews/hostaway");
      const data = await res.json();
      const filtered = data.result.filter(r => r.listingId === Number(id));
      const saved = JSON.parse(localStorage.getItem("approvals") || "{}");
      setApprovals(saved);
      setPropertyReviews(filtered.map(r => ({ ...r, approved: Boolean(saved[r.id]) })));
    }

    load();
  }, [id]);

  const toggleApprove = (reviewId) => {
    const updated = { ...approvals, [reviewId]: !approvals[reviewId] };
    localStorage.setItem("approvals", JSON.stringify(updated));
    setApprovals(updated);
    setPropertyReviews(prev => prev.map(r => r.id === reviewId ? { ...r, approved: !r.approved } : r));
  };

  const avgRating = propertyReviews.length
    ? (propertyReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / propertyReviews.length).toFixed(1)
    : 0;

  const categoryDistribution = {};
  propertyReviews.forEach(r => {
    r.categories.forEach(c => {
      if (!categoryDistribution[c.category]) categoryDistribution[c.category] = [];
      categoryDistribution[c.category].push(c.rating);
    });
  });

  const categoryData = Object.entries(categoryDistribution).map(([cat, ratings]) => ({
    category: cat,
    avgRating: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
  }));

  const trendData = propertyReviews
    .map(r => ({ date: r.submittedAt?.slice(0, 10), rating: r.rating }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const filteredReviews = propertyReviews.filter(r =>
    r.guestName.toLowerCase().includes(search.toLowerCase()) ||
    r.publicReview.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "10px" }}>
      <Head>
        <title>{property?.listingName || `Property ${id}`} – Flex Living</title>
        <link rel="icon" href="/images/flex_living_logo.jpg" />
      </Head>

      {/* HEADER */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 20px",
          borderBottom: "1px solid #eee",
          marginBottom: "20px"
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="/images/flex_living_logo.jpg"
            alt="Flex Living Logo"
            style={{ height: "50px", width: "50px", borderRadius: "8px" }}
          />
          <h2 style={{ margin: 0 }}>Flex Living</h2>
        </div>

        {/* Nav Links */}
        <nav style={{ display: "flex", gap: "20px" }}>
          <a href="/" style={{ textDecoration: "none", color: "#333" }}>
            Dashboard
          </a>
          <a href="/about" style={{ textDecoration: "none", color: "#064e3b", fontWeight: "bold" }}>
            About Us
          </a>
          <a href="/contact" style={{ textDecoration: "none", color: "#333" }}>
            Contact Us
          </a>
        </nav>
      </header>

      {/* Property Title */}
      <h1>{property?.listingName || `${id} – Property Detail`}</h1>
      <p>Average Rating: {avgRating} ⭐</p>

      {/* Property Images */}
        <div
        style={{
            display: "grid",
            gridTemplateColumns: "1.35fr 1fr",
            gap: "16px",
            marginBottom: "20px",
            alignItems: "stretch",
            minHeight: "480px",
            maxHeight: "500px"
        }}
        >
        <div
            style={{
            width: "100%",
            minHeight: "480px",
            maxHeight: "500px",
            borderRadius: "22px",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
            }}
        >
            {property?.images[0] && (
            <img
                src={property.images[0]}
                alt={`${property.listingName} main`}
                style={{
                width: "100%",
                height: "100%",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: "22px",
                display: "block"
                }}
            />
            )}
        </div>
        <div
            style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "12px",
            minHeight: "480px",
            maxHeight: "240px",
            borderRadius: "18px",
            overflow: "hidden"
            }}
        >
            {[1, 2, 3, 4].map((idx) =>
            property?.images[idx] ? (
                <img
                key={idx}
                src={property.images[idx]}
                alt={`${property.listingName} small ${idx}`}
                style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "240px",
                    objectFit: "cover",
                    borderRadius: "18px"
                }}
                />
            ) : null
            )}
        </div>
        </div>


      {/* Charts */}
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", marginBottom: "20px" }}>
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3>Category Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="avgRating" fill="#064e3b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3>Rating Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rating" stroke="#4f46e5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reviews Table */}
      <div style={{ marginTop: "20px" }}>
        <h3>Reviews</h3>
        <input type="text" placeholder="Search by guest or text..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "10px", width: "100%" }} />
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Guest</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rating</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Categories</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Channel</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Approve</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map(r => (
              <tr key={r.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{r.guestName}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{r.submittedAt?.slice(0, 10)}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{r.rating}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{r.categories.map(c => `${c.category}: ${c.rating}`).join(", ")}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{r.channel}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{r.status}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}><input type="checkbox" checked={r.approved} onChange={() => toggleApprove(r.id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredReviews.length === 0 && <p>No reviews found.</p>}
      </div>

      {/* Actions */}
      <div style={{ marginTop: "20px" }}>
        <button style={{ marginRight: "10px", padding: "8px 14px", backgroundColor: "#064e3b", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
          onClick={() => {
            const updated = { ...approvals };
            filteredReviews.forEach(r => { updated[r.id] = true; });
            localStorage.setItem("approvals", JSON.stringify(updated));
            setApprovals(updated);
            setPropertyReviews(prev => prev.map(r => ({ ...r, approved: true })));
          }}>Bulk Approve</button>

        <button style={{ padding: "8px 14px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
          onClick={() => {
            const updated = { ...approvals };
            filteredReviews.forEach(r => { updated[r.id] = false; });
            localStorage.setItem("approvals", JSON.stringify(updated));
            setApprovals(updated);
            setPropertyReviews(prev => prev.map(r => ({ ...r, approved: false })));
          }}>Bulk Reject</button>

        <button style={{ marginLeft: "10px", padding: "8px 14px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
          onClick={() => router.push(`/property/${id}/public`)}>View Public Page</button>
      </div>
    </div>
    <Footer/>
    </>
  );
}
