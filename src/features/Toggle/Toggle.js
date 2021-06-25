import "./toggle.css";

const Toggle = () => {
  return (
    <div className="toggle">
      <div className="toggle__track">
        <div className="toggle__mode toggle__mode--dark">🌜</div>
        <div className="toggle__mode toggle__mode--light">🌞</div>
      </div>
      <div className="toggle__thumb" />
      <input
        type="checkbox"
        className="toggle__screen-readers"
        aria-label="Toggle between light and dark mode"
      />
    </div>
  );
};

export default Toggle;
