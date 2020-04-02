import Taro, { useState, useDidShow, navigateTo } from '@tarojs/taro';
import { View, Button, OpenData } from '@tarojs/components';
import { getUserInfo } from '../../api/user';
import { getStorage } from '../../utils';
import './index.less';

export default function Index() {
  Index.config = {
    navigationBarTitleText: '个人中心',
  };

  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState(null);

  useDidShow(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (e) {
        Taro.showToast({
          icon: 'error',
          title: e.message,
        });
      }
    };
    if (!userInfo && getStorage('token')) {
      setToken(getStorage('token'));
      fetchData();
    }
  }, []);

  return (
    <View>
      <View className="index-wrapper">
        <View className="content">
          <View className="avatar">
            <OpenData type="userAvatarUrl" />
          </View>
          <View className="nickname">
            <OpenData type="userNickName" />
          </View>
        </View>
        <View className="footer">❤️ oucX ❤️</View>
      </View>
      <View>
        <Button
          className=""
          onClick={() => {
            navigateTo({ url: '/packages/Login/index' });
          }}
        >
          去登录
        </Button>
      </View>
    </View>
  );
}
