import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

export default function Index() {
  Index.config = {
    navigationBarTitleText: '选课详情',
  };

  const { detail } = this.$router.params;
  const data = detail ? JSON.parse(decodeURIComponent(detail)) : {};

  return (
    <View class="margin radius bg-white overflow-hidden">
      <View className="cu-list menu">
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-grey">课程名</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.course}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-grey">修读性质</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.courseType}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-grey">学分</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.credit}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-grey">统考方式</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.uniExamType}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-grey">考核方式</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.examType}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-grey">考试时间</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.duration}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-grey">教室</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.classroom}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-grey">座位号</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.seat}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
