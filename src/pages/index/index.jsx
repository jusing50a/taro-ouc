import Taro, { useState } from '@tarojs/taro';
import JSEncrypt from 'wx-jsencrypt';
import { View, Text, Input, Button } from '@tarojs/components';
import { PUBLIC_KEY } from '../../config/index';
import { userLogin } from '../../api/user';
import './index.less';

const jsencrypt = new JSEncrypt();
jsencrypt.setPublicKey(PUBLIC_KEY);

export default function Index() {
  Index.config = {
    navigationBarTitleText: '首页',
  };

  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const onSubmit = () => {
    userLogin({
      username,
      password,
      encrypted: encodeURIComponent(jsencrypt.encrypt(password)),
    });
  };

  return (
    <View className="index">
      <View className="item">
        <Text>用户名：</Text>
        <Input
          value={username}
          onInput={e => {
            setUsername(e.detail.value);
          }}
        />
      </View>
      <View className="item">
        <Text>密码：</Text>
        <Input
          type="password"
          value={password}
          onInput={e => {
            setPassword(e.detail.value);
          }}
        />
      </View>
      <View>
        <Button onClick={onSubmit}>提交</Button>
      </View>
    </View>
  );
}
