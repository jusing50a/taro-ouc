import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text, Button, Input, Form, Image } from '@tarojs/components';
import Whale from '../../assets/images/img-background-whale.jpg';
import store from '../../store';
import './style.scss';

export default function Index() {
  Index.config = {
    navigationStyle: 'custom',
    disableScroll: true,
  };

  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const {
    screenHeight,
    screenWidth,
    statusBarHeight,
  } = Taro.getSystemInfoSync();

  const onSubmit = async () => {
    try {
      setLoading(true);
      await store.Login(username, password);
      Taro.switchTab({
        url: '/pages/Home/index',
      });
    } catch (e) {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  };

  useEffect(() => {
    const tryLogin = async () => {
      setLoading(true);
      const needLogin = await store.LoginIfNeeded();
      if (needLogin) {
        Taro.navigateBack();
      }
      setLoading(false);
    };
    tryLogin();
  }, []);

  return (
    <View className="overflow-hidden">
      <View className="background-wrapper">
        <Image
          mode="aspectFill"
          src={Whale}
          style={{
            minHeight: `${screenHeight}px`,
            minWidth: `${screenWidth}px`,
          }}
        />
      </View>
      <View style={{ paddingTop: `${statusBarHeight}px` }}>
        <View className="title-wrapper">
          <View className="title">
            <Text>Hi OUC</Text>
          </View>
          <View className="sub-title">
            <Text>请使用 my.ouc.edu.cn 账号登录</Text>
          </View>
        </View>
        <View className="form-wrapper">
          <Form>
            <View className="form-item">
              <Input
                type="number"
                placeholder="请输入学号"
                className="input text-white border-basic-lighter"
                placeholderClass="input-placeholder"
                value={username}
                disabled={loading}
                onInput={e => {
                  setUsername(e.detail.value);
                }}
              />
            </View>
            <View className="form-item">
              <Input
                type="password"
                confirmType="go"
                placeholder="请输入信息门户密码"
                className="input text-white border-basic-lighter"
                placeholderClass="input-placeholder"
                value={password}
                disabled={loading}
                onInput={e => {
                  setPassword(e.detail.value);
                }}
                onConfirm={onSubmit}
              />
            </View>
            <View className="form-item">
              <Button
                type="primary"
                className="flex-sub margin-top-xl text-white bg-brand"
                loading={loading}
                disabled={loading}
                onClick={onSubmit}
              >
                登录
              </Button>
            </View>
          </Form>
        </View>
      </View>
    </View>
  );
}
