import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducer from 'reducers';
import saga from 'sagas';

const devTools = process.env.REACT_APP_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: false
  }),
  sagaMiddleware
];

if (devTools) {
  middleware.push(logger);
}

const createStore = () => {
  const options = {
    reducer,
    devTools,
    middleware
  };

  const store = configureStore(options);
  sagaMiddleware.run(saga);
  return store;
};

export default createStore();
