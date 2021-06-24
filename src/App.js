import React from "react";
import Button from "./Button";
import { buttons } from "./data/buttons";
import {
  selectOutput,
  selectHistory,
  computeValues
} from "./features/calculator/calculatorSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const output = useSelector(selectOutput);
  const history = useSelector(selectHistory);

  const handleClick = (value, type) => {
    dispatch(computeValues(value, type));
  };
  return (
    <div className="App">
      <div className="calculator">
        <div id="display" className="display">
          <div className="display__container">
            <div className="history">{history}</div>
            <div className="output">{output}</div>
          </div>
        </div>
        <div className="operators">
          {buttons.map(({ id, colorType, value, type }) => (
            <Button
              onClick={handleClick}
              colorType={colorType}
              id={id}
              key={id}
              type={type}
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
