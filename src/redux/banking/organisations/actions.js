export const getOrganisationListRequest = (isLoading) => ({
  type: 'GET_ORGANISATION_LIST_REQUEST',
  payload: { isLoading }
});

export const getOrganisationListSuccess = (organisationList, isLoading) => ({
  type: 'GET_ORGANISATION_LIST_SUCCESS',
  payload: {
    organisationList,
    isLoading
  }
});
