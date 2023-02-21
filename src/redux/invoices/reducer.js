import { GET_INVOICE_NUMBER_SUCCESS, GET_INVOICES_SUCCESS } from 'src/constants/actions';

export const initialState = {
  invoices: null,
  invoiceNumber: null,
  adminInvoices: [],
  invoice: {},
  wallets: [],
};

export const invoices = (state, { type, payload }) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (type) {
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: payload,
      };
    case 'GET_ADMIN_INVOICES_SUCCESS':
      return {
        ...state,
        adminInvoices: payload,
      };
    case 'GET_GENERAL_WALLETS':
      return {
        ...state,
      };
    case 'GET_GENERAL_WALLETS_SUCCESS':
      return {
        ...state,
        wallets: payload,
      };
    case 'GET_INVOICE_BY_ID_SUCCESS':
      return {
        ...state,
        invoice: payload,
      };

    case GET_INVOICE_NUMBER_SUCCESS:
      return {
        ...state,
        invoiceNumber: payload,
      };

    default:
      return state;
  }
};
