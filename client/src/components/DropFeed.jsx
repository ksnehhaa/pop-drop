import { useEffect, useState } from "react";
import DropCard from "./DropCard";

export default function DropFeed({ location }) {
  const [drops, setDrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDrops = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/drops/nearby?lat=${location.lat}&lng=${location.lng}&radius=1500`
        );
        const data = await res.json();
        setDrops(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadDrops();
  }, [location]);

  if (loading) return <p style={center}>Loading drops…</p>;

  if (!drops.length)
    return <p style={center}>No messages nearby 😶</p>;

  return (
    <div style={{ padding: 16 }}>
      {drops.map((drop) => (
        <DropCard key={drop._id} drop={drop} />
      ))}
    </div>
  );
}

const center = {
  textAlign: "center",
  marginTop: 40,
  opacity: 0.6,
};