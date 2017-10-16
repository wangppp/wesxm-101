import {getToken} from '../auth'
import fetch from 'axios';

fetch.defaults.baseURL = 'http://localhost:8889';
fetch.defaults.timeout = '5000';

fetch.interceptors.request.use(
  config => {
    const token = getToken();
    config.headers.get['Authorization'] = `${token}`;
    config.headers.post['Authorization'] = `${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

fetch.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
export {fetch};