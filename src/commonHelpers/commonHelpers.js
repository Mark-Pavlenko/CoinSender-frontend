/* eslint-disable */

export const sortStringValuesTwoWays = (array, direction) => {
  if (direction === 'az') {
    return array.sort(function (a, b) {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      if (a === b) return 0;
      return a < b ? -1 : 1;
    });
  }
  if (direction === 'za') {
    return array.sort(function (a, b) {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      if (a === b) return 0;
      return a > b ? -1 : 1;
    });
  }
};

export const filterRequests = (USERLIST, filtering) => {
  return Object.values(filtering).includes(true)
    ? USERLIST.filter((request) => filtering[request.requestName])
    : USERLIST;
};
