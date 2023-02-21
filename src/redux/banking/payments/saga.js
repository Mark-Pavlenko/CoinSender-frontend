import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { addPayment, getBalance } from '../../../services/banking';
import {
  getPaymentBalanceRequest,
  getPaymentBalanceSuccess,
  getPaymentListError,
  getPaymentListRequest,
  getPaymentListSuccess,
} from './actions';
import { getPaymentsList } from '../../../services/tranfsers';
import { sagaTransfersListWorker } from '../../transfers/sagas';
import { toast } from 'react-toastify';

export function* sagaPaymentListWorker() {
  try {
    yield put(getPaymentListRequest(true));
    const responsePaymentList = yield call(getPaymentsList);
    if (responsePaymentList.status === 200) {
      yield put(getPaymentListSuccess(responsePaymentList.data));
    }
  } catch (e) {
    yield put(getPaymentListError(false));
  }
}

export function* sagaPaymentBalanceWorker({ id }) {
  try {
    yield put(getPaymentBalanceRequest(true));
    const responsePaymentBalance = yield call(getBalance, id);
    yield put(getPaymentBalanceSuccess(responsePaymentBalance.data, false));
  } catch (e) {
    console.log(e);
  }
}

function* sagaAddPaymentWorker({ payload, transfers, wallet }) {
  try {
    const newPayment = yield call(addPayment, { payload, transfers });
    if (newPayment.status === 201) {
      yield call(sagaPaymentListWorker, { payload: wallet });
      yield call(sagaTransfersListWorker);
      toast.success('Successfully!');
    }
  } catch (e) {
    toast.error(e.message);
  }
}

export function* sagaAddPaymentWatcher() {
  yield takeEvery('ADD_PAYMENT', sagaAddPaymentWorker);
}

export function* sagaPaymentListWatcher() {
  yield takeEvery('GET_PAYMENT_LIST', sagaPaymentListWorker);
}

export function* sagaPaymentBalanceWatcher() {
  yield takeEvery('GET_BALANCE', sagaPaymentBalanceWorker);
}

export default function* rootSaga() {
  yield all([
    fork(sagaPaymentListWatcher),
    fork(sagaAddPaymentWatcher),
    fork(sagaPaymentBalanceWatcher),
  ]);
}
