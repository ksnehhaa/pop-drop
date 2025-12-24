import "../styles/home.css";
import { useEffect, useState } from "react";
import MapPicker from "../components/MapPicker";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Home = () => {
  const [message, setMessage] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(1000); // meters
  const [loading, setLoading] = useState(false);

  const [nearbyDrops, setNearbyDrops] = useState([]);
  const [feedLoading, setFeedLoading] = useState(false);

  /* ================= DROP MESSAGE ================= */
  const dropMessage = async () => {
    if (!message || !location) {
      alert("Message & location required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/drops`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          lat: location.lat,
          lng: location.lng,
          radius,
        }),
      });

      if (!res.ok) throw new Error("Drop failed");

      setMessage("");
      fetchNearbyDrops(); // refresh feed
      alert("💥 Message dropped successfully");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH NEARBY DROPS ================= */
  const fetchNearbyDrops = async () => {
    if (!location) return;

    try {
      setFeedLoading(true);

      const res = await fetch(
        `${API_BASE}/api/drops/nearby?lat=${location.lat}&lng=${location.lng}&radius=${radius}`
      );

      if (!res.ok) throw new Error("Feed load failed");

      const data = await res.json();
      setNearbyDrops(data);
    } catch (err) {
      console.error(err);
    } finally {
      setFeedLoading(false);
    }
  };

  /* AUTO LOAD FEED */
  useEffect(() => {
    fetchNearbyDrops();
  }, [location, radius]);

  return (
    <div className="home-root">
      {/* BACKGROUND */}
      <div className="gradient-bg">
        <span className="blob blob1"></span>
        <span className="blob blob2"></span>
        <span className="blob blob3"></span>
      </div>

      {/* CONTENT */}
      <div className="content">
        <h1 className="title">POP-DROP</h1>

        {/* DROP CARD */}
        <div className="card">
          <textarea
            placeholder="Type your anonymous message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="radius">
            <label>Delivery Radius: {radius / 1000} km</label>
            <input
              type="range"
              min="500"
              max="5000"
              step="500"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
            />
          </div>

          <button
            className="secondary-btn"
            onClick={() => setShowMap(true)}
          >
            {location ? "Location Selected 📍" : "Select receiver’s location"}
          </button>

          <button
            className="primary-btn"
            onClick={dropMessage}
            disabled={loading}
          >
            {loading ? "Dropping..." : "Drop my message"}
          </button>
        </div>

        {/* FEED */}
        {location && (
          <div className="feed">
            <h3 className="feed-title">📍 Nearby Messages</h3>

            {feedLoading && <p className="feed-text">Loading...</p>}

            {!feedLoading && nearbyDrops.length === 0 && (
              <p className="feed-text">No messages nearby</p>
            )}

            {nearbyDrops.map((drop) => (
              <div key={drop._id} className="drop-card">
                <p className="drop-message">{drop.message}</p>

                <div className="drop-footer">
                  <span>❤️ {drop.likes || 0}</span>
                  <span>
                    {new Date(drop.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MAP MODAL */}
      {showMap && (
        <MapPicker
          onClose={() => setShowMap(false)}
          onConfirm={(loc) => {
            setLocation(loc);
            setShowMap(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;
