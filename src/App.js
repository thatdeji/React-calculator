import React from "react";
import Calculator from "./features/calculator/Calculator";
import Toggle from "./features/toggle/Toggle";

function App() {
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
