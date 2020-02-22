import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { JsonViewProvider } from 'components/JsonView';
import { ServerProvider } from 'components/Server';
import { IndicesProvider } from 'components/Indices';
import { SnackbarProvider } from 'notistack';
import { DataViewProvider } from 'components/DataView';
import Shampoo from 'Shampoo';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer
});

const App = () => {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <ServerProvider>
          <IndicesProvider>
            <JsonViewProvider>
              <DataViewProvider>
                <Shampoo />
              </DataViewProvider>
            </JsonViewProvider>
          </IndicesProvider>
        </ServerProvider>
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
