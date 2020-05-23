import Taro, { useMemo } from '@tarojs/taro';
import { View, Text, Picker } from '@tarojs/components';
import { useFetch } from '../../utils';
import { getGrades } from '../../api';
import store from '../../store';
import { YEARS, SEMESTERS, CURRENT_YEAR, CURRENT_SEMESTER } from '../../config';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import Empty from '../../components/Empty';

export default function Index() {
  Index.config = {
    navigationBarTitleText: '成绩信息',
  };

  const currentYear = store.state[CURRENT_YEAR];
  const currentSemester = store.state[CURRENT_SEMESTER];
  const [years, semesters] = [YEARS, SEMESTERS];

  const {
    data: grades,
    query: gradesQuery,
    isError: isGradesError,
    isLoading: isGradesLoading,
    setQuery: setGradesQuery,
  } = useFetch({ year: currentYear, semester: currentSemester }, getGrades);

  const initialIndex = (() => {
    const { year, semester } = gradesQuery;
    const yearIndex = years.findIndex(item => item.id === year);
    const semesterIndex = semesters.findIndex(item => item.id === semester);
    return [yearIndex, semesterIndex];
  })();

  const queryString = useMemo(() => {
    const { year, semester } = gradesQuery;
    const yearTitle = (years.find(item => item.id === year) || {}).title;
    const semesterTitle = (semesters.find(item => item.id === semester) || {})
      .title;
    return `${yearTitle} - ${semesterTitle}`;
  }, [gradesQuery, years, semesters]);

  const onChange = e => {
    const [yearIndex, semesterIndex] = e.detail.value;
    const year = years[yearIndex].id;
    const semester = semesters[semesterIndex].id;
    setGradesQuery({ year, semester });
  };

  const onCourseClick = item => {
    const detail = encodeURIComponent(JSON.stringify(item));
    Taro.navigateTo({ url: `/pages/Grade/Detail/index?detail=${detail}` });
  };

  return (
    <View>
      <View className="overflow-hidden radius margin shadow-card box">
        <View className="cu-form-group padding-lr">
          <Picker
            rangeKey="title"
            mode="multiSelector"
            className="margin-lr picker-arrow-brand"
            value={initialIndex}
            range={[[...years], [...semesters]]}
            onChange={onChange}
          >
            <View className="picker text-basic-dark text-center">
              {queryString}
            </View>
          </Picker>
        </View>
      </View>
      <View className="overflow-hidden radius margin shadow-card">
        {isGradesError ? (
          <Error
            onClick={() => {
              setGradesQuery({ ...gradesQuery });
            }}
          />
        ) : isGradesLoading && !grades.length ? (
          <Loading />
        ) : !grades.length ? (
          <Empty />
        ) : (
          <View className="cu-list menu-avatar">
            {grades.map((item, index) => (
              <View
                className="cu-item"
                key={item.id}
                onClick={() => {
                  onCourseClick(item);
                }}
              >
                <View className="cu-avatar bg-basic-light">
                  <Text>{index + 1}</Text>
                </View>
                <View className="content">
                  <Text className="text-basic">{item.course}</Text>
                </View>
                <View className="action text-basic-light text-xs margin-right-xs">
                  <Text>{item.grade}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
