export const initialState = {
  organisationList: [],
  isLoading: true,
};

export const organisations = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case 'GET_ORGANISATION_LIST_REQUEST':
      return {
        ...state,
        isLoading: true,
      };

    case 'GET_ORGANISATION_LIST_SUCCESS':
      return {
        ...state,
        organisationList: action.payload.organisationList,
        isLoading: false,
      };

    default:
      return state;
  }
};
