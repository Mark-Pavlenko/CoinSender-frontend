export const getPaymentListRequest = (isLoading) => ({
  type: 'GET_PAYMENT_LIST_REQUEST',
  payload: { isLoading },
});

export const getPaymentListSuccess = (paymentList, isLoading) => ({
  type: 'GET_PAYMENT_LIST_SUCCESS',
  payload: {
    paymentList,
    isLoading,
  },
});

export const getPaymentListError = (isLoading) => ({
  type: 'GET_PAYMENT_LIST_ERROR',
  payload: {
    isLoading,
  },
});

export const getPaymentBalanceRequest = (isLoading) => ({
  type: 'GET_PAYMENT_BALANCE_REQUEST',
  payload: { isLoading },
});

export const getPaymentBalanceSuccess = (balance, isLoading) => ({
  type: 'GET_PAYMENT_BALANCE_SUCCESS',
  payload: {
    balance,
    isLoading,
  },
});
