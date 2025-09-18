import Head from "next/head";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      {/* HEAD - Browser title */}
      <Head>
        <title>Contact Us – Flex Living</title>
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
          <a href="/about" style={{ textDecoration: "none", color: "#333" }}>
            About Us
          </a>
          <a
            href="/contact"
            style={{ textDecoration: "none", color: "#064e3b", fontWeight: "bold" }}
          >
            Contact Us
          </a>
        </nav>
      </header>

      {/* CONTACT SECTION */}
      <h1 style={{ marginBottom: "20px" }}>Contact Us</h1>
      <p style={{ marginBottom: "30px", color: "#555" }}>Please tell us a little about you</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "40px",
          alignItems: "start"
        }}
      >
        {/* Contact Form */}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <input type="text" placeholder="Name" style={inputStyle} />
          <input type="email" placeholder="Email" style={inputStyle} />
          <input type="text" placeholder="+49" style={inputStyle} />
          <textarea placeholder="Write something..." rows="4" style={inputStyle} />
          <input type="text" placeholder="Company name" style={inputStyle} />

          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#064e3b",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Send Message
          </button>
        </form>

        {/* Company Info */}
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            lineHeight: "1.8"
          }}
        >
          <h2>The Flex Living</h2>
          <p>
            <strong>Email:</strong> info@theflexliving.com
          </p>
          <p>
            <strong>Phone:</strong> +44 7723 745646
          </p>
          <p>
            <strong>Social:</strong> Coming soon 🚀
          </p>
        </div>
      </div>
    </div>
    <Footer/>

    </>

  );
}

// Input styles
const inputStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
  width: "100%",
  boxSizing: "border-box" 
};
