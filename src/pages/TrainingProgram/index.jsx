import Taro, {
  useState,
  useMemo,
  useLayoutEffect,
  createSelectorQuery,
} from '@tarojs/taro';
import { View, Text, Picker, Swiper, SwiperItem } from '@tarojs/components';
import { useFetch } from '../../utils';
import { getTrainingPrograms } from '../../api';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import Empty from '../../components/Empty';

const colleges = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `第 ${index + 1} 专业`,
}));

export default function Index() {
  Index.config = {
    navigationBarTitleText: '培养方案',
  };

  const query = createSelectorQuery();
  const [swiperHeight, setSwiperHeight] = useState(2000);

  const {
    data: trainingPrograms,
    query: trainingProgramsQuery,
    isError: isTrainingProgramsError,
    isLoading: isTrainingProgramsLoading,
    setQuery: setTrainingProgramsQuery,
  } = useFetch({ college: 1 }, getTrainingPrograms);

  const college = useMemo(() => {
    return colleges.find(item => item.id === trainingProgramsQuery.college)
      .title;
  }, [trainingProgramsQuery]);

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
    const value = colleges[index].id;
    setTrainingProgramsQuery({ week: value });
  };

  return (
    <View>
      <View className="overflow-hidden radius margin shadow-card box">
        <View className="cu-form-group padding-lr">
          <Picker
            rangeKey="title"
            className="margin-lr"
            range={colleges}
            value={colleges.findIndex(
              item => item.id === trainingProgramsQuery.college
            )}
            onChange={onChange}
          >
            <View className="picker" style="text-align: center">
              {college}
            </View>
          </Picker>
        </View>
      </View>
      <View>
        {isTrainingProgramsError ? (
          <View className="overflow-hidden margin radius shadow-card">
            <Error
              onClick={() => {
                setTrainingProgramsQuery({ ...trainingProgramsQuery });
              }}
            />
          </View>
        ) : isTrainingProgramsLoading && !trainingPrograms.length ? (
          <View className="overflow-hidden margin radius shadow-card">
            <Loading />
          </View>
        ) : !trainingPrograms.length ? (
          <View className="overflow-hidden margin radius shadow-card">
            <Empty />
          </View>
        ) : (
          <Swiper style={{ height: `${swiperHeight}px` }} current={0}>
            {trainingPrograms.map(perSemester => (
              <SwiperItem key={perSemester.semester}>
                <View className="rect padding-bottom">
                  <View className="cu-timeline radius margin-lr shadow-card">
                    <View className="cu-time">{perSemester.semester}</View>
                    {perSemester.courses.map(item => (
                      <View className="cu-item text-cyan" key={item.id}>
                        <View className="content">
                          <View className="cu-capsule radius flex justify-between">
                            <View>
                              <Text className="cu-tag bg-cyan">{item.tag}</Text>
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
                    ))}
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
