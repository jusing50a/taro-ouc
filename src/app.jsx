import Taro, { Component } from '@tarojs/taro';
import Index from './pages/home';
import './app.scss';

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  config = {
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#e6e9ef',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
    pages: [
      'pages/Home/index',
      'pages/User/index',
      'pages/Notification/index',
      'pages/Notification/Detail/index',
      'pages/Course/index',
      'pages/Course/Detail/index',
      'pages/Schedule/index',
      'pages/Exam/index',
      'pages/Exam/Detail/index',
      'pages/Grade/index',
      'pages/Grade/Detail/index',
      'pages/TrainingProgram/index',
    ],
    subPackages: [
      {
        root: 'packages',
        pages: ['Login/index'],
      },
    ],
    tabBar: {
      color: '#97aab2',
      borderStyle: 'white',
      selectedColor: '#3f5765',
      list: [
        {
          text: 'Home',
          pagePath: 'pages/Home/index',
          iconPath: 'assets/images/icon-tab-alps-negative.png',
          selectedIconPath: 'assets/images/icon-tab-alps-active.png',
        },
        {
          text: 'User',
          pagePath: 'pages/User/index',
          iconPath: 'assets/images/icon-tab-user-negative.png',
          selectedIconPath: 'assets/images/icon-tab-user-active.png',
        },
      ],
    },
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById('app'));
