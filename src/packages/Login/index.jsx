import Taro, { useState } from '@tarojs/taro';
import JSEncrypt from 'wx-jsencrypt';
import { View, Text, Button, Input, Form, Image } from '@tarojs/components';
import Wale from '../../assets/images/img-background-wale.jpg';
import { setStorage } from '../../utils/storage';
import { PUBLIC_KEY } from '../../config/index';
import { login } from '../../api/user';
import theme from '../../assets/theme';
import './style.scss';

const jsencrypt = new JSEncrypt();
jsencrypt.setPublicKey(PUBLIC_KEY);

export default function Index() {
  Index.config = {
    navigationStyle: 'custom',
  };

  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const {
    screenHeight,
    screenWidth,
    statusBarHeight,
    windowHeight,
  } = Taro.getSystemInfoSync();

  const onSubmit = async () => {
    try {
      setLoading(true);
      const { data: token } = await login({
        username,
        password,
        encrypted: encodeURIComponent(jsencrypt.encrypt(password)),
      });
      setStorage('token', token);
      setStorage('username', username);
      setStorage('password', password);
      Taro.switchTab({
        url: '/pages/Home/index',
      });
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <View>
      <View className="background-wrapper">
        <Image
          mode="aspectFill"
          src={Wale}
          style={{
            minHeight: `${screenHeight}px`,
            minWidth: `${screenWidth}px`,
          }}
        />
      </View>
      <View style={{ paddingTop: `${statusBarHeight}px` }}>
        <View className="title-wrapper">
          <View className="title">
            <Text>Hello Ocean</Text>
          </View>
          <View className="sub-title">
            <Text>请使用信息门户账号登录</Text>
          </View>
        </View>
        <View className="form-wrapper">
          <Form>
            <View className="form-item">
              <Input
                type="number"
                className="input"
                placeholder="Username"
                value={username}
                style={{
                  borderColor: theme['color-theme-lighter'],
                  color: '#fff',
                }}
                placeholderClass="input-placeholder"
                onInput={e => {
                  setUsername(e.detail.value);
                }}
              />
            </View>
            <View className="form-item">
              <Input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                style={{
                  borderColor: theme['color-theme-lighter'],
                  color: '#fff',
                }}
                placeholderClass="input-placeholder"
                onInput={e => {
                  setPassword(e.detail.value);
                }}
              />
            </View>
            <View className="form-item">
              <Button
                type="primary"
                className="flex-sub margin-top"
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
