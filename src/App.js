import React, { useEffect } from "react";
import Calculator from "./features/calculator/Calculator";
import Toggle from "./features/toggle/Toggle";
import { selectToggle } from "./features/toggle/toggleSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const toggleState = useSelector(selectToggle);

  useEffect(
    () => {
      if (!toggleState) {
        document
          .querySelector(":root")
          .style.setProperty("--calculator-bg", "#22252d");
        document
          .querySelector(":root")
          .style.setProperty("--operator-bg", "#2a2d37");
        document
          .querySelector(":root")
          .style.setProperty("--button-bg", "#282b33");
        document
          .querySelector(":root")
          .style.setProperty("--button-color-primary", "#fafafd");
        document
          .querySelector(":root")
          .style.setProperty("--app-bg", "#f5f3f3");
      } else {
        document
          .querySelector(":root")
          .style.setProperty("--calculator-bg", "#ffffff");
        document
          .querySelector(":root")
          .style.setProperty("--operator-bg", "#f9f9f9");
        document
          .querySelector(":root")
          .style.setProperty("--button-bg", "#f6f7f7");
        document
          .querySelector(":root")
          .style.setProperty("--button-color-primary", "#3a3b3f");
        document
          .querySelector(":root")
          .style.setProperty("--app-bg", "#414349");
      }
    },
    [toggleState]
  );
  return (
    <div className="App">
      <div className="calculator-container">
        <Toggle />
        <Calculator />
      </div>
    </div>
  );
}

export default App;
