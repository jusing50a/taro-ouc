import { getStorageSync, setStorageSync } from '@tarojs/taro';

export const getStorage = key => {
  const { value, timeStamp } = getStorageSync(key);
  const now = Date.now();
  if (now - timeStamp > 7200000) {
    return 'outdated';
  }
  return value;
};

export const setStorage = (key, value) => {
  const timeStamp = Date.now();
  setStorageSync(key, { value, timeStamp });
};
