import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToggled: false
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleClick: state => ({ ...state, toggle: !state.toggle })
  }
});

export const selectToggle = state => state.toggle.isToggled;

export const { toggleClick } = toggleSlice.actions;

export default toggleSlice.reducer;
