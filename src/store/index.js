import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducer from 'reducers';
import saga from 'sagas';

const devMode = process.env.REACT_APP_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

if (devMode) {
  middleware.push(logger);
}

const createStore = (preloadedState = reducer()) => {
  const store = configureStore({
    reducer,
    devTools: devMode,
    middleware,
    preloadedState
  });
  sagaMiddleware.run(saga);
  return store;
};

export default createStore();
