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
            <Text className="text-grey">总学时</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.hours}</Text>
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
            <Text className="text-grey">权重分</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.weight}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-grey">选课状态</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.status}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-grey">选课时间</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.createTime}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-grey">提交人</Text>
          </View>
          <View className="action">
            <Text className="text-grey">{data.committer}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
