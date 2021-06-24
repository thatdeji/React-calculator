import React from "react";
import "./Button.css";

const Button = ({ value, type, handleClick }) => {
  return (
    <button
      className={`button ${value === "=" ? "equal" : ""} ${value === "C"
        ? "cancel"
        : ""} ${type || ""}`}
      onClick={handleClick(value)}
    >
      {value}
    </button>
  );
};

export default Button;
