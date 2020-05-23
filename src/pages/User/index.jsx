import Taro, { useState, useDidShow } from '@tarojs/taro';
import { View, Text, Button, Image, OpenData } from '@tarojs/components';
import Beach from '../../assets/images/img-background-beach.jpg';
import store from '../../store';
import { TOKEN } from '../../config';
import theme from '../../assets/theme';
import './index.less';

export default function Index() {
  Index.config = {
    navigationBarTitleText: '个人中心',
  };

  const [isLogin, setIsLogin] = useState(false);

  const onGoLogin = () => {
    Taro.navigateTo({ url: '/packages/Login/index' });
  };

  const onLogout = async () => {
    const result = await Taro.showModal({
      title: '提示',
      confirmColor: theme['color-brand'],
      cancelColor: theme['color-theme'],
      content: '确定要退出登录吗？',
    });
    if (result.confirm) {
      await store.Logout();
      Taro.switchTab({ url: '/pages/Home/index' });
    }
  };

  useDidShow(() => {
    if (store.state[TOKEN]) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  return (
    <View>
      <View className="overflow-hidden radius margin shadow-card position-relative">
        <Image src={Beach} className="image" />
        <View className="info">
          <View className="avatar">
            <OpenData type="userAvatarUrl" />
          </View>
          <View className="nickname text-center text-white text-xl margin-top-sm">
            <OpenData type="userNickName" />
          </View>
        </View>
      </View>

      <View class="margin radius bg-white overflow-hidden">
        <View className="cu-list menu">
          <View className="cu-item">
            <View className="content">
              <Button className="text-basic feedback" openType="feedback">
                意见反馈
              </Button>
            </View>
            <View className="action">
              <Text className="cuIcon-right text-brand" />
            </View>
          </View>
          <View className="cu-item">
            <View className="content">
              <Text className="text-basic">关于Hi OUC</Text>
            </View>
            <View className="action">
              <Text className="cuIcon-right text-brand" />
            </View>
          </View>
        </View>
      </View>

      <View className="bottom">
        {isLogin ? (
          <Button
            className="margin bg-basic-light text-white"
            onClick={onLogout}
          >
            退出
          </Button>
        ) : (
          <Button className="margin bg-brand text-white" onClick={onGoLogin}>
            去登录
          </Button>
        )}
      </View>
    </View>
  );
}
