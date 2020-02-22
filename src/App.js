import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SnackbarProvider } from 'notistack';
import Shampoo from 'Shampoo';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer
});

const App = () => {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Shampoo />
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
