import { createSlice } from "@reduxjs/toolkit";
import { calculateByOperator } from "../../utils";

const initialState = {
  history: "",
  output: "",
  operatorStatus: "init",
  result: {
    current: "",
    nextIndex: 0
  },
  zero: false,
  decimal: false
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    numberClick: (state, { payload }) => {
      const { output, zero, operatorStatus, result } = state;
      const newOutput =
        operatorStatus === "is-clicked-once" ||
        operatorStatus === "is-clicked-again"
          ? payload
          : output + payload;
      if (payload === "0" && zero === false)
        return {
          ...state,
          output: "0",
          operatorStatus: "is-not-clicked",
          zero: false
        };
      if (operatorStatus === "is-ready")
        return {
          ...state,
          output: output + payload,
          operatorStatus: "is-ready",
          zero: true,
          result: {
            ...state.result,
            current: output + payload,
            nextIndex: result.nextIndex + 1
          }
        };
      console.log("wahala");
      return {
        ...state,
        output: newOutput,
        operatorStatus: "is-not-clicked",
        zero: true
      };
    },
    operatorClickOnce: (state, { payload }) => {
      const { history, output } = state;
      return {
        ...state,
        history: history + output + payload,
        operatorStatus: "is-clicked-once",
        operationReady: true,
        decimal: false,
        output: "",
        zero: false
      };
    },
    operatorClickAgain: (state, { payload }) => {
      const { history } = state;
      return {
        ...state,
        history: history.substr(0, history.length - 1) + payload,
        operatorStatus: "is-clicked-again"
      };
    },
    resultEvaluate: (state, { payload }) => {
      const { history, result } = state;
      if (result.nextIndex === 0 && result.current === "") {
        return {
          ...state,
          result: {
            ...state.result,
            current: history.substr(0, history.length - 1),
            nextIndex: history.length - 1
          }
        };
      }
      return {
        ...state,
        result: {
          ...state.result,
          current: calculateByOperator([
            result.current,
            history[result.nextIndex],
            history.slice(result.nextIndex + 1, history.length - 1)
          ]),
          nextIndex: history.length - 1
        }
      };
    },
    resultDisplay: (state, { payload }) => ({
      ...state,
      history: "",
      output: payload,
      operatorStatus: "is-ready",
      result: {
        ...state.result,
        current: payload,
        nextIndex: String(payload).length
      }
    }),
    outputNegate: state => {
      const { output, result, operatorStatus } = state;
      const newCurrent =
        operatorStatus === "is-ready" ? -1 * result.current : result.current;
      return {
        ...state,
        output: -1 * output,
        result: { ...result, current: newCurrent }
      };
    },
    outputDecimal: state => {
      const { output, decimal } = state;
      if (!decimal) return { ...state, output: `${output}.`, decimal: true };
      return state;
    },
    calculatorReset: state => ({
      ...state,
      history: "",
      output: "",
      operatorStatus: "init",
      result: {
        current: "",
        nextIndex: 0
      },
      zero: false,
      decimal: false
    })
  }
});

export const selectOutput = state => state.calculator.output;
export const selectHistory = state => state.calculator.history;
export const selectOperatorStatus = state => state.calculator.operatorStatus;
export const selectResult = state => state.calculator.result;

export const {
  numberClick,
  operatorClickOnce,
  operatorClickAgain,
  resultEvaluate,
  resultDisplay,
  outputNegate,
  calculatorReset,
  outputDecimal
} = calculatorSlice.actions;

export const computeOperatorValues = (value, type) => (dispatch, getState) => {
  const operatorStatus = selectOperatorStatus(getState());
  if (operatorStatus === "init") {
    return;
  } else if (operatorStatus === "is-not-clicked") {
    dispatch(operatorClickOnce(value));
    dispatch(resultEvaluate());
  } else if (
    operatorStatus === "is-clicked-once" ||
    operatorStatus === "is-clicked-again"
  ) {
    dispatch(operatorClickAgain(value));
  } else if (operatorStatus === "is-ready") {
    dispatch(operatorClickOnce(value));
  }
};

export const computeEqual = (value, type) => (dispatch, getState) => {
  const result = selectResult(getState());
  const history = selectHistory(getState());
  if (operatorStatus === "is-not-clicked") {
    if (result.current === "") return;
    dispatch(
      resultDisplay(
        calculateByOperator([
          result.current,
          history[history.length - 1],
          output
        ])
      )
    );
  } else if (
    operatorStatus === "is-clicked-once" ||
    operatorStatus === "is-clicked-again"
  ) {
    dispatch(resultDisplay(result.current));
  }
};

export const computeValues = (value, type) => (dispatch, getState) => {
  const operatorStatus = selectOperatorStatus(getState());
  const result = selectResult(getState());
  const history = selectHistory(getState());
  const output = selectOutput(getState());
  switch (type) {
    case "number":
      dispatch(numberClick(value));
      break;
    case "operator":
      if (operatorStatus === "init") {
        return;
      } else if (operatorStatus === "is-not-clicked") {
        dispatch(operatorClickOnce(value));
        dispatch(resultEvaluate());
      } else if (
        operatorStatus === "is-clicked-once" ||
        operatorStatus === "is-clicked-again"
      ) {
        dispatch(operatorClickAgain(value));
      } else if (operatorStatus === "is-ready") {
        dispatch(operatorClickOnce(value));
      }
      break;
    case "equals":
      if (operatorStatus === "is-not-clicked") {
        if (result.current === "") return;
        dispatch(
          resultDisplay(
            calculateByOperator([
              result.current,
              history[history.length - 1],
              output
            ])
          )
        );
      } else if (
        operatorStatus === "is-clicked-once" ||
        operatorStatus === "is-clicked-again"
      ) {
        dispatch(resultDisplay(result.current));
      }
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
};

export default calculatorSlice.reducer;
