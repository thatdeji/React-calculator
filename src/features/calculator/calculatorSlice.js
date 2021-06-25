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
      const { history } = state;
      return {
        ...state,
        result: {
          ...state.result,
          current: payload,
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

export const selectCalculator = state => state.calculator;
export const selectOutput = state => state.calculator.output;
export const selectHistory = state => state.calculator.history;

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

//Thunks

export const computeOperatorThunk = value => (dispatch, getState) => {
  const { operatorStatus, result: { current, nextIndex } } = selectCalculator(
    getState()
  );
  if (operatorStatus === "init") {
    return;
  } else if (operatorStatus === "is-not-clicked") {
    dispatch(operatorClickOnce(value));
    const history = selectHistory(getState());
    const resultEval =
      !nextIndex && !current
        ? history.substr(0, history.length - 1)
        : calculateByOperator([
            current,
            history[nextIndex],
            history.slice(nextIndex + 1, history.length - 1)
          ]);
    dispatch(resultEvaluate(resultEval));
  } else if (
    operatorStatus === "is-clicked-once" ||
    operatorStatus === "is-clicked-again"
  ) {
    dispatch(operatorClickAgain(value));
  } else if (operatorStatus === "is-ready") {
    dispatch(operatorClickOnce(value));
  }
};

export const computeEqualThunk = () => (dispatch, getState) => {
  const {
    operatorStatus,
    output,
    result: { current },
    history
  } = selectCalculator(getState());
  if (operatorStatus === "is-not-clicked") {
    if (!current) return;
    dispatch(
      resultDisplay(
        calculateByOperator([current, history[history.length - 1], output])
      )
    );
  } else if (
    operatorStatus === "is-clicked-once" ||
    operatorStatus === "is-clicked-again"
  ) {
    dispatch(resultDisplay(current));
  }
};

export default calculatorSlice.reducer;
