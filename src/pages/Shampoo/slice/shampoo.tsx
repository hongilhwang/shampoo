import { createSlice } from '@reduxjs/toolkit';
import { DefaultContextValue } from 'components/Server';

const initialState = {
  server: DefaultContextValue,
  index: undefined,
  indices: undefined,
  connected: false
};

const shampoo = createSlice({
  name: 'shampoo',
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setServer: (state, action) => {
      const server = action.payload;
      state.server = server;
    },
    loadServer: () => {},
    setIndices: (state, action) => {
      state.indices = action.payload;
    },
    loadIndices: () => {},
    setIndex: (state, action) => {
      state.index = action.payload;
    }
  }
});

export const { actions } = shampoo;

export default shampoo.reducer;
