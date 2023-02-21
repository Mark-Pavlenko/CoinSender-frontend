import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { getWalletListRequest, getWalletListSuccess } from './actions';
import { getWalletList } from '../../../services/banking';

export function* sagaWalletListWorker() {
  try {
    yield put(getWalletListRequest(true));
    const responseWalletList = yield call(getWalletList);
    yield put(getWalletListSuccess(responseWalletList.data, false));
  } catch (e) {
    console.log(e);
  }
}

export function* sagaWalletListWatcher() {
  yield takeEvery('GET_WALLET_LIST', sagaWalletListWorker);
}

export default function* rootSaga() {
  yield all([fork(sagaWalletListWatcher)]);
}
