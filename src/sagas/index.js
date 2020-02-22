import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  while (true) {
    try {
      yield all([]);
    } catch (error) {
      console.error(error.message);
    }
  }
}
