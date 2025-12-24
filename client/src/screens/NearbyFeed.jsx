import { useEffect, useState } from "react";
import DropFeed from "../components/DropFeed";

export default function NearbyFeed({ location, onBack }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location) setLoading(false);
  }, [location]);

  return (
    <div style={styles.root}>
      {/* HEADER */}
      <div style={styles.header}>
        <button onClick={onBack} style={styles.back}>←</button>
        <h3 style={styles.title}>Nearby Drops</h3>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p style={styles.text}>Finding messages near you…</p>
      ) : (
        <DropFeed location={location} />
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  root: {
    height: "100vh",
    background: "#000",
    color: "#fff",
    paddingTop: 10,
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "0 16px 12px",
    borderBottom: "1px solid #222",
  },
  title: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
  },
  back: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: 20,
    cursor: "pointer",
  },
  text: {
    textAlign: "center",
    marginTop: 40,
    opacity: 0.7,
  },
};