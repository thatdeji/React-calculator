import { createSlice } from "@reduxjs/toolkit";
import { calculateByOperator } from "../../common/utils";

const initialState = {
  history: "",
  output: "",
  operatorStatus: "init",
  result: {
    current: "",
    nextIndex: 0
  },
  zero: false
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
      //case to avoid starting operation with more than one zero
      if (payload === "0" && zero === false)
        return {
          ...state,
          output: "0",
          operatorStatus: "is-not-clicked",
          zero: false
        };
      //concantenates output to result when result has been calculated
      if (operatorStatus === "is-equals-clicked")
        return {
          ...state,
          output: output + payload,
          operatorStatus: "is-equals-clicked",
          zero: true,
          result: {
            ...state.result,
            current: output + payload,
            nextIndex: result.nextIndex + 1
          }
        };
      //default display
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
      operatorStatus: "is-equals-clicked",
      result: {
        ...state.result,
        current: payload,
        nextIndex: String(payload).length
      }
    }),
    negateClick: state => {
      const { output, result: { current }, operatorStatus } = state;
      //is result calculated? multiply current result by -1 else return current result
      const newCurrent = operatorStatus === "is-equals-clicked" ? -1 * current : current;
      return {
        ...state,
        output: -1 * output,
        result: { ...state.result, current: newCurrent }
      };
    },
    decimalClick: state => {
      const { output } = state;
      //adds decimal if decimal is not in the output
      if (String(output).indexOf(".") === -1)
        return { ...state, output: `${output}.` };
      //adds nothing when decimal has been added to the output
      return state;
    },
    backspaceClick: state => {
      const { output } = state;
      const newOutput = String(output);
      //takes the output excluding it's new output as the new one
      return {
        ...state,
        output: newOutput.substr(0, newOutput.length - 1)
      };
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
      zero: false
    })
  }
});
//selectors
export const selectCalculator = state => state.calculator;
export const selectOutput = state => state.calculator.output;
export const selectHistory = state => state.calculator.history;
//actiions
export const {
  numberClick,
  operatorClickOnce,
  operatorClickAgain,
  resultEvaluate,
  resultDisplay,
  negateClick,
  calculatorReset,
  decimalClick,
  backspaceClick
} = calculatorSlice.actions;

//Redux synchronous Thunks
export const computeOperatorThunk = value => (dispatch, getState) => {
  const { operatorStatus, result: { current, nextIndex } } = selectCalculator(
    getState()
  );
  //return at initial state or when state is reset
  if (operatorStatus === "init") {
    return;
  } else if (operatorStatus === "is-not-clicked") {
    //when operator has not been clicked show operator & calculate the previous inputs
    dispatch(operatorClickOnce(value));
    //get recent history state
    const history = selectHistory(getState());
    //calcualtes result based on the previous inputs
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
    //update previous operator when clicked once and above
    dispatch(operatorClickAgain(value));
  } else if (operatorStatus === "is-equals-clicked") {
    //when total result is calcuated show operator once
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
  //when  operator has not been clicked calculate result
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
    //when  operator has been clicked once and above show recent result
    dispatch(resultDisplay(current));
  }
};

export default calculatorSlice.reducer;
