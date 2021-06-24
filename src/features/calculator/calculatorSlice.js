import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: "",
  output: ""
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
