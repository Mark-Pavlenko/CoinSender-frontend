import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { getOrganisationListRequest, getOrganisationListSuccess } from './actions';
import { addOrganisation, addWallet, getOrganisationList } from '../../../services/banking';
import { sagaWalletListWorker } from '../wallets/saga';
import { sagaPaymentBalanceWorker } from '../payments/saga';

export function* sagaOrganisationsListWorker() {
  try {
    yield put(getOrganisationListRequest(true));
    const responseOrganisationList = yield call(getOrganisationList);
    yield put(getOrganisationListSuccess(responseOrganisationList.data, false));
    yield call(sagaPaymentBalanceWorker, { id: responseOrganisationList.data[0].wallet_id });
  } catch (e) {
    console.log(e);
  }
}

function* sagaAddOrganisationsListWorker({ payload }) {
  try {
    const newOrganisation = yield call(addOrganisation, payload);
    if (newOrganisation.status === 201) {
      yield call(addWallet, {
        description: 'Some description',
        name: `${payload.name} Wallet`,
        wallet_id: payload.wallet_id,
        organization_id: newOrganisation.data.identifiers[0].id,
      });
      yield call(sagaWalletListWorker);
      yield call(sagaOrganisationsListWorker);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* sagaOrganisationsListWatcher() {
  yield takeEvery('GET_ORGANISATIONS_LIST', sagaOrganisationsListWorker);
}

export function* sagaAddOrganisationsListWatcher() {
  yield takeEvery('ADD_ORGANISATION_SAGA', sagaAddOrganisationsListWorker);
}

export default function* rootSaga() {
  yield all([fork(sagaOrganisationsListWatcher), fork(sagaAddOrganisationsListWatcher)]);
}
