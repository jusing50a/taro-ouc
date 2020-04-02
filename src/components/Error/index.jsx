import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import theme from '../../assets/theme';
import svg from '../../assets/images/icon-component-error.svg';

export default function(props) {
  const {
    text = '请求出现错误，请检查网络后点击重试',
    onClick = () => {},
  } = props;
  return (
    <View
      style="background: #fff; padding: 0 100rpx 50rpx; text-align: center;"
      onClick={onClick}
    >
      <Image src={svg} style="width: 100%" />
      <Text style={{ color: theme['color-theme-light'] }}>{text}</Text>
    </View>
  );
}
