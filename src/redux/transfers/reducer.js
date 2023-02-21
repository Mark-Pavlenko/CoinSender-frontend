export const initialState = {
  transferList: [],
  isLoading: true,
  user: { name: '', second_name: '' },
};

export const transfers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TRANSFER_LIST_REQUEST':
      return {
        ...state,
        isLoading: true,
      };

    case 'GET_TRANSFER_LIST_SUCCESS':
      return {
        ...state,
        transferList: action.payload.employeeList.transfers,
        user: {
          name: action.payload.employeeList.name,
          second_name: action.payload.employeeList.second_name,
        },
        isLoading: false,
      };
    case 'GET_TRANSFER_LIST_ERROR':
      return {
        ...state,
        isLoading: false,
      };

    case 'EDIT_TRANSFER_REQUEST':
      return {
        ...state,
        isLoading: true,
      };

    case 'EDIT_TRANSFER_SUCCESS':
      return {
        ...state,
        isLoading: false,
      };

    case 'DELETE_TRANSFER_REQUEST':
      return {
        ...state,
        isLoading: true,
      };

    case 'DELETE_TRANSFER_SUCCESS':
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
