import { request } from '@tarojs/taro';

const beforeSend = async config => {
  const { url, method = 'get' } = config;
  const prefix = 'http://localhost:3000/api';
  return {
    method,
    ...config,
    url: prefix + url,
  };
};

const afterSent = async response => {
  return response;
};

const instance = async config => {
  const configured = await beforeSend(config);
  const response = await request(configured);
  const configuredResponse = await afterSent(response);
  return configuredResponse;
};

export default instance;
