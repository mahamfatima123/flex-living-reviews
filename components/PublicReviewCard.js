export default function PublicReviewCard({ review }) {
  return (
    <div
      style={{
        minWidth: "300px",
        maxWidth: "320px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        border: "1px solid #ddd",
        padding: "24px",
        margin: "10px",
        textAlign: "center",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          backgroundColor: "#006400", // dark green
          margin: "0 auto 16px auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        {/* White SVG person icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="32"
          height="32"
        >
          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
        </svg>
      </div>

      {/* Review */}
      <p
        style={{
          fontSize: "0.95rem",
          lineHeight: "1.6",
          color: "#333",
          fontStyle: "italic",
          marginBottom: "16px",
        }}
      >
        “
        {review.publicReview.length > 180
          ? review.publicReview.slice(0, 180) + "..."
          : review.publicReview}
        ”
      </p>

      {/* Name + Rating */}
      <h4
        style={{
          fontSize: "1.05rem",
          fontWeight: "700",
          marginBottom: "6px",
          color: "#111",
        }}
      >
        {review.guestName || "Anonymous"}
      </h4>
      <p style={{ color: "#e6b800", fontSize: "0.9rem" }}>
        {"⭐".repeat(Math.round(review.rating))}
      </p>
    </div>
  );
}
