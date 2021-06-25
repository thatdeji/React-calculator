import React from "react";
import "./toggle.css";
import { selectToggle, toggleClick } from "./toggleSlice";
import { useSelector, useDispatch } from "react-redux";

const Toggle = () => {
  const toggleState = useSelector(selectToggle);
  const dispatch = useDispatch();
  const handleToggleClick = () => {
    dispatch(toggleClick());
  };
  const toggleStateStyle = toggleState ? " is-toggled" : "";
  return (
    <div className="toggle-container">
      <div onClick={handleToggleClick} className="toggle">
        <div className="toggle__track">
          <div className={"toggle__mode toggle__mode--dark" + toggleStateStyle}>
            🌜
          </div>
          <div
            className={"toggle__mode toggle__mode--light" + toggleStateStyle}
          >
            🌞
          </div>
        </div>
        <div className={"toggle__thumb" + toggleStateStyle} />
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
