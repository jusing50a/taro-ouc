import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import theme from '../../assets/theme';
import svg from '../../assets/images/icon-component-empty.svg';

export default function(props) {
  const { text = '这里空空如也' } = props;
  return (
    <View style="background: #fff; padding: 0 100rpx 50rpx; text-align: center;">
      <Image src={svg} style="width: 100%" />
      <Text style={{ color: theme['color-theme-light'] }}>{text}</Text>
    </View>
  );
}
