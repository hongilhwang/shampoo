import { all } from 'redux-saga/effects';
import metaSaga from 'sagas/meta';

export default function* rootSaga() {
  while (true) {
    try {
      yield all([metaSaga()]);
    } catch (error) {
      console.error(error.message);
    }
  }
}
