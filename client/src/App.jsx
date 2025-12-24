import { useState } from "react";
import SplashScreen from "./screens/SplashScreen";
import Home from "./screens/Home";
import useIsMobile from "./hooks/useIsMobile";

function App() {
  const isMobile = useIsMobile();
  const [started, setStarted] = useState(false);

  if (!isMobile) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center"
      }}>
        <p>POP-DROP is built for phones 📱</p>
      </div>
    );
  }

  return (
    <>
      {!started ? (
        <SplashScreen onStart={() => setStarted(true)} />
      ) : (
        <Home />
      )}
    </>
  );
}

export default App;