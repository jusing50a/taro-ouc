import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

export default function Index() {
  Index.config = {
    navigationBarTitleText: '成绩详情',
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
            <Text className="text-grey">学分</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.credit}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-grey">课程类别</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.courseType}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-grey">修读性质</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.takingType}</Text>
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
            <Text className="text-grey">综合成绩</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.grade}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-grey">取得学分</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.gradePoint}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-grey">取得方式</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.fulfillType}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
