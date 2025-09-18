import { useEffect, useState } from "react";
import Head from "next/head";
import PropertyCard from "../components/PropertyCard";
import Filters from "../components/Filters";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";


export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({ rating: "", category: "", channel: "", dateRange: "" });

  useEffect(() => {
    Promise.all([
      fetch("/data/properties.json").then((res) => res.json()),
      fetch("/data/hostaway-mock.json").then((res) => res.json())
    ]).then(([props, reviewsData]) => {
      const reviews = reviewsData.result;
      setProperties(
        props.map((p) => ({ ...p, reviews: reviews.filter((r) => r.listingId === p.id) }))
      );
    });
  }, []);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    return (sum / reviews.length).toFixed(2);
  };

  const countIssues = (reviews, category, threshold = 6) => {
    if (!reviews) return 0;
    return reviews.filter(
      (r) => r.reviewCategory?.some((c) => c.category === category && c.rating <= threshold)
    ).length;
  };

  const filteredProperties = properties.filter((p) => {
    const avgRating = calculateAverageRating(p.reviews);

    if (filters.rating && avgRating < filters.rating) return false;
    if (filters.category && !p.reviews?.some((r) => r.reviewCategory?.some((c) => c.category === filters.category))) return false;
    if (filters.channel && !p.channels.includes(filters.channel)) return false;
    if (filters.dateRange) {
      const [start, end] = filters.dateRange.split(" - ").map((d) => new Date(d));
      if (!p.reviews?.some((r) => { const reviewDate = new Date(r.submittedAt); return reviewDate >= start && reviewDate <= end; })) return false;
    }
    return true;
  });

  return (
    <>
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "10px" }}>
      <Head>
        <title>Flex Living – Dashboard</title>
        <link rel="icon" href="/images/flex_living_logo.jpg" />
      </Head>

      {/* HEADER */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px", borderBottom: "1px solid #eee", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/images/flex_living_logo.jpg" alt="Flex Living Logo" style={{ height: "50px", width: "50px", borderRadius: "8px" }} />
          <h2 style={{ margin: 0 }}>Flex Living</h2>
        </div>
        <nav style={{ display: "flex", gap: "20px" }}>
          <a href="/" style={{ textDecoration: "none", color: "#333" }}>Dashboard</a>
          <a href="/about" style={{ textDecoration: "none", color: "#333" }}>About Us</a>
          <a href="/contact" style={{ textDecoration: "none", color: "#333" }}>Contact Us</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <HeroBanner />

      <div style={{ textAlign: "center", marginBottom: "50px", marginTop: "50px" }}>
        <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>Our Top Properties</h1>
      </div>

      <Filters filters={filters} setFilters={setFilters} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {filteredProperties.length > 0 ? (
          filteredProperties.map((p) => (
            <PropertyCard key={p.id} property={p} calculateAverageRating={calculateAverageRating} countIssues={countIssues} />
          ))
        ) : (
          <div>Loading properties...</div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}
