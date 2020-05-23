import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

export default function Index() {
  Index.config = {
    navigationBarTitleText: '考试详情',
  };

  const { detail } = this.$router.params;
  const data = detail ? JSON.parse(decodeURIComponent(detail)) : {};

  return (
    <View class="margin radius bg-white overflow-hidden">
      <View className="cu-list menu">
        <View className="cu-bar bg-white">
          <View className="action border-title">
            <Text className="text-brand text-bold text-xl text-cut margin-right-xxl">
              {data.course}
            </Text>
            <Text class="bg-gradual-brand bg-radius">{data.course}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-basic">修读性质</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.courseType}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-basic">学分</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.credit}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-basic">统考方式</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.uniExamType}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-basic">考核方式</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.examType}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-basic">考试时间</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.duration}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-basic">教室</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.classroom}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-basic">座位号</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.seat}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
