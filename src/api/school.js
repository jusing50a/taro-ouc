import { request } from '../utils';

export const getSchoolNotifications = params => {
  return request({
    url: '/notifications',
    params,
  });
};

export const getSchoolNotificationDetail = ({ id }) => {
  return request({ url: `/notifications/${id}` });
};
