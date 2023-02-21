export const initialState = {
  employeeList: [],
  clientList: [],
  employee: {},
  client: {},
  isLoading: true,
  notification: false,
};

export const employees = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case 'GET_EMPLOYEE_LIST_REQUEST':
      return {
        ...state,
        isLoading: true,
      };

    case 'GET_CLIENT_LIST_REQUEST':
      return {
        ...state,
        isLoading: true,
      };

    case 'GET_EMPLOYEE_LIST_SUCCESS':
      return {
        ...state,
        employeeList: action.payload.employeeList,
        isLoading: false,
      };
    case 'GET_CLIENT_BY_ID_REQUEST':
      return {
        ...state,
        isLoading: true,
      };

    case 'GET_CLIENT_BY_ID_SUCCESS':
      return {
        ...state,
        client: action.payload.client,
        isLoading: false,
      };
    case 'GET_CLIENT_LIST_SUCCESS':
      return {
        ...state,
        clientList: action.payload.clientList,
        isLoading: false,
      };

    case 'GET_EMPLOYEE_REQUEST':
      return {
        ...state,
        isLoading: true,
      };

    case 'GET_EMPLOYEE_SUCCESS':
      return {
        ...state,
        employee: action.payload.employee,
        isLoading: false,
      };

    case 'EDIT_EMPLOYEE_REQUEST':
      return {
        ...state,
        isLoading: true,
      };

    case 'EDIT_EMPLOYEE_SUCCESS':
      return {
        ...state,
        isLoading: false,
      };

    case 'DELETE_EMPLOYEE_REQUEST':
      return {
        ...state,
        isLoading: true,
      };

    case 'DELETE_EMPLOYEE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        notification: true,
      };

    default:
      return state;
  }
};
