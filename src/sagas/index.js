import { all } from 'redux-saga/effects';
import shampooSaga from 'sagas/shampoo';
import searchSaga from 'sagas/search';

export default function* rootSaga() {
  while (true) {
    try {
      yield all([shampooSaga(), searchSaga()]);
    } catch (error) {
      console.error(error.message);
    }
  }
}
