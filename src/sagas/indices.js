import { all, takeLatest, call, put } from 'redux-saga/effects';
import actions from 'actions';
import apis from 'apis';

export function* loadIndices() {
  try {
    const response = yield call(apis.getIndices);
    if (response.status === 200) {
      yield put(actions.indices.loadIndices.onSuccess(response));
      yield put(actions.indices.setIndices(response.data));
    }
  } catch (e) {
    yield put(actions.indices.loadIndices.onFailure(e));
  }
}

function* watchLoadIndices() {
  yield takeLatest(actions.indices.loadIndices.onRequest, loadIndices);
}
export default function* rootSaga() {
  yield all([watchLoadIndices()]);
}
