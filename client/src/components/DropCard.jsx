export default function DropCard({ drop }) {
  const like = async () => {
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/drops/${drop._id}/like`,
      {
        method: "POST",
      }
    );
  };

  return (
    <div style={card}>
      <p>{drop.message}</p>

      <div style={footer}>
        <span>{new Date(drop.createdAt).toLocaleTimeString()}</span>
        <button onClick={like}>❤️ {drop.likes}</button>
      </div>
    </div>
  );
}

const card = {
  background: "#111",
  borderRadius: 16,
  padding: 16,
  marginBottom: 12,
  boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
};

const footer = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 10,
  fontSize: 12,
  opacity: 0.7,
};  
