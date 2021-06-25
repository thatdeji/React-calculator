import "./toggle.css";
import { useSelector, useDispatch } from "react-redux";

const Toggle = () => {
  return (
    <div className="toggle-container">
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
    </div>
  );
};

export default Toggle;
