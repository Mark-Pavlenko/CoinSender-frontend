export const setDataToLocalstorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const removeDataFromLocalstorage = (key) => {
  localStorage.removeItem(key);
};

export function getCookie(cookieName) {
  let cookie = {};
  document.cookie.split(';').forEach(function (el) {
    let [key, value] = el.split('=');
    cookie[key.trim()] = value;
  });
  return cookie[cookieName];
}
