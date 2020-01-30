import request from '../utils/request';

export const userLogin = data =>
  request({
    data,
    url: '/user/login',
    method: 'post',
  });

export const placeholder = '';
