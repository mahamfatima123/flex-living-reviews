// components/HeroBanner.js
export default function HeroBanner() {
  return (
    <div
      style={{
        backgroundImage: `url("/images/appartmentdesign.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "80px 20px",
        borderRadius: "12px",
        color: "white",
        textAlign: "center",
        marginBottom: "50px",
        position: "relative",
      }}
    >
      {/* Dark overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "12px",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto" }}>
        {/* Hero Text */}
        <h1 style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "20px" }}>
          Flex Living - Made Easy
        </h1>
        <p style={{ fontSize: "18px", marginBottom: "40px", lineHeight: "1.6" }}>
          Furnished Apartments designed with you in Mind. All you have to do is unpack your bags and start living. We're flexible, so you can move-in and move-out on the dates you need.
        </p>

        {/* Horizontal Search Form */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Location"
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", flex: "1 1 150px" }}
          />
          <input
            type="date"
            placeholder="Check-in"
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", flex: "1 1 120px" }}
          />
          <input
            type="date"
            placeholder="Check-out"
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", flex: "1 1 120px" }}
          />
          <input
            type="number"
            min="1"
            placeholder="Guests"
            defaultValue={1}
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", flex: "1 1 80px" }}
          />
          <button
            style={{
              backgroundColor: "#064e3b",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              padding: "10px 20px",
              flex: "0 0 auto",
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
