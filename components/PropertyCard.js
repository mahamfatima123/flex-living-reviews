// components/PropertyCard.js
import { useRouter } from "next/router";

export default function PropertyCard({ property, calculateAverageRating, countIssues }) {
  const router = useRouter();
  const avg = calculateAverageRating(property.reviews);
  const issues = countIssues(property.reviews, "cleanliness");

  return (
    <div
      onClick={() => router.push(`/property/${property.id}`)}
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        backgroundColor: "white",
        cursor: "pointer",
        transition: "transform 0.2s",
        position: "relative",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={property.image}
          alt={property.listingName}
          style={{ width: "100%", height: "220px", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "#064e3b",
            color: "white",
            padding: "5px 10px",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          {avg} ★
        </div>
      </div>

      <div style={{ padding: "15px" }}>
        <h3 style={{ margin: "0 0 10px", fontSize: "18px" }}>{property.listingName}</h3>

        {property.features && (
          <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
            {property.features.join(" · ")}
          </p>
        )}

        <p style={{ margin: "4px 0", fontWeight: 500 }}>
          <strong>Reviews:</strong> {property.reviews.length}
        </p>
        <p style={{ margin: "4px 0", fontWeight: 500 }}>
          <strong>Channels:</strong> {property.channels.join(", ")}
        </p>
        <p
          style={{
            margin: "4px 0",
            color: issues > 0 ? "red" : "green",
            fontWeight: 500,
          }}
        >
          {issues > 0
            ? `${issues} low cleanliness reviews last month`
            : "No major issues"}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/property/${property.id}`);
          }}
          style={{
            marginTop: "10px",
            padding: "8px 14px",
            backgroundColor: "#064e3b",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          View Reviews
        </button>
      </div>
    </div>
  );
}
