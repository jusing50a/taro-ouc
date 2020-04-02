import { request } from '../utils';

export const login = data =>
  request({
    data,
    url: '/login',
    method: 'post',
  });

export const getUserInfo = () =>
  request({
    url: '/info',
  });

export const getCourses = params =>
  request({
    url: '/courses',
    params,
  });

export const getSchedules = params =>
  request({
    url: '/schedules',
    params,
  });

export const getExams = params =>
  request({
    url: '/exams',
    params,
  });

export const getGrades = params =>
  request({
    url: '/grades',
    params,
  });

export const getTrainingPrograms = () =>
  request({
    url: '/trainingPrograms',
  });
