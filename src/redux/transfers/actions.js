export const getEmployeeListSaga = () => ({
  type: 'GET_EMPLOYEE_LIST_SAGA',
});

export const getTransferListRequest = (isLoading) => ({
  type: 'GET_TRANSFER_LIST_REQUEST',
  payload: { isLoading },
});

export const getTransferListSuccess = (employeeList, isLoading) => ({
  type: 'GET_TRANSFER_LIST_SUCCESS',
  payload: {
    employeeList,
    isLoading,
  },
});

export const getTransferListError = (isLoading) => ({
  type: 'GET_TRANSFER_LIST_ERROR',
  payload: {
    isLoading,
  },
});

//
export const deleteTransferSaga = (employeeId) => ({
  type: 'DELETE_TRANSFER_SAGA',
  payload: {
    employeeId,
  },
});

export const deleteTransferRequest = (isLoading) => ({
  type: 'DELETE_TRANSFER_REQUEST',
  payload: { isLoading },
});

export const deleteTransferSuccess = (isLoading) => ({
  type: 'DELETE_TRANSFER_SUCCESS',
  payload: {
    isLoading,
  },
});

export const editTransferRequest = (isLoading) => ({
  type: 'EDIT_TRANSFER_REQUEST',
  payload: { isLoading },
});

export const editTransferSuccess = (isLoading, notification) => ({
  type: 'EDIT_TRANSFER_SUCCESS',
  payload: {
    isLoading,
    notification,
  },
});
