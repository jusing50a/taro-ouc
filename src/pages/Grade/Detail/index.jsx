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
            <Text className="text-basic">学分</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.credit}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-basic">课程类别</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.courseType}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-basic">修读性质</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.takingType}</Text>
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
            <Text className="text-basic">综合成绩</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.grade}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-basic">取得学分</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.gradePoint}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-basic">取得方式</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.fulfillType}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
