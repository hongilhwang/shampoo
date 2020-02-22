import React from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import Shampoo from 'Shampoo';
import store from 'store';

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
