import React from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import store from 'store';
import DataViewer from 'pages/DataViewer';
import Shampoo from 'pages/Shampoo';

const App = () => {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Shampoo>
          <DataViewer />
        </Shampoo>
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
