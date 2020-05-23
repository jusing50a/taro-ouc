import JSEncrypt from 'wx-jsencrypt';
import {
  PUBLIC_KEY,
  TOKEN,
  CURRENT_WEEK,
  CURRENT_SEMESTER,
  CURRENT_YEAR,
  CURRENT_PERIOD,
  USERNAME,
  PASSWORD,
} from '../config';
import {
  getTokenStatus,
  getCurrentSemester,
  getCurrentWeek,
  login,
} from '../api';
import { getStorage, setStorage, clearStorage } from '../utils';

const jsencrypt = new JSEncrypt();
jsencrypt.setPublicKey(PUBLIC_KEY);

class Store {
  state = {
    [TOKEN]: getStorage(TOKEN),
    [CURRENT_WEEK]: undefined,
    [CURRENT_SEMESTER]: undefined,
    [CURRENT_YEAR]: undefined,
    [CURRENT_PERIOD]: '3',
  };
  setToken(token) {
    this.state[TOKEN] = token;
  }
  setCurrentWeek(currentWeek) {
    this.state[CURRENT_WEEK] = currentWeek;
  }
  setCurrentSemester(currentSemester) {
    this.state[CURRENT_SEMESTER] = currentSemester;
  }
  setCurrentYear(currentYear) {
    this.state[CURRENT_YEAR] = currentYear;
  }

  async getTokenStatus() {
    try {
      const {
        data: { status },
      } = await getTokenStatus();
      return status;
    } catch (e) {
      return false;
    }
  }

  async getCurrentWeek() {
    const {
      data: { week },
    } = await getCurrentWeek();
    this.setCurrentWeek(week);
  }

  async getCurrentSemester() {
    const {
      data: { year, semester },
    } = await getCurrentSemester();
    this.setCurrentSemester(semester);
    this.setCurrentYear(year);
  }

  async Login(username, password) {
    console.time('Login');
    await this.Logout();
    const encrypted = encodeURIComponent(jsencrypt.encrypt(password));
    try {
      const {
        data: { token },
      } = await login({
        username,
        password,
        encrypted,
      });
      this.setToken(token);
      setStorage(USERNAME, username);
      setStorage(PASSWORD, password);
      setStorage(TOKEN, token);
      this.getCurrentWeek();
      this.getCurrentSemester();
    } finally {
      console.timeEnd('Login');
    }
  }

  async LoginIfNeeded() {
    const username = getStorage(USERNAME);
    const password = getStorage(PASSWORD);
    const token = getStorage(TOKEN);
    if (username && password && !token) {
      try {
        await this.Login(username, password);
        return true;
      } catch (e) {
        setStorage(USERNAME, undefined);
        setStorage(PASSWORD, undefined);
        return false;
      }
    } else {
      return false;
    }
  }

  async Logout() {
    clearStorage();
    this.setToken(undefined);
    this.setCurrentYear(undefined);
    this.setCurrentSemester(undefined);
    this.setCurrentWeek(undefined);
  }
}

export default new Store();
