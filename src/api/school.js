import { request } from '../utils';

export const getSchoolNotifications = params => {
  return request({
    url: '/schoolNotifications',
    params,
  });
};

export const getSchoolNotificationDetail = ({ id }) => {
  return request({ url: `/schoolNotifications/${id}` });
};
