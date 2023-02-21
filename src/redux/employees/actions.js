export const getEmployeeListSaga = () => ({
  type: 'GET_EMPLOYEE_LIST_SAGA',
});

export const getClientListRequest = (isLoading) => ({
  type: 'GET_CLIENT_LIST_REQUEST',
  payload: { isLoading },
});

export const getClientByIdRequest = (isLoading) => ({
  type: 'GET_CLIENT_BY_ID_REQUEST',
  payload: { isLoading },
});

export const getEmployeeListRequest = (isLoading) => ({
  type: 'GET_EMPLOYEE_LIST_REQUEST',
  payload: { isLoading },
});

export const getEmployeeListSuccess = (employeeList, isLoading) => ({
  type: 'GET_EMPLOYEE_LIST_SUCCESS',
  payload: {
    employeeList,
    isLoading,
  },
});

export const getClientListSuccess = (clientList, isLoading) => ({
  type: 'GET_CLIENT_LIST_SUCCESS',
  payload: {
    clientList,
    isLoading,
  },
});

export const getClientByIdSuccess = (client, isLoading) => ({
  type: 'GET_CLIENT_BY_ID_SUCCESS',
  payload: {
    client,
    isLoading,
  },
});

export const getEmployeeSaga = (employeeId) => ({
  type: 'GET_EMPLOYEE_SAGA',
  payload: {
    employeeId,
  },
});

export const getEmployeeRequest = (isLoading) => ({
  type: 'GET_EMPLOYEE_REQUEST',
  payload: { isLoading },
});

export const getEmployeeSuccess = (employee) => ({
  type: 'GET_EMPLOYEE_SUCCESS',
  payload: {
    employee,
  },
});
//
export const deleteEmployeeSaga = (employeeId) => ({
  type: 'DELETE_EMPLOYEE_SAGA',
  payload: {
    employeeId,
  },
});

export const deleteEmployeeRequest = (isLoading) => ({
  type: 'DELETE_EMPLOYEE_REQUEST',
  payload: { isLoading },
});

export const deleteEmployeeSuccess = (isLoading) => ({
  type: 'DELETE_EMPLOYEE_SUCCESS',
  payload: {
    isLoading,
  },
});

export const editEmployeeRequest = (isLoading) => ({
  type: 'EDIT_EMPLOYEE_REQUEST',
  payload: { isLoading },
});

export const editEmployeeSuccess = (isLoading, notification) => ({
  type: 'EDIT_EMPLOYEE_SUCCESS',
  payload: {
    isLoading,
    notification,
  },
});
