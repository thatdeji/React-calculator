import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToggled: false
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleClick: state => ({ ...state, isToggled: !state.isToggled })
  }
});

export const selectToggle = state => state.toggle.isToggled;

export const { toggleClick } = toggleSlice.actions;

export default toggleSlice.reducer;
