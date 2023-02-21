import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  REGISTER_USER,
  LOGIN_USER,
  IS_AUTH,
  LOGOUT_USER,
  GOOGLE_LOGIN,
} from '../../constants/actions';
import { loginUserSuccess, logoutUserSuccess, setErrorMessage } from './actions';
import { INVOICE_CREATE, PROFILE, SIGN_IN, BANKING } from '../../constants/routes';
import {
  signIn as signInServices,
  signUp as signUpServices,
  logoutUser,
  refreshToken,
  changePassword,
  editUserProfile,
  editUserAvatar,
  forgotPassword,
  googleAuth,
} from '../../services';

import { toast } from 'react-toastify';

import { getCookie, removeDataFromLocalstorage, setDataToLocalstorage } from './helper';

function* registerWithEmailPassword({ payload, navigate }) {
  try {
    const response = yield call(signUpServices, payload);
    if (response.status === 201) {
      toast.success('Profile has been successfully created!');
      yield navigate(SIGN_IN, { replace: true });
      yield put(setErrorMessage(''));
    }
  } catch (e) {
    if (e.response.data.statusCode === 403) {
      yield put(setErrorMessage(e.response.data.message));
    } else {
      toast.error(e.message);
    }
  }
}

function* loginWithEmailPassword({ payload, navigate }) {
  try {
    const response = yield call(signInServices, payload);
    if (response.status === 200) {
      const access = getCookie('Authentication');
      const refresh = getCookie('Refresh');
      const data = JSON.stringify(response.data);
      yield call(setDataToLocalstorage, 'authorization_login', data);
      yield call(setDataToLocalstorage, 'access_token', access);
      yield call(setDataToLocalstorage, 'currentUser', data);
      yield call(setDataToLocalstorage, 'refresh_token', refresh);
      yield put(loginUserSuccess(response.data));
      toast.success('Successfully authorized!');
      yield navigate(INVOICE_CREATE, { replace: true });
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
}
function* loginWithGoogle({ payload, navigate }) {
  try {
    const responce = yield call(googleAuth, payload);
    if (responce.status === 201) {
      const access = getCookie('Authentication');
      const refresh = getCookie('Refresh');
      const data = JSON.stringify(responce.data);
      yield call(setDataToLocalstorage, 'authorization_login', data);
      yield call(setDataToLocalstorage, 'access_token', access);
      yield call(setDataToLocalstorage, 'currentUser', data);
      yield call(setDataToLocalstorage, 'refresh_token', refresh);
      toast.success('Successfully authorized!');
      yield put(loginUserSuccess(responce.data));
      yield navigate(BANKING, { replace: true });
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* logoutUserWorker({ navigate }) {
  try {
    const response = yield call(logoutUser);
    if (response.status === 200) {
      yield call(removeDataFromLocalstorage, 'access_token');
      yield call(removeDataFromLocalstorage, 'authorization_login');
      yield put(logoutUserSuccess());
      yield navigate(SIGN_IN, { replace: true });
      toast.success('Successfully!');
    }
  } catch (error) {
    toast.error(error.message);
  }
}

export function* isAuth() {
  try {
    const response = yield call(refreshToken);

    if (response.status === 201) {
      localStorage.setItem('access_token', getCookie('Authentication'));
      yield put(loginUserSuccess(response.data));
    }
  } catch (error) {
    toast.error(error.message);
  }
}

export function* changePasswordWorker({ payload, navigate }) {
  try {
    const response = yield call(changePassword, payload);
    if (response.status === 200) {
      toast.success(response.data.message);
      yield navigate(PROFILE, { replace: true });
    }
  } catch (e) {
    toast.error(e.response.data.message);
  }
}

export function* editUserProfileWorker({ payload, navigate, flag }) {
  try {
    const response = yield call(editUserProfile, payload);
    if (response.status === 200 && flag === 'delete') {
      yield toast.success('Data changed successful');
      yield call(setDataToLocalstorage, 'currentUser', JSON.stringify(response.data));
    }
    if (response.status === 200 && flag === 'edit') {
      yield toast.success('Data changed successful');
      yield call(setDataToLocalstorage, 'currentUser', JSON.stringify(response.data));
      yield navigate(PROFILE, { replace: true });
    }
  } catch (e) {
    toast.error(e.message);
  }
}

export function* forgotUserPasswordWorker({ payload, navigate }) {
  try {
    const response = yield call(forgotPassword, payload);
    if (response.status === 201) {
      yield toast.success(response.data.message);
      yield navigate(SIGN_IN, { replace: true });
    }
  } catch (e) {
    toast.error(e.response.data.message);
  }
}

export function* editUserAvatarWorker({ payload, user }) {
  try {
    const response = yield call(editUserAvatar, payload);
    if (response.status === 201) {
      yield call(
        setDataToLocalstorage,
        'currentUser',
        JSON.stringify({
          ...user,
          avatar_url: response?.data?.avatar_url,
        }),
      );
      yield (window.location.href = '/application/profile');
    }
  } catch (e) {
    toast.error(e.message);
  }
}

export function* watchRegisterUser() {
  yield takeLatest(REGISTER_USER, registerWithEmailPassword);
}

export function* watchLoginUser() {
  yield takeLatest(LOGIN_USER, loginWithEmailPassword);
}

export function* watchLogoutUser() {
  yield takeLatest(LOGOUT_USER, logoutUserWorker);
}

export function* watchIsAuth() {
  yield takeLatest(IS_AUTH, isAuth);
}

export function* changePasswordWatcher() {
  yield takeLatest('CHANGE_PASSWORD', changePasswordWorker);
}

export function* editUserProfileWatcher() {
  yield takeLatest('EDIT_USER_PROFILE', editUserProfileWorker);
}

export function* editUserAvatarWatcher() {
  yield takeLatest('EDIT_USER_AVATAR', editUserAvatarWorker);
}

export function* forgotUserPasswordWatcher() {
  yield takeLatest('FORGOT_USER_PASSWORD', forgotUserPasswordWorker);
}
export function* loginWithGoogleWatcher() {
  yield takeLatest(GOOGLE_LOGIN, loginWithGoogle);
}

export default function* rootSaga() {
  yield all([
    fork(watchRegisterUser),
    fork(watchIsAuth),
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(changePasswordWatcher),
    fork(editUserProfileWatcher),
    fork(editUserAvatarWatcher),
    fork(forgotUserPasswordWatcher),
    fork(loginWithGoogleWatcher),
  ]);
}
