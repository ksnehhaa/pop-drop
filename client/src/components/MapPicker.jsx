import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* ================= FIX LEAFLET MARKER ================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ================= LOCATION MARKER ================= */
function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

/* ================= MAP PICKER ================= */
export default function MapPicker({ onClose, onConfirm }) {
  const [selected, setSelected] = useState(null);
  const [mapKey, setMapKey] = useState(0);
  const mapRef = useRef(null);

  useEffect(() => {
    // 🔥 Fix React 18 + Leaflet black screen bug
    setMapKey(Date.now());
  }, []);

  return (
    <div style={overlay}>
      <div style={wrapper}>
        <MapContainer
          key={mapKey}
          center={[28.6139, 77.209]}
          zoom={13}
          scrollWheelZoom
          whenCreated={(map) => {
            mapRef.current = map;
            setTimeout(() => map.invalidateSize(), 200);
          }}
          style={{ height: "100vh", width: "100vw" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
          />
          <LocationMarker onSelect={setSelected} />
        </MapContainer>

        <div style={hint}>Tap anywhere to drop pin</div>

        <button
          style={confirm}
          disabled={!selected}
          onClick={() => onConfirm(selected)}
        >
          Confirm location 📍
        </button>

        <button style={close} onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const overlay = {
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  background: "#000",
};

const wrapper = {
  position: "relative",
  height: "100vh",
  width: "100vw",
};

const hint = {
  position: "absolute",
  top: 16,
  left: "50%",
  transform: "translateX(-50%)",
  background: "rgba(0,0,0,0.7)",
  color: "#fff",
  padding: "8px 14px",
  borderRadius: 20,
  zIndex: 1000,
  fontSize: 13,
};

const confirm = {
  position: "absolute",
  bottom: 20,
  left: "50%",
  transform: "translateX(-50%)",
  padding: "14px 22px",
  borderRadius: 14,
  border: "none",
  background: "#000",
  color: "#fff",
  fontWeight: 600,
  zIndex: 1000,
  cursor: "pointer",
};

const close = {
  position: "absolute",
  top: 12,
  right: 12,
  background: "#000",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: 10,
  zIndex: 1000,
  cursor: "pointer",
};