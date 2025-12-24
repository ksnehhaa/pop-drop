import splash from "../assets/splash.png";

const SplashScreen = ({ onStart }) => {
  return (
    <div className="splash">
      <img
        src={splash}
        alt="POP-DROP"
        className="splash-image"
      />

      <button className="start-btn" onClick={onStart}>
        Start Now
      </button>
    </div>
  );
};

export default SplashScreen;