import React from "react";
import Button from "./Button";
import { buttons } from "./data/buttons";
import {
  selectOutput,
  selectHistory,
  numberClick,
  outputNegate,
  calculatorReset,
  outputDecimal,
  computeOperatorValue,
  computeEqual
} from "./features/calculator/calculatorSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const output = useSelector(selectOutput);
  const history = useSelector(selectHistory);

  const handleClick = (value, type) => {
    switch (type) {
      case "number":
        dispatch(numberClick(value));
        break;
      case "operator":
        dispatch(computeOperatorValue(value));
        break;
      case "equals":
        dispatch(computeEqual());
        break;
      case "negate":
        dispatch(outputNegate());
        break;
      case "clear":
        dispatch(calculatorReset());
        break;
      case "decimal":
        dispatch(outputDecimal());
        break;
      default:
        return;
    }
    // dispatch(computeValues(value, type));
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
