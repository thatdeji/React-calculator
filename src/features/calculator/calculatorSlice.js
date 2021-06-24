import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: "",
  output: "12,936"
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    numberClick: (state, action) => ({ ...state, output: action.payload })
  }
});

export const { numberClick } = calculatorSlice.actions;

export const selectOutput = state => state.calculator.output;

export default calculatorSlice.reducer;
