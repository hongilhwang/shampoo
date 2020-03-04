import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { actions as dataActions } from 'pages/DataViewer/slice/dataViewer';
import { actions as shampooActions } from 'pages/Shampoo/slice/shampoo';
import apis from 'apis';
import { HTTP_GET_OK } from 'utils/httpStatusCode';

function* loadSearch(action) {
  const currentIndex = yield select(state => state.shampoo.index);
  const index = action.payload || currentIndex;

  if (index) {
    try {
      const response = yield call(apis.getData, index.index);
      if (response.status === HTTP_GET_OK) {
        yield put(dataActions.setResult(response.data));
      }
    } catch (e) {
      console.error(e);
    }
  }
}

function* watchLoadSearch() {
  yield takeLatest(shampooActions.setIndex.type, loadSearch);
  yield takeLatest(dataActions.loadSearch.type, loadSearch);
}

export default function* rootSaga() {
  yield all([watchLoadSearch()]);
}
