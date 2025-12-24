import { useEffect, useState } from "react";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 480
  );

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return isMobile;
}