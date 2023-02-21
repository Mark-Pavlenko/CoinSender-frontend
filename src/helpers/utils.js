export const clearLocalStorageKey = (key) => key.forEach((k) => localStorage.removeItem(k));

export const transformEventTypeToIconName = (str) => {
  if (str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  } else {
    return 'absent';
  }
};

export const getUsersDataById = (usersArray, projectDevelopers) => {
  return usersArray
    .map((user) => {
      return projectDevelopers.map((dev) => {
        if (user.id === dev.developerId) {
          return {
            ...dev,
            avatar: user.avatar,
            name: user.name,
            surname: user.surname
          };
        }
      });
    })
    .flat()
    .filter((el) => el !== undefined);
};

export const getLocalStorageItem = (item) => JSON.parse(localStorage.getItem(item));
