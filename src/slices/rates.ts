import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    // @ts-ignore
    setRates: (state, action) => {
      return [...action.payload]; // Replacing the state with the new payload
    },
    clearRates: () => {
      return []; // Clearing the state by returning an empty array
    },
  },
});

const {reducer, actions} = ratesSlice;
export const {setRates, clearRates} = actions;
export default reducer;
