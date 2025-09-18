export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#064e3b",
        color: "#fff",
        padding: "30px 40px",
        marginTop: "100px", // space above footer
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
        fontFamily: "Arial, sans-serif", // modern font
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          src="/images/flex_living_logo.jpg"
          alt="Flex Living Logo"
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "8px",
            border: "2px solid #fff", // white border
            padding: "2px",
            backgroundColor: "#064e3b",
          }}
        />
        <span style={{ fontWeight: "700", fontSize: "1.2rem" }}>Flex Living</span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "25px", flexWrap: "wrap", fontWeight: "500", fontSize: "0.95rem" }}>
        <a href="/" style={{ color: "#fff", textDecoration: "none", transition: "0.3s", fontFamily:"Poppins, sans-serif" }}>
          Privacy Policy
        </a>
        <a href="/" style={{ color: "#fff", textDecoration: "none", transition: "0.3s", fontFamily:"Poppins, sans-serif" }}>
          Terms & Conditions
        </a>
      </div>

      {/* Contact Info */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontWeight: "500", fontSize: "0.95rem" }}>
        <span>+44 7723 745646</span>
        <span>info@theflexliving.com</span>
      </div>
    </footer>
  );
}
