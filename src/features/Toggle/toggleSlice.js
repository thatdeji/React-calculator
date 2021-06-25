import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  toggle: false;
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleClick: (state) => ({...state, toggle: !state.toggle})
  }
});

export const toggleSelector = state => state.toggle;

export const {toggleClick} = toggleSlice.actions;

export default toggleSlice.reducer;