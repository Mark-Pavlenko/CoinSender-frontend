import axios from 'axios';
import { get } from 'lodash';

import { clearLocalStorageKey } from '../helpers/utils';
import { REFRESH, SIGN_IN } from '../constants/routes';

axios.defaults.baseURL = 'http://207.154.221.245/api/v1/'; // process.env.API_BASE_URL_DEV;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';

const getToken = () => localStorage.getItem('access_token');

// Adds authorization header to each axios request that goes to api server.
axios.interceptors.request.use(async (requestConfig) => {
  const tokenRawData = getToken();

  if (tokenRawData) {
    requestConfig.headers.Cookie = tokenRawData;
  }

  return requestConfig;
});

// Adds a 401 response interceptor
function createAxiosResponseInterceptor() {
  const responseInterceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.request.responseURL !== `${error.response.config.baseURL}/auth/`
      ) {
        const tokenRawData = localStorage.getItem('api_token');

        if (tokenRawData) {
          const originalRequest = error.response.config;
          const oldToken = JSON.parse(tokenRawData);

          // Use axios.interceptors.response.eject() to disable the interceptor
          // when the `/auth/refresh_token` endpoint is called and refresh_token has also expired.
          // Re-enable it after the invocation.
          axios.interceptors.response.eject(responseInterceptor);
          return axios
            .post(REFRESH, {
              refresh: get(oldToken, 'refresh', ''),
            })
            .then((refreshTokenResponse) => {
              const newToken = {
                refresh: get(oldToken, 'refresh', ''),
                access: get(refreshTokenResponse, 'data.access', ''),
                token_type: get(oldToken, 'token_type', ''),
                expires_in: get(oldToken, 'exact', ''),
              };
              localStorage.setItem('api_token', JSON.stringify(newToken));
              originalRequest.headers.Authorization = `${newToken.token_type} ${newToken.access}`;
              createAxiosResponseInterceptor();
              return axios(originalRequest);
            })
            .catch((error) => {
              console.log('ERROR', error);
              // See saga.logoutUser(history)
              clearLocalStorageKey(['api_token', 'session_user']);
              createAxiosResponseInterceptor();
              window.location.replace(SIGN_IN);
              throw new axios.Cancel('');
            });
        }
      }

      return Promise.reject(error);
    },
  );
}

export function justUploadFile(url, method, body) {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return axios[method](url, body, config);
}

createAxiosResponseInterceptor();

export default axios;
