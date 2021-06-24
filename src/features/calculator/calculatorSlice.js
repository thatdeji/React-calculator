import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: " ",
  output: "",
  operatorStatus: "init"
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
          : state.output + payload;
      return {
        ...state,
        output: newOutput,
        operatorStatus: "is-not-clicked"
      };
    },
    operatorClickOnce: (state, { payload }) => {
      const { history, output } = state;
      // const newHistory = typeof history && '';
      // history: `${isNaN(history[history.length - 1])
      //   ? history.substr(0, history.length - 1) + payload
      //   : output + payload}`,
      console.log(history[history.length - 1]);
      return {
        ...state,
        history: history + output + payload,
        operatorStatus: "is-clicked-once"
      };
    },
    operatorClickAgain: (state, { payload }) => {
      const { history, output } = state;
      return {
        ...state,
        history: history.substr(0, history.length - 1) + payload,
        operatorStatus: "is-clicked-again"
      };
    }
  }
});

export const selectOutput = state => state.calculator.output;
export const selectHistory = state => state.calculator.history;
export const selectOperatorStatus = state => state.calculator.operatorStatus;

export const {
  numberClick,
  operatorClickOnce,
  operatorClickAgain
} = calculatorSlice.actions;

export const computeValues = (value, type) => (dispatch, getState) => {
  const operatorStatus = selectOperatorStatus(getState());
  switch (type) {
    case "number":
      dispatch(numberClick(value));
      break;
    case "operator":
      if (operatorStatus === "init") {
        return;
      } else if (operatorStatus === "is-not-clicked") {
        dispatch(operatorClickOnce(value));
      } else if (
        operatorStatus === "is-clicked-once" ||
        operatorStatus === "is-clicked-again"
      ) {
        console.log(selectOperatorStatus(getState()), type);
        dispatch(operatorClickAgain(value));
      }
      break;
    default:
      return;
  }
};

export default calculatorSlice.reducer;
