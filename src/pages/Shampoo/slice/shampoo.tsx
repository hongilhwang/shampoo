import { createSlice } from '@reduxjs/toolkit';
import { ServerType, defaultServerValue } from 'components/Server/context/UrlContext';

interface InitialStateType {
  server: ServerType;
  index: string;
  indices: undefined;
  connected: boolean;
}

const initialState: InitialStateType = {
  server: defaultServerValue,
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
