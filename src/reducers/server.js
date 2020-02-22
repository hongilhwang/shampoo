import { createSlice } from '@reduxjs/toolkit';
import { DefaultContextValue } from 'components/Server';

const server = createSlice({
  name: 'server',
  initialState: DefaultContextValue,
  reducers: {
    setServer(state, action) {
      return action.payload;
    }
  }
});

export const { actions } = server;

export default server.reducer;
