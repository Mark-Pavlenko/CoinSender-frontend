import {
  CREATE_INVOICE,
  GET_INVOICES,
  GET_INVOICE_NUMBER,
  GET_INVOICE_NUMBER_SUCCESS,
  GET_INVOICES_SUCCESS,
} from 'src/constants/actions';

export const getInvoicesAction = () => ({
  type: GET_INVOICES,
});

export const getInvoicesActionSuccess = (payload) => ({
  type: GET_INVOICES_SUCCESS,
  payload,
});

export const getWalletsAction = () => ({
  type: 'GET_GENERAL_WALLETS',
});

export const getWalletsActionSuccess = (payload) => ({
  type: 'GET_GENERAL_WALLETS_SUCCESS',
  payload,
});

export const getAdminInvoicesActionSuccess = (payload) => ({
  type: 'GET_ADMIN_INVOICES_SUCCESS',
  payload,
});

export const getAdminByIdActionSuccess = (payload) => ({
  type: 'GET_INVOICE_BY_ID_SUCCESS',
  payload,
});

export const getInvoiceNumberActionSuccess = (payload) => ({
  type: GET_INVOICE_NUMBER_SUCCESS,
  payload,
});

export const getInvoiceNumberAction = () => ({
  type: GET_INVOICE_NUMBER,
});

export const createInvoiceAction = ({ payload, navigate }) => ({
  type: CREATE_INVOICE,
  payload,
  navigate,
});
