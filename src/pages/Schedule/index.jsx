import Taro, {
  useState,
  useMemo,
  useLayoutEffect,
  createSelectorQuery,
} from '@tarojs/taro';
import { View, Text, Picker, Swiper, SwiperItem } from '@tarojs/components';
import { useFetch } from '../../utils/hooks';
import { getSchedules } from '../../api/user';
import store from '../../store';
import { CURRENT_WEEK } from '../../config';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import Empty from '../../components/Empty';

export default function Index() {
  Index.config = {
    navigationBarTitleText: '课表信息',
  };

  const weeks = Array.from({ length: 17 }, (_, index) => ({
    id: `${index + 1}`,
    title: `第 ${index + 1} 周`,
  }));

  const intialSwiperItemIndex = ((day, hour) => {
    const dayIndex = hour < 21 ? day - 1 : day;
    return dayIndex < 0 ? 6 : dayIndex;
  })(new Date().getDay(), new Date().getHours());

  const currentWeek = store.state[CURRENT_WEEK];
  const query = createSelectorQuery();
  const [swiperHeight, setSwiperHeight] = useState(2000);

  const {
    data: schedules,
    query: schedulesQuery,
    isError: isSchedulesError,
    isLoading: isSchedulesLoading,
    setQuery: setSchedulesQuery,
  } = useFetch({ week: currentWeek }, getSchedules);

  const week = useMemo(() => {
    return (weeks.find(item => item.id === schedulesQuery.week) || {}).title;
  }, [schedulesQuery, weeks]);

  useLayoutEffect(() => {
    if (swiperHeight !== 2000) return;
    query
      .selectAll('.rect')
      .boundingClientRect(rects => {
        let max = 0;
        for (const { height } of rects) if (height > max) max = height;
        setSwiperHeight(max);
      })
      .exec();
  });

  const onChange = e => {
    const index = e.detail.value;
    const value = weeks[index].id;
    setSchedulesQuery({ week: value });
  };

  return (
    <View>
      <View className="overflow-hidden radius margin shadow-card box">
        <View className="cu-form-group padding-lr">
          <Picker
            rangeKey="title"
            className="margin-lr picker-arrow-brand"
            range={weeks}
            value={weeks.findIndex(item => item.id === schedulesQuery.week)}
            onChange={onChange}
          >
            <View className="picker text-basic-dark text-center">{week}</View>
          </Picker>
        </View>
      </View>
      <View>
        {isSchedulesError ? (
          <View className="overflow-hidden margin radius shadow-card">
            <Error
              onClick={() => {
                setSchedulesQuery({ ...schedulesQuery });
              }}
            />
          </View>
        ) : isSchedulesLoading && !schedules.length ? (
          <View className="overflow-hidden margin radius shadow-card">
            <Loading />
          </View>
        ) : !schedules.length ? (
          <View className="overflow-hidden margin radius shadow-card">
            <Empty />
          </View>
        ) : (
          <Swiper
            style={{ height: `${swiperHeight}px` }}
            current={intialSwiperItemIndex}
          >
            {schedules.map(perDay => (
              <SwiperItem key={perDay.week}>
                <View className="rect padding-bottom">
                  <View className="cu-timeline radius margin-lr shadow-card overflow-hidden">
                    <View className="cu-time text-basic">{perDay.week}</View>
                    {perDay.schedules.some(item => item.title) ? (
                      perDay.schedules.map(item => (
                        <View className="cu-item text-brand" key={item.id}>
                          <View className="content">
                            <View className="cu-capsule radius flex justify-between">
                              <View>
                                <Text
                                  className={[
                                    'cu-tag',
                                    item.title
                                      ? 'bg-brand'
                                      : 'bg-brand-lighter',
                                  ]}
                                >
                                  {`${item.tag} ${item.id}`}
                                </Text>
                                <Text
                                  className={[
                                    'cu-tag',
                                    item.title
                                      ? 'line-brand'
                                      : 'line-brand-lighter',
                                  ]}
                                >
                                  {item.duration}
                                </Text>
                              </View>
                              {item.title && (
                                <View>
                                  <Text className="cu-tag j-tag line-brand">
                                    {item.classroom}
                                  </Text>
                                </View>
                              )}
                            </View>
                            {item.title && (
                              <View className="margin-top text-basic-light">
                                {item.title}
                              </View>
                            )}
                          </View>
                        </View>
                      ))
                    ) : (
                      <Empty text="今天没有课，不如出去兜风？" />
                    )}
                  </View>
                </View>
              </SwiperItem>
            ))}
          </Swiper>
        )}
      </View>
    </View>
  );
}
