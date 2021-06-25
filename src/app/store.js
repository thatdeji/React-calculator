import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "../features/calculator/calculatorSlice";
import toggleReducer from "../features/toggle/toggleSlice";

export const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
    toggle: toggleReducer
  }
});
