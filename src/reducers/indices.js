import { createSlice } from '@reduxjs/toolkit';

const indices = createSlice({
  name: 'indices',
  initialState: [],
  reducers: {
    setIndices(state, action) {
      return action.payload;
    }
  }
});

export const { actions } = indices;

export default indices.reducer;
