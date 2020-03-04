import { all, takeLatest, call, put } from 'redux-saga/effects';
import { actions as shampooActions } from 'pages/Shampoo/slice/shampoo';
import { actions as dataActions } from 'pages/DataViewer/slice/dataViewer';
import apis from 'apis';
import axios from 'axios';
import { HTTP_GET_OK } from 'utils/httpStatusCode';

function* loadServer(action) {
  const server = action.payload;
  axios.defaults.baseURL = `${server.protocol}://${server.baseURL}:${server.port}`;
  yield put(shampooActions.setServer(action.payload));
  try {
    const response = yield call(apis.getRoot);

    if (response.status === HTTP_GET_OK) {
      yield put(shampooActions.setConnected(true));
      yield put(dataActions.setResult(undefined));
      yield put(dataActions.setRoot(response.data));
      yield put(shampooActions.loadIndices());
    } else {
      throw new Error(`서버 접속에 실패 하였습니다.[${response.status}]`);
    }
  } catch (e) {
    yield put(shampooActions.setConnected, false);
  }
}

function* loadIndices() {
  try {
    const response = yield call(apis.getIndices);
    if (response.status === HTTP_GET_OK) {
      yield put(shampooActions.setIndices(response.data));
    }
  } catch (e) {
    console.error(e);
  }
}

function* watchLoadServer() {
  yield takeLatest(shampooActions.loadServer.type, loadServer);
}
function* watchLoadIndices() {
  yield takeLatest(shampooActions.loadIndices.type, loadIndices);
}
export default function* rootSaga() {
  yield all([watchLoadServer(), watchLoadIndices()]);
}
