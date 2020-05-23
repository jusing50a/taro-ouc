import Taro from '@tarojs/taro';
import { View, RichText } from '@tarojs/components';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import { useFetch } from '../../../utils/hooks';
import { getSchoolNotificationDetail } from '../../../api/school';

export default function Index() {
  Index.config = {
    navigationBarTitleText: '通知详情',
  };

  const { id } = this.$router.params;
  const { data, isLoading, isError } = useFetch(
    { id },
    getSchoolNotificationDetail
  );

  return (
    <View class="margin radius bg-white overflow-hidden">
      {isError ? (
        <Error />
      ) : isLoading ? (
        <Loading />
      ) : (
        <View
          className="padding padding-bottom-xl"
          style={{ overflow: 'auto' }}
        >
          <RichText
            selectable
            style="word-wrap: break-word; word-break: normal"
            nodes={data}
          />
        </View>
      )}
    </View>
  );
}
