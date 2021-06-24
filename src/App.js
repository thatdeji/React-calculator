import React from "react";
import Button from "./Button";
import { buttons } from "./data/buttons";

function App() {
  return (
    <div className="App">
      <div className="calculator">
        <div id="display" className="display">
          <div className="display__container">
            <div className="history">308 x 42</div>
            <div className="output">12,936</div>
          </div>
        </div>
        <div className="operators">
          {buttons.map(({ id, colorType, value }) => (
            <Button colorType={colorType} id={id} key={id}>
              {value}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
