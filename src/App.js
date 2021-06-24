import React from "react";
import Button from "./Button";
import { buttons } from "./data/buttons";
import {
  selectOutput,
  numberClick
} from "./features/calculator/calculatorSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const output = useSelector(selectOutput);

  const handleClick = value => {
    dispatch(numberClick(value));
  };
  return (
    <div className="App">
      <div className="calculator">
        <div id="display" className="display">
          <div className="display__container">
            <div className="history">308 x 42</div>
            <div className="output">{output}</div>
          </div>
        </div>
        <div className="operators">
          {buttons.map(({ id, colorType, value }) => (
            <Button
              onClick={handleClick}
              colorType={colorType}
              id={id}
              key={id}
            >
              {value}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
