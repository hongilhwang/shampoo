import { createSlice } from '@reduxjs/toolkit';

const dataView = createSlice({
  name: 'dataView',
  initialState: [],
  reducers: {
    setDataView(state, action) {
      return action.payload;
    }
  }
});

export const { actions } = dataView;

export default dataView.reducer;
