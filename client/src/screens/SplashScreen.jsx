const SplashScreen = ({ onStart }) => {
  return (
    <div className="splash">
      <img
        src="/src/assets/splash.png"
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