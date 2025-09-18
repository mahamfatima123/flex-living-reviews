import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

export default function About() {
  const router = useRouter();

  return (
    <>
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      {/* HEAD - Browser title */}
      <Head>
        <title>About Us – Flex Living</title>
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

      {/* HERO IMAGE */}
      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        <img
          src="/images/appartmentdesign.jpg"
          alt="Luxury Apartment"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* CONTENT */}
      <div style={{ lineHeight: "1.8", color: "#333" }}>
        <p>
          Whether you’re moving home or relocating for work, our property management team provides
          fully-furnished and uniquely tailored apartments for all your renting needs. So relax while we
          handle the entire customer journey. Welcome to a flexible lifestyle, welcome to Flex Living.
        </p>

        <h2 style={{ marginTop: "30px" }}>Our Story</h2>
        <p>
          <em>
            "It all started with a coffee on a cobbled street overlooking London’s Tower Bridge..."
          </em>
        </p>

        <p>
          Our founders connected over a shared vision inspired by the possibility of living and working
          without constraints. Seeing their colleagues constantly move around for work, they recognised
          an inherent struggle for those who regularly relocate yet never quite feel at home.
        </p>

        <p>
          The difficulty many tenants face when moving to the UK and the inefficient state of the property
          management industry illuminated a dire need for change.
        </p>

        <p>
          And so, the Flex Living dream was born as a two-fold mission. First, to eliminate the barriers
          associated with finding rental properties, and second, to improve the landlord experience with
          expert maintenance and fair pricing.
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
}
