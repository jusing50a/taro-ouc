import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

export default function Index() {
  Index.config = {
    navigationBarTitleText: '选课详情',
  };

  const { detail } = this.$router.params;
  const data = detail ? JSON.parse(decodeURIComponent(detail)) : {};

  return (
    <View className="margin radius bg-white overflow-hidden">
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
            <Text className="text-basic">总学时</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.hours}</Text>
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
            <Text className="text-basic">权重分</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.weight}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-basic">选课状态</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.status}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-basic">选课时间</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.createTime}</Text>
          </View>
        </View>
        <View className="cu-item">
          <View className="content mw-200">
            <Text className="text-basic">提交人</Text>
          </View>
          <View className="action">
            <Text className="text-basic-light">{data.committer}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
