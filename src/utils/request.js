import Taro from '@tarojs/taro';
import { REQUEST_PREFIX, TOKEN, TOKEN_EXPIRED } from '../config';
import { getStorage, setStorage } from './storage';

const beforeSend = async config => {
  const { url, method = 'get', params = {}, data = {} } = config;
  for (let key in params) {
    if (!params[key]) delete params[key];
  }
  const token = getStorage(TOKEN);

  if (token === TOKEN_EXPIRED) {
    setStorage(TOKEN, undefined);
    Taro.navigateTo({ url: '/packages/Login/index' });
    return Promise.reject();
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

const afterSent = async response => {
  const { data, statusCode } = response;
  if (statusCode >= 400) {
    if (statusCode === 401) {
      setStorage(TOKEN, undefined);
      Taro.navigateTo({ url: '/packages/Login/index' });
    } else {
      Taro.showToast({
        title: data.message,
        icon: 'none',
      });
    }
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
