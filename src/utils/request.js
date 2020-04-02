import Taro from '@tarojs/taro';
import { REQUEST_PREFIX } from '../config';
import { getStorage } from './storage';

const beforeSend = async config => {
  const { url, method = 'get', params = {}, data = {} } = config;
  for (let key in params) {
    if (!params[key]) delete params[key];
  }
  const token = getStorage('token');
  if (token === 'outdated') {
    Taro.navigateTo('/pages/User/Login/index');
    throw new Error();
  }
  return {
    method,
    ...config,
    url: REQUEST_PREFIX + url,
    data: { ...params, ...data },
    header: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

const afterSent = response => {
  const { data, statusCode } = response;
  if (statusCode >= 400) {
    if (statusCode === 401) {
      Taro.removeStorageSync('token');
      Taro.redirectTo({ url: '/packages/Login/index' });
      return;
    }
    Taro.showToast({
      title: data.message,
      icon: 'none',
    });
    return Promise.reject(data);
  } else {
    return data;
  }
};

export const instance = async config => {
  try {
    const configured = await beforeSend(config);
    const response = await Taro.request(configured);
    return afterSent(response);
  } catch (e) {
    console.log(e);
  }
};
