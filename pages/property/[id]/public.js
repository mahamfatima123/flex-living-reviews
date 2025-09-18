import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import PublicReviewCard from "../../../components/PublicReviewCard";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Footer from "../../../components/Footer";



export default function PublicPropertyPage() {
  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [guests, setGuests] = useState(1);

  const [selectionRange, setSelectionRange] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });

  const [nights, setNights] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!id) return;

    async function loadProperty() {
      const res = await fetch("/data/properties.json");
      const data = await res.json();
      const p = data.find((pr) => pr.id === Number(id));
      setProperty(p);
    }

    async function loadReviews() {
      const res = await fetch("/api/reviews/hostaway");
      const data = await res.json();
      const savedApprovals = JSON.parse(localStorage.getItem("approvals") || "{}");
      const approvedReviews = data.result.filter(
        (r) => r.listingId === Number(id) && savedApprovals[r.id]
      );
      setReviews(approvedReviews);
      const ratingAvg = approvedReviews.length
        ? (
            approvedReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
            approvedReviews.length
          ).toFixed(2)
        : 0;
      setAvgRating(ratingAvg);
    }

    loadProperty();
    loadReviews();
  }, [id]);

  const handleSelect = (ranges) => {
    const start = ranges.selection.startDate;
    const end = ranges.selection.endDate;
    if (start && end) {
      setSelectionRange(ranges.selection);
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setNights(diff + 1);
    }
  };

  useEffect(() => {
    if (!property || nights === 0) return;
    const sub = property.pricePerNight * nights;
    const disc = nights >= 7 ? Math.round(sub * (property.weeklyDiscountPercent || 0) / 100) : 0;
    const t = sub - disc + (property.cleaningFee || 0);
    setSubtotal(sub);
    setDiscount(disc);
    setTotal(t);
  }, [nights, property]);

  if (!property) return <p>Loading...</p>;

  const guestsText = property.features[0];
  const bedrooms = property.features[1];
  const baths = property.features[2];
  const amenities = property.features.slice(3);
  const aboutPreview = property.about?.split("\n\n").slice(0, 2).join("\n\n");

  return (
    <>
      {/* Head for title and favicon */}
      <Head>
        <title>{property.listingName} – Flex Living</title>
        <link rel="icon" href="/images/flex_living_logo.jpg" />
      </Head>

      {/* Navbar */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px", borderBottom: "1px solid #eee", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/images/flex_living_logo.jpg" alt="Flex Living Logo" style={{ height: "50px", width: "50px", borderRadius: "8px" }} />
          <h2 style={{ margin: 0 }}>Flex Living</h2>
        </div>
        <nav style={{ display: "flex", gap: "20px" }}>
          <a href="/about" style={{ textDecoration: "none", color: "#333" }}>About Us</a>
          <a href="/contact" style={{ textDecoration: "none", color: "#333" }}>Contact Us</a>
        </nav>
      </header>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
        {/* Hero Images */}
        <div style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: "16px", marginBottom: "40px", alignItems: "stretch", minHeight: "480px", maxHeight: "500px" }}>
          <div style={{ width: "100%", minHeight: "480px", maxHeight: "500px", borderRadius: "22px", overflow: "hidden", position: "relative", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            {property.images[0] && <img src={property.images[0]} alt={`${property.listingName} main`} style={{ width: "100%", height: "100%", maxHeight: "500px", objectFit: "cover", borderRadius: "22px", display: "block" }} />}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "12px", minHeight: "480px", maxHeight: "240px", borderRadius: "18px", overflow: "hidden" }}>
            {[1, 2, 3, 4].map((idx) => property.images[idx] ? (
              <img key={idx} src={property.images[idx]} alt={`${property.listingName} small ${idx}`} style={{ width: "100%", height: "100%", maxHeight: "240px", objectFit: "cover", borderRadius: "18px" }} />
            ) : null)}
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
          {/* Left Column */}
          <div>
            {/* Header */}
            <div style={{ marginBottom: "25px" }}>
              <h1 style={{ fontSize: "2.2rem", fontWeight: "700", marginBottom: "5px" }}>{property.listingName}</h1>
              <p style={{ color: "#555", marginBottom: "5px" }}>{guestsText} · {bedrooms} · {baths}</p>
              <p style={{ fontWeight: "600", color: "#111" }}>⭐ {avgRating} · {reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
            </div>

            {/* About */}
            {property.about && (
              <div style={{ marginBottom: "40px", lineHeight: "1.6", color: "#333" }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "15px" }}>About this property</h2>
                <p style={{ marginBottom: "15px" }}>
                  {showFullAbout
                    ? property.about.split("\n\n").map((para, idx) => <span key={idx}>{para}<br /><br /></span>)
                    : aboutPreview}
                </p>
                {property.about.split("\n\n").length > 2 && (
                  <button onClick={() => setShowFullAbout(!showFullAbout)} style={{ backgroundColor: "#006400", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer", fontWeight: "600" }}>
                    {showFullAbout ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            )}

            <hr style={{ border: "1px solid #eee", margin: "25px 0" }} />

            {/* Amenities */}
            {amenities.length > 0 && (
              <div style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "10px" }}>Amenities</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {amenities.map((a, idx) => (
                    <span key={idx} style={{ backgroundColor: "#f0f0f0", padding: "6px 12px", borderRadius: "20px", fontSize: "0.9rem", color: "#333", display: "flex", alignItems: "center", gap: "6px" }}>{a}</span>
                  ))}
                </div>
              </div>
            )}

            <hr style={{ border: "1px solid #eee", margin: "25px 0" }} />

            {/* Calendar */}
            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "15px" }}>Select Dates</h2>
              <DateRange
                ranges={[{ ...selectionRange, color: "#006400" }]}
                minDate={new Date()}
                onChange={handleSelect}
                disabledDates={property.availability
                    .filter(d => !d.available)
                    .map(d => new Date(d.date))}
                months={2}           
                direction="horizontal" 
                scroll={{ enabled: false }} 
                />
            </div>

            <hr style={{ border: "1px solid #eee", margin: "25px 0" }} />

            {/* Reviews */}
            <div style={{ marginBottom: "50px" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "30px", color: "#006400", textAlign: "center" }}>What Our Clients Say</h2>
              {reviews.length === 0 && <p style={{ textAlign: "center", color: "#555" }}>No approved reviews yet.</p>}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", justifyItems: "center" }}>
                {reviews.map(r => <PublicReviewCard key={r.id} review={r} />)}
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Booking Card */}
          <div style={{ position: "sticky", top: "20px", alignSelf: "start" }}>
            <div style={{ backgroundColor: "#fff", borderRadius: "16px", boxShadow: "0 8px 20px rgba(0,0,0,0.15)", padding: "24px", display: "flex", flexDirection: "column", gap: "16px", maxHeight: "calc(100vh - 40px)", overflowY: "auto", fontFamily:"Arial, sans-serif" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", textAlign: "center" }}>Book Your Stay</h3>

              {/* Guests */}
              <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>Guests:
                <input type="number" min="1" value={guests} onChange={(e) => setGuests(Number(e.target.value))} style={{ width: "90%", padding: "8px 12px", marginTop: "4px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "0.95rem" }} />
              </label>

              {/* Booking Summary */}
              {selectionRange.startDate && selectionRange.endDate ? (
                nights >= 5 ? (
                  <div style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}> <span>£{property.pricePerNight} x {nights} night{nights>1?"s":""}</span> <span>£{subtotal}</span> </div>
                    {discount > 0 && <div style={{ display: "flex", justifyContent: "space-between", color:"#006400" }}> <span>Weekly discount</span> <span>-£{discount}</span> </div>}
                    {property.cleaningFee && <div style={{ display: "flex", justifyContent: "space-between" }}> <span>Cleaning fee</span> <span>£{property.cleaningFee}</span> </div>}
                    <hr style={{ borderTop: "1px solid #eee", margin: "8px 0" }}/>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight:"700", fontSize:"1.1rem" }}> <span>Total</span> <span>£{total}</span> </div>
                    {property.deposit && <div style={{ display: "flex", justifyContent: "space-between", color:"#555" }}> <span>Refundable damage deposit</span> <span>£{property.deposit}</span> </div>}
                  </div>
                ) : (
                  <p style={{ color: "red" }}>Minimum stay is 5 nights</p>
                )
              ) : <p>Select your dates to see price</p>}

              {/* Buttons */}
              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button style={{ flex:1, backgroundColor:"#006400", color:"#fff", padding:"10px 16px", borderRadius:"8px", border:"none", fontWeight:"600", cursor:"pointer" }}>Book Now</button>
                <button style={{ flex:1, backgroundColor:"#006400", color:"#fff", padding:"10px 16px", borderRadius:"8px", border:"none", fontWeight:"600", cursor:"pointer" }}>Send Inquiry</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
