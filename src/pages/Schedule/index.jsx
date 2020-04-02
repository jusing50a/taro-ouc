import Taro, {
  useState,
  useMemo,
  useLayoutEffect,
  createSelectorQuery,
} from '@tarojs/taro';
import { View, Text, Picker, Swiper, SwiperItem } from '@tarojs/components';
import { useFetch } from '../../utils/hooks';
import { getSchedules } from '../../api/user';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import Empty from '../../components/Empty';

const weeks = Array.from({ length: 17 }, (_, index) => ({
  id: index + 1,
  title: `第 ${index + 1} 周`,
}));

export default function Index() {
  Index.config = {
    navigationBarTitleText: '课表信息',
  };

  const intialSwiperItemIndex = ((day, hour) => {
    if (day === 0) return 6;
    if (hour < 20) return day - 1;
    return day;
  })(new Date().getDay(), new Date().getHours());

  const query = createSelectorQuery();
  const [swiperHeight, setSwiperHeight] = useState(2000);

  const {
    data: schedules,
    query: schedulesQuery,
    isError: isSchedulesError,
    isLoading: isSchedulesLoading,
    setQuery: setSchedulesQuery,
  } = useFetch({ week: 1 }, getSchedules);

  const week = useMemo(() => {
    return weeks.find(item => item.id === schedulesQuery.week).title;
  }, [schedulesQuery]);

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
            className="margin-lr"
            range={weeks}
            value={weeks.findIndex(item => item.id === schedulesQuery.week)}
            onChange={onChange}
          >
            <View className="picker" style="text-align: center">
              {week}
            </View>
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
                    <View className="cu-time">{perDay.week}</View>
                    {perDay.schedules.some(item => item.title) ? (
                      perDay.schedules.map(item => (
                        <View className="cu-item text-cyan" key={item.id}>
                          <View className="content">
                            <View className="cu-capsule radius flex justify-between">
                              <View>
                                <Text className="cu-tag bg-cyan">
                                  {item.tag}
                                </Text>
                                <Text className="cu-tag line-cyan">
                                  {item.duration}
                                </Text>
                              </View>
                              <View>
                                <Text className="cu-tag line-cyan">
                                  {item.classroom}
                                </Text>
                              </View>
                            </View>
                            <View className="margin-top text-gray">
                              {item.title}
                            </View>
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
