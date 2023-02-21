export const getWalletListRequest = (isLoading) => ({
  type: 'GET_WALLET_LIST_REQUEST',
  payload: { isLoading },
});

export const getWalletListSuccess = (walletList, isLoading) => ({
  type: 'GET_WALLET_LIST_SUCCESS',
  payload: {
    walletList,
    isLoading,
  },
});
