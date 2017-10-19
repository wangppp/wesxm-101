import {getToken} from '../auth'
import {message} from 'antd';
import fetch from 'axios';

fetch.defaults.baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:8889' : 'http://104.238.140.111:8889';
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
    if (response.data && response.data.message) {
      message.success(response.data.message);
    }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        // 过期跳转到登录页
        case 401:
          // 强制跳转！！！
          window.location.href = '/login';
          break;
      }
      message.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);
export {fetch};