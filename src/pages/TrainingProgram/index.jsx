import Taro, {
  useState,
  useLayoutEffect,
  createSelectorQuery,
} from '@tarojs/taro';
import { View, Text, Swiper, SwiperItem } from '@tarojs/components';
import { useFetch } from '../../utils';
import { getTrainingPrograms } from '../../api';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import Empty from '../../components/Empty';

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
  } = useFetch({}, getTrainingPrograms);

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

  return (
    <View className="margin-top">
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
                <View className="cu-timeline radius margin-lr shadow-card overflow-hidden">
                  <View className="cu-time text-basic">
                    {perSemester.semester}
                  </View>
                  {perSemester.courses.map(item => (
                    <View className="cu-item text-brand" key={item.id}>
                      <View className="content">
                        <View className="cu-capsule radius flex justify-between">
                          <View className="flex-twice text-cut">
                            <Text className="cu-tag bg-brand">
                              {item.courseType}
                            </Text>
                            <Text className="cu-tag line-brand">
                              {`${item.credit}学分`}
                            </Text>
                          </View>
                          <View className="flex-sub text-right overflow-hidden">
                            <Text className="cu-tag j-tag line-brand">
                              {`${item.hours}学时`}
                            </Text>
                          </View>
                        </View>
                        <View className="margin-top text-basic-light">
                          {item.course}
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
  );
}
