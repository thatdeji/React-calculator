import React, { useEffect } from "react";
import Calculator from "./features/calculator/Calculator";
import Toggle from "./features/toggle/Toggle";
import { selectToggle } from "./features/toggle/toggleSlice";
import { useSelector } from "react-redux";
import { variablesLightMode, variablesDarkMode } from "./data/variables";
import { setRootVariables } from "./common/utils";

function App() {
  const toggleState = useSelector(selectToggle);

  useEffect(
    () => {
      if (!toggleState) {
        setRootVariables(variablesDarkMode);
      } else {
        setRootVariables(variablesLightMode);
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
