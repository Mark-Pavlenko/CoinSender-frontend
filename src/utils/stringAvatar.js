export function stringAvatar(name = 'No Data', surname = '') {
  if (!surname && !name) {
    return {
      children: `ND`,
    };
  }

  if (name && !surname) {
    return {
      children: `${name[0]}`,
    };
  }

  return {
    children: `${name[0]}${surname[0]}`,
  };
}
