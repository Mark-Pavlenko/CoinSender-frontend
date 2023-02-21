import { combineReducers } from 'redux';
import { AuthUser } from './auth/reducer';
import { employees } from './employees/reducer';
import { wallets } from './banking/wallets/reducer';
import { organisations } from './banking/organisations/reducer';
import { payments } from './banking/payments/reducer';
import { transfers } from './transfers/reducer';
import { invoices } from './invoices/reducer';

const appReducer = combineReducers({
  AuthUser,
  employees,
  wallets,
  organisations,
  payments,
  transfers,
  invoices,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
