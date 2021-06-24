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
  negate: false
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    numberClick: (state, { payload }) => {
      const { output, operatorStatus } = state;
      const newOutput =
        operatorStatus === "is-clicked-once" ||
        operatorStatus === "is-clicked-again"
          ? payload
          : output + payload;
      return {
        ...state,
        output: newOutput,
        operatorStatus: "is-not-clicked"
      };
    },
    operatorClickOnce: (state, { payload }) => {
      const { history, output } = state;
      return {
        ...state,
        history: history + output + payload,
        operatorStatus: "is-clicked-once",
        operationReady: true
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
      if (result.nextIndex === 0) {
        return {
          ...state,
          result: {
            ...state.result,
            current: history.substr(0, history.length - 1),
            nextIndex: history.length - 1
          }
        };
      }
      console.log(history.slice(result.nextIndex + 1, history.length));
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
      output: payload,
      result: { ...state.result, current: payload }
    }),
    negateOutput: state => {
      return { ...state, output: `-${state.output}` };
    }
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
  negateOutput
} = calculatorSlice.actions;

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
      }
      break;
    case "equals":
      if (operatorStatus === "is-not-clicked") {
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
      dispatch(negateOutput());
      break;
    default:
      return;
  }
};

export default calculatorSlice.reducer;
