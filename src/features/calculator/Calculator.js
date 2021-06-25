import React from "react";
import Button from "../../common/components/Button";
import { buttons } from "../../data/buttons";
import {
  selectOutput,
  selectHistory,
  numberClick,
  negateClick,
  calculatorReset,
  decimalClick,
  backspaceClick,
  computeOperatorThunk,
  computeEqualThunk
} from "./calculatorSlice";
import { useSelector, useDispatch } from "react-redux";
import "./calculator.css";

function Calculator() {
  const dispatch = useDispatch();
  const output = useSelector(selectOutput);
  const history = useSelector(selectHistory);

  const handleClick = (value, type) => {
    switch (type) {
      case "number":
        dispatch(numberClick(value));
        break;
      case "operator":
        dispatch(computeOperatorThunk(value));
        break;
      case "equals":
        dispatch(computeEqualThunk());
        break;
      case "negate":
        dispatch(negateClick());
        break;
      case "clear":
        dispatch(calculatorReset());
        break;
      case "decimal":
        dispatch(decimalClick());
        break;
      case "backspace":
        dispatch(backspaceClick());
        break;
      default:
        return;
    }
  };
  const outputFontType =
    Number(output.length) >= 10 ? "output--md" : "output--lg";
  return (
    <div className="calculator">
      <div id="display" className="display">
        <div className="display__container">
          <div className="history">{history}</div>
          <div className={"output " + outputFontType}>
            {/*{Number(output).toLocaleString("en")}*/}
            {output}
          </div>
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
  );
}

export default Calculator;
