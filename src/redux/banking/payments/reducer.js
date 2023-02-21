export const initialState = {
  paymentList: [],
  balance: 0,
  user: { name: '', second_name: '' },
  isLoading: true,
};

export const payments = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PAYMENT_LIST_REQUEST':
      return {
        ...state,
        isLoading: true,
      };

    case 'GET_PAYMENT_LIST_SUCCESS':
      return {
        ...state,
        paymentList: action?.payload?.paymentList?.transfers,
        user: {
          name: action?.payload?.paymentList?.name,
          second_name: action?.payload?.paymentList?.second_name,
        },

        isLoading: false,
      };

    case 'GET_PAYMENT_LIST_ERROR':
      return {
        ...state,
        isLoading: false,
      };

    case 'GET_PAYMENT_BALANCE_REQUEST':
      return {
        ...state,
      };

    case 'GET_PAYMENT_BALANCE_SUCCESS':
      return {
        ...state,
        balance: action.payload.balance,
        isLoading: false,
      };

    default:
      return state;
  }
};
