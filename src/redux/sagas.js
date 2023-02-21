import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import employees from './employees/sagas';
import organisations from './banking/organisations/saga';
import payments from './banking/payments/saga';
import wallets from './banking/wallets/saga';
import transfers from './transfers/sagas';
import invoices from './invoices/sagas';

export default function* rootSaga() {
  yield all([
    authSagas(),
    employees(),
    wallets(),
    organisations(),
    payments(),
    transfers(),
    invoices(),
  ]);
}
