import { all, takeLatest, select, call, put } from 'redux-saga/effects';
import actions from 'actions';
import apis from 'apis';
import axios from 'axios';
import { loadIndices } from 'sagas/indices';

function* loadRoot() {
  const server = yield select(state => state.server);
  axios.defaults.baseURL = `${server.protocol}://${server.baseURL}:${server.port}`;

  try {
    const response = yield call(apis.getRoot, server);

    if (response.status === 200) {
      yield put(actions.dataView.setDataView(response.data));
      yield loadIndices();
      yield put(actions.meta.loadRoot.onSuccess(response));
    }
  } catch (e) {
    yield put(actions.meta.loadRoot.onFailure(e));
  }
}

function* watchLoadRoot() {
  yield takeLatest(actions.meta.loadRoot.onRequest, loadRoot);
}
export default function* rootSaga() {
  yield all([watchLoadRoot()]);
}
