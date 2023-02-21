import { put, call, takeEvery, all, fork } from 'redux-saga/effects';

import {
  deleteTransferRequest,
  deleteTransferSuccess,
  editTransferRequest,
  editTransferSuccess,
  getTransferListError,
  getTransferListRequest,
  getTransferListSuccess,
} from './actions';

import {
  getTransferList,
  uploadTransferList,
  deleteTransfer,
  editTransfer,
  addTransfer,
  importTransfers,
  deleteTransferMulti,
  downloadFile,
} from '../../services/tranfsers';

import { toast } from 'react-toastify';
import { sagaEmployeeListWorker } from '../employees/sagas';

export function* sagaTransfersListWorker() {
  try {
    yield put(getTransferListRequest(true));
    const responseEmployeeList = yield call(getTransferList);
    yield put(getTransferListSuccess(responseEmployeeList.data, false));
  } catch (e) {
    yield put(getTransferListError(false));
  }
}

function* uploadTransferWorker({ payload }) {
  try {
    const responseEmployeeList = yield call(uploadTransferList, payload);
    if (responseEmployeeList.status === 200) {
      yield call(sagaEmployeeListWorker);
      yield call(sagaTransfersListWorker);
      toast.success('Successfully uploaded!');
    }
  } catch (e) {
    toast.error(e.message);
  }
}

function* downloadExampleFileWorker() {
  try {
    yield call(downloadFile);
  } catch (e) {
    toast.error(e.message);
  }
}

//
function* sagaDeleteTransferWorker({ user }) {
  try {
    yield put(deleteTransferRequest(true));
    const response = yield call(deleteTransfer, user);
    if (response.status === 200) {
      yield put(deleteTransferSuccess(false));
      yield call(sagaTransfersListWorker);
      toast.success('Employee has been successfully removed!');
    }
  } catch (e) {
    toast.error(e.message);
  }
}

function* sagaDeleteTransferMultiWorker({ payload }) {
  try {
    yield put(deleteTransferRequest(true));
    const response = yield call(deleteTransferMulti, payload);
    if (response.status === 200) {
      yield put(deleteTransferSuccess(false));
      yield call(sagaTransfersListWorker);
      toast.success('Employee has been successfully removed!');
    }
  } catch (e) {
    toast.error(e.message);
  }
}

function* sagaImportTransferWorker() {
  try {
    const response = yield call(importTransfers);
    if (response.status === 201) {
      yield call(sagaTransfersListWorker);
      toast.success('Successfully uploaded!');
    }
  } catch (e) {
    toast.error(e.message);
  }
}

// // eslint-disable-next-line
function* sagaAddTransferWorker({ payload }) {
  try {
    const newEmployee = yield call(addTransfer, payload);
    if (newEmployee.status === 201) {
      yield call(sagaEmployeeListWorker);
      yield call(sagaTransfersListWorker);
      toast.success('Employee has been successfully added!');
    }
  } catch (e) {
    if (e.response.data.statusCode === 403) {
      toast.error(e.response.data.message);
    } else {
      toast.error(e.message);
    }
  }
}

function* sagaEditTransferWorker({ payload }) {
  try {
    yield put(editTransferRequest(true));
    const response = yield call(editTransfer, payload);
    if (response.status === 201) {
      yield put(editTransferSuccess(false));
      yield call(sagaEmployeeListWorker);
      yield call(sagaTransfersListWorker);
      toast.success('Employee has been successfully changed!');
    }
  } catch (e) {
    yield put(editTransferSuccess(false));
    toast.error(e.message);
  }
}

export function* sagaUploadTransferListWatcher() {
  yield takeEvery('UPLOAD_TRANSFERS', uploadTransferWorker);
}

export function* sagaTransferListWatcher() {
  yield takeEvery('GET_TRANSFER_LIST', sagaTransfersListWorker);
}

export function* sagaDeleteTransferWatcher() {
  yield takeEvery('DELETE_TRANSFER_SAGA', sagaDeleteTransferWorker);
}

export function* sagaAddTransferWatcher() {
  yield takeEvery('ADD_TRANSFER_SAGA', sagaAddTransferWorker);
}

export function* sagaEditTransferWatcher() {
  yield takeEvery('EDIT_TRANSFER_SAGA', sagaEditTransferWorker);
}

export function* sagaImportTransfersWatcher() {
  yield takeEvery('IMPORT_TRANSFERS_SAGA', sagaImportTransferWorker);
}

export function* sagaDeleteTransferMultiWatcher() {
  yield takeEvery('DELETE_TRANSFER_MULTI', sagaDeleteTransferMultiWorker);
}

export function* downloadExampleFileWatcher() {
  yield takeEvery('DOWNLOAD_FILE_EXAMPLE', downloadExampleFileWorker);
}

export default function* rootSaga() {
  yield all([
    fork(sagaTransferListWatcher),
    fork(sagaAddTransferWatcher),
    fork(sagaUploadTransferListWatcher),
    fork(sagaEditTransferWatcher),
    fork(sagaDeleteTransferWatcher),
    fork(sagaImportTransfersWatcher),
    fork(sagaDeleteTransferMultiWatcher),
    fork(downloadExampleFileWatcher),
  ]);
}
