import { put, call, takeEvery, all, fork } from 'redux-saga/effects';

import {
  deleteEmployeeRequest,
  deleteEmployeeSuccess,
  getClientByIdRequest,
  getClientByIdSuccess,
  getClientListRequest,
  getClientListSuccess,
  getEmployeeListRequest,
  getEmployeeListSuccess,
  getEmployeeRequest,
  getEmployeeSuccess,
} from './actions';

import {
  getEmployee,
  getEmployeeList,
  editEmployeeProfile,
  editEmployeeAvatar,
  addEmployee,
  deleteEmployee,
  getClientList,
  getClientById,
  addClient,
  editClientProfile,
  deleteClient,
} from '../../services/employees';
import { toast } from 'react-toastify';
import { CLIENTS, EMPLOYEES, INVOICE_CREATE } from 'src/constants/routes';

export function* sagaEmployeeListWorker() {
  try {
    yield put(getEmployeeListRequest(true));
    const responseEmployeeList = yield call(getEmployeeList);
    yield put(getEmployeeListSuccess(responseEmployeeList.data, false));
  } catch (e) {
    yield put(getEmployeeListSuccess([], false));
  }
}

export function* sagaClientListWorker({ payload }) {
  try {
    yield put(getClientListRequest(true));
    const response = yield call(getClientList, payload);
    yield put(getClientListSuccess(response.data, false));
  } catch (e) {
    yield put(getClientListSuccess([], false));
  }
}

export function* sagaEditEmployeeWorker({ payload, navigate, id, flag }) {
  try {
    const response = yield call(editEmployeeProfile, payload);

    if (response.status === 200 && flag !== 'delete') {
      navigate(`/application/employees/${id}/profile`);
      toast.success('Data updated successful');
    }

    if (response.status === 200 && flag === 'delete') {
      toast.success('Avatar deleted successful');
    }
  } catch (e) {
    if (e.response.data.statusCode === 403) {
      toast.error(e.response.data.message);
    } else {
      toast.error(e.message);
    }
  }
}

export function* sagaEditClientWorker({ payload, navigate, id, flag }) {
  try {
    const response = yield call(editClientProfile, payload);
    if (response.status === 200 && flag === 'delete') {
      toast.success('Data updated successful');
    }
    if (response.status === 200 && flag === 'edit') {
      navigate(`/application/partners/${id}/profile`);
      toast.success('Data updated successful');
    }
  } catch (e) {
    toast.error(e.message);
  }
}

export function* sagaEditEmployeeAvatarWorker({ payload, navigate }) {
  try {
    yield call(editEmployeeAvatar, payload);
  } catch (e) {
    toast.error(e.message);
  }
}

function* sagaEmployeeWorker({ payload }) {
  try {
    yield put(getEmployeeRequest(true));
    const responseEmployee = yield call(getEmployee, payload);
    yield put(getEmployeeSuccess(responseEmployee.data[0]));
  } catch (e) {
    console.log(e);
  }
}

function* sagaDeleteEmployeeWorker({ id }) {
  try {
    yield put(deleteEmployeeRequest(true));
    const response = yield call(deleteEmployee, { id });
    if (response.status === 200) {
      yield put(deleteEmployeeSuccess(false));
      yield call(sagaEmployeeListWorker);
      toast.success('Employee has been successfully removed!');
    }
  } catch (e) {
    toast.error(e.message);
  }
}
function* sagaDeleteClientWorker({ id, org_id }) {
  try {
    yield put(deleteEmployeeRequest(true));
    const response = yield call(deleteClient, { id });
    if (response.status === 200) {
      yield call(sagaClientListWorker, { payload: org_id });
      toast.success('Client has been successfully removed!');
    }
  } catch (e) {
    toast.error(e.message);
  }
}

function* sagaClientByIdWorker({ id }) {
  try {
    yield put(getClientByIdRequest(true));
    const response = yield call(getClientById, id);
    if (response.status === 200) {
      yield put(getClientByIdSuccess(response.data, false));
    }
  } catch (e) {
    toast.error(e.message);
  }
}

function* sagaAddEmployeeWorker({ payload, navigate }) {
  try {
    const newEmployee = yield call(addEmployee, payload);
    if (newEmployee.status === 201) {
      yield call(sagaEmployeeListWorker);
      yield call(navigate, EMPLOYEES);
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

function* sagaAddClientWorker({ payload, navigate, flag, org_id }) {
  try {
    const response = yield call(addClient, payload);
    if (response.status === 201 && flag === 'create') {
      yield call(sagaClientListWorker, org_id);
      yield call(navigate, CLIENTS);
      toast.success('Client has been successfully added!');
    }
    if (response.status === 201 && flag === 'invoice') {
      yield call(sagaClientListWorker, { payload: org_id });
      yield call(navigate, INVOICE_CREATE);
      toast.success('Client has been successfully added!');
    }
  } catch (e) {
    if (e.response.data.statusCode === 403) {
      toast.error(e.response.data.message);
    } else {
      toast.error(e.message);
    }
  }
}

export function* sagaEmployeeWatcher() {
  yield takeEvery('GET_EMPLOYEE_SAGA', sagaEmployeeWorker);
}

export function* sagaEditEmployeeWatcher() {
  yield takeEvery('EDIT_EMPLOYEE_PROFILE', sagaEditEmployeeWorker);
}

export function* sagaEditEmployeeAvatarWatcher() {
  yield takeEvery('EDIT_EMPLOYEE_AVATAR', sagaEditEmployeeAvatarWorker);
}

export function* sagaEmployeeListWatcher() {
  yield takeEvery('GET_EMPLOYEE_LIST', sagaEmployeeListWorker);
}

export function* sagaClientListWatcher() {
  yield takeEvery('GET_CLIENT_LIST', sagaClientListWorker);
}

export function* sagaAddEmployeeWatcher() {
  yield takeEvery('ADD_EMPLOYEE_SAGA', sagaAddEmployeeWorker);
}

export function* sagaDeleteEmployeeWatcher() {
  yield takeEvery('DELETE_EMPLOYEE_SAGA', sagaDeleteEmployeeWorker);
}

export function* sagaDeleteClientWatcher() {
  yield takeEvery('DELETE_CLIENT_SAGA', sagaDeleteClientWorker);
}

export function* sagaClientByIdWathcer() {
  yield takeEvery('GET_CLIENT_BY_ID', sagaClientByIdWorker);
}

export function* sagaAddClientWatcher() {
  yield takeEvery('ADD_CLIENT_SAGA', sagaAddClientWorker);
}

export function* sagaEditClientWatcher() {
  yield takeEvery('EDIT_CLIENT_SAGA', sagaEditClientWorker);
}

export default function* rootSaga() {
  yield all([
    fork(sagaEmployeeListWatcher),
    fork(sagaEditEmployeeWatcher),
    fork(sagaEmployeeWatcher),
    fork(sagaEditEmployeeAvatarWatcher),
    fork(sagaAddEmployeeWatcher),
    fork(sagaClientListWatcher),
    fork(sagaClientByIdWathcer),
    fork(sagaDeleteEmployeeWatcher),
    fork(sagaAddClientWatcher),
    fork(sagaEditClientWatcher),
    fork(sagaDeleteClientWatcher),
  ]);
}
