export const initialState = {
  isLoading: true,
  walletList: [],
};

export const wallets = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case 'GET_WALLET_LIST_REQUEST':
      return {
        ...state,
        isLoading: true,
      };

    case 'GET_WALLET_LIST_SUCCESS':
      return {
        ...state,
        walletList: action.payload.walletList,
        isLoading: false,
      };

    default:
      return state;
  }
};
