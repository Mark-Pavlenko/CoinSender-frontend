import { put, call, takeEvery, all, fork } from 'redux-saga/effects';

import {
  getInvoicesActionSuccess,
  getInvoiceNumberActionSuccess,
  getAdminInvoicesActionSuccess,
  getAdminByIdActionSuccess,
  getWalletsActionSuccess,
} from './actions';

import {
  getAllInvoices,
  getInvoiceNumber,
  addInvoice,
  getAdminInvoices,
  getInvoiceById,
  addGeneralWallet,
  getAllWallets,
  deleteWallet,
  editWallet,
} from '../../services/invoice';
import { CREATE_INVOICE, GET_INVOICES, GET_INVOICE_NUMBER } from 'src/constants/actions';
import { toast } from 'react-toastify';
import { INVOICE } from 'src/constants/routes';

export function* sagaInvoiceNumberWorker() {
  try {
    const invoicesNumberResponse = yield call(getInvoiceNumber);
    if (invoicesNumberResponse.status === 200) {
      yield put(getInvoiceNumberActionSuccess(invoicesNumberResponse.data));
    }
  } catch (e) {
    toast.error('Something went wrong');
  }
}

export function* sagaInvoicesListWorker() {
  try {
    const invoicesListResponse = yield call(getAllInvoices);
    if (invoicesListResponse.status === 201) {
      yield put(getInvoicesActionSuccess(invoicesListResponse.data));
    }
  } catch (e) {
    toast.error('Something went wrong');
  }
}

export function* sagaWalletsListWorker({ payload }) {
  try {
    const res = yield call(getAllWallets, payload);
    if (res.status === 200) {
      yield put(getWalletsActionSuccess(res.data));
    }
  } catch (e) {
    if (e.response.data.statusCode === 403) {
      toast.error(e.response.data.message);
    } else {
      toast.error(e.message);
    }
  }
}

export function* sagaAdminInvoicesWorker() {
  try {
    const invoicesListResponse = yield call(getAdminInvoices);

    const invoices = invoicesListResponse.data.sort(function (a, b) {
      return new Date(b.due_date) - new Date(a.due_date);
    });

    if (invoicesListResponse.status === 200) {
      yield put(getAdminInvoicesActionSuccess(invoices));
    }
  } catch (e) {
    toast.error('Something went wrong');
  }
}

export function* sagaCreateInvoiceWorker({ payload, navigate }) {
  try {
    const responseCreateInvoice = yield call(addInvoice, payload);

    if (responseCreateInvoice.status === 201) {
      yield call(sagaInvoiceNumberWorker);
      yield call(sagaInvoicesListWorker);
      yield call(navigate, INVOICE);
      toast.success('Invoice created successfull');
    }
  } catch (e) {
    if (e.response.data.statusCode === 403) {
      toast.error(e.response.data.message);
    } else {
      toast.error(e.message);
    }
  }
}

export function* sagaCreateGeneralWalletWorker({ payload, navigate, org_id }) {
  try {
    const responseCreateInvoice = yield call(addGeneralWallet, payload);

    if (responseCreateInvoice.status === 201) {
      yield call(sagaWalletsListWorker, { payload: org_id });
      toast.success('Wallet binded successfull');
    }
  } catch (e) {
    if (e.response.data.statusCode === 403) {
      toast.error(e.response.data.message);
    } else {
      toast.error(e.message);
    }
  }
}

export function* sagaInvoiceByIdWorker({ payload }) {
  try {
    const response = yield call(getInvoiceById, payload);
    if (response.status === 201) {
      yield put(getAdminByIdActionSuccess(response.data));
    }
  } catch (e) {
    if (e.response.data.statusCode === 403) {
      toast.error(e.response.data.message);
    } else {
      toast.error(e.message);
    }
  }
}

export function* sagaDeleteGeneralWalletWorker({ payload, org_id }) {
  try {
    const response = yield call(deleteWallet, payload);
    if (response.status === 200) {
      yield call(sagaWalletsListWorker, { payload: org_id });
      toast.success('Wallet removed successfull');
    }
  } catch (e) {
    if (e.response.data.statusCode === 403) {
      toast.error(e.response.data.message);
    } else {
      toast.error(e.message);
    }
  }
}

export function* sagaEditGeneralWalletWorker({ payload, org_id }) {
  try {
    const response = yield call(editWallet, payload);
    if (response.status === 200) {
      yield call(sagaWalletsListWorker, { payload: org_id });
      toast.success('Wallet changed successful!');
    }
  } catch (e) {
    if (e.response.data.statusCode === 403) {
      toast.error(e.response.data.message);
    } else {
      toast.error(e.message);
    }
  }
}

export function* sagaCreateInvoiceWatcher() {
  yield takeEvery(CREATE_INVOICE, sagaCreateInvoiceWorker);
}

export function* sagaInvoicesWatcher() {
  yield takeEvery(GET_INVOICES, sagaInvoicesListWorker);
}

export function* sagaInvoiceNumberWatcher() {
  yield takeEvery(GET_INVOICE_NUMBER, sagaInvoiceNumberWorker);
}

export function* sagaAdminInvoicesWathcer() {
  yield takeEvery('GET_ADMIN_INVOICES', sagaAdminInvoicesWorker);
}

export function* sagaInvoiceByIdWathcer() {
  yield takeEvery('GET_INVOICE_BY_ID', sagaInvoiceByIdWorker);
}

export function* sagaWalletsListWatcher() {
  yield takeEvery('GET_GENERAL_WALLETS', sagaWalletsListWorker);
}

export function* sagaCreateGeneralWalletWatcher() {
  yield takeEvery('ADD_GENERAL_WALLET', sagaCreateGeneralWalletWorker);
}

export function* sagaDeleteGeneralWalletWatcher() {
  yield takeEvery('DELETE_GENERAL_WALLET', sagaDeleteGeneralWalletWorker);
}

export function* sagaEditGeneralWalletWathcer() {
  yield takeEvery('EDIT_GENERAL_WALLET', sagaEditGeneralWalletWorker);
}

export default function* rootSaga() {
  yield all([
    fork(sagaCreateInvoiceWatcher),
    fork(sagaInvoicesWatcher),
    fork(sagaInvoiceNumberWatcher),
    fork(sagaAdminInvoicesWathcer),
    fork(sagaInvoiceByIdWathcer),
    fork(sagaWalletsListWatcher),
    fork(sagaCreateGeneralWalletWatcher),
    fork(sagaDeleteGeneralWalletWatcher),
    fork(sagaEditGeneralWalletWathcer),
  ]);
}
