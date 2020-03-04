import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  root: undefined,
  result: undefined
};

const data = createSlice({
  name: 'data',
  initialState,
  reducers: {
    loadSearch: () => {},
    setRoot: (state, action) => {
      state.root = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    }
  }
});

export const { actions } = data;

export default data.reducer;
