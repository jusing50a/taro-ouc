import { getStorageSync, setStorageSync, clearStorageSync } from '@tarojs/taro';
import { TOKEN_EXPIRED } from '../config';

export const getStorage = key => {
  const { value, timeStamp } = getStorageSync(key.toString());
  const now = Date.now();
  if (now - timeStamp > 720000000) {
    return TOKEN_EXPIRED;
  }
  return value;
};

export const setStorage = (key, value) => {
  const timeStamp = Date.now();
  setStorageSync(key.toString(), { value, timeStamp });
};

export const clearStorage = () => {
  clearStorageSync();
};
