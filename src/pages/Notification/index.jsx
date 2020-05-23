import Taro from '@tarojs/taro';
import { ScrollView, View, Text, Input, Button } from '@tarojs/components';
import { useFetch } from '../../utils/hooks';
import { getSchoolNotifications } from '../../api/school';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import Empty from '../../components/Empty';

export default function Index() {
  Index.config = {
    navigationBarTitleText: '教务通知',
  };

  let keywordsTemp;

  const {
    data: notifications,
    query: notificationsQuery,
    isError: isNotificationsError,
    isLoading: isNotificationsLoading,
    isDone: isNotificationsDone,
    setQuery: setNotificationQuery,
  } = useFetch({ page: 1, keywords: '' }, getSchoolNotifications, true);

  const onNotificationClick = id => {
    Taro.navigateTo({ url: `/pages/Notification/Detail/index?id=${id}` });
  };

  const onSearch = () => {
    setNotificationQuery({ page: 1, keywords: keywordsTemp });
  };

  const onScrollToLower = () => {
    if (isNotificationsLoading || isNotificationsDone) return;
    setNotificationQuery({
      page: notificationsQuery.page + 1,
      keywords: keywordsTemp,
    });
  };

  return (
    <ScrollView
      scrollY
      className="full-screen"
      lowerThreshold={50}
      onScrollToLower={onScrollToLower}
    >
      <View className="overflow-hidden radius margin shadow-card box">
        <View className="cu-bar search bg-white">
          <View className="search-form round">
            <Text className="cuIcon-search" />
            <Input
              type="text"
              placeholder="搜索教务通知"
              confirmType="search"
              adjustPosition={false}
              placeholderClass="text-basic-light"
              onInput={e => {
                keywordsTemp = e.detail.value;
              }}
            />
          </View>
          <View className="action">
            <Button
              className="cu-btn bg-brand shadow-blur round"
              onClick={onSearch}
            >
              搜索
            </Button>
          </View>
        </View>
      </View>
      <View className="overflow-hidden radius margin shadow-card">
        {isNotificationsError ? (
          <Error onClick={onSearch} />
        ) : isNotificationsLoading && notificationsQuery.page === 1 ? (
          <Loading />
        ) : isNotificationsDone && !notifications.length ? (
          <Empty />
        ) : (
          <View className="cu-list menu-avatar">
            {notifications.map((item, index) => (
              <View
                className="cu-item"
                key={item.id}
                onClick={() => {
                  onNotificationClick(item.id);
                }}
              >
                <View className="cu-avatar bg-basic-light">
                  <Text>{index + 1}</Text>
                </View>
                <View className="content">
                  <Text className="text-basic">{item.title}</Text>
                </View>
                <View className="action text-basic-light text-xs margin-right-xs">
                  <Text>{item.date}</Text>
                </View>
              </View>
            ))}
            {isNotificationsLoading && (
              <View className="cu-load bg-white text-brand-light loading" />
            )}
            {isNotificationsDone && (
              <View className="cu-load bg-white text-brand-light over" />
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
