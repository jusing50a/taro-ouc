export const REQUEST_PREFIX = 'http://localhost:3001/user';
// export const REQUEST_PREFIX = 'https://mjx.cvoon.com/koa-ouc/user';

export const PUBLIC_KEY =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfy7Co/zbDUegHFoAxuEzAyllnf6dxt50iipCVVns8Vzx6BCJmYEYa6/OlLrhJSB7yW4igfyotKkwsd8lA1d3nP6HWb7s4t2HWTKo/Tcb/LVzUGX9Juz8ifF1tHduAAubJNVlArr21uu1atk9y4K6Um3MKwWw5tQ/bMP4NdYMaRQIDAQAB';

export const YEARS = (year =>
  Array.from({ length: 6 }, (_, index) => ({
    id: `${year - index}`,
    title: `${year - index} - ${year - index + 1} 学年`,
  })))(new Date().getFullYear());

export const SEMESTERS = [
  { id: '2', title: '春季学期' },
  { id: '1', title: '秋季学期' },
  { id: '0', title: '夏季学期' },
];

export const PERIODS = [
  { id: '3', title: '期末考试' },
  { id: '2', title: '期中考试' },
  { id: '1', title: '补考缓考' },
];

export const TOKEN = Symbol('TOKEN');
export const TOKEN_EXPIRED = Symbol('TOKEN_EXPIRED');
export const USERNAME = Symbol('USERNAME');
export const PASSWORD = Symbol('PASSWORD');
export const CURRENT_WEEK = Symbol('CURRENT_WEEK');
export const CURRENT_SEMESTER = Symbol('CURRENT_SEMESTER');
export const CURRENT_YEAR = Symbol('CURRENT_YEAR');
export const CURRENT_PERIOD = Symbol('CURRENT_PERIOD');
