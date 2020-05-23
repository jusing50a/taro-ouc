import Taro from '@tarojs/taro';
import { getStorage } from './storage';
import { TOKEN } from '../config';
import store from '../store';

const initializing = async () => {
  const token = getStorage(TOKEN);
  if (token) {
    const status = await store.getTokenStatus();
    if (status) {
      store.getCurrentWeek();
      store.getCurrentSemester();
    }
    //  else {
    //   setStorage(TOKEN, undefined);
    //   Taro.navigateTo({ url: '/packages/Login/index' });
    // }
  }
  //  else {
  //   console.log('No token found');
  // }
};

export default initializing;
