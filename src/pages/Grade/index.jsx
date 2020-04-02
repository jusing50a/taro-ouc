import Taro, { useMemo } from '@tarojs/taro';
import { View, Text, Picker } from '@tarojs/components';
import { useFetch } from '../../utils';
import { getGrades } from '../../api';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import Empty from '../../components/Empty';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 6 }, (_, index) => ({
  id: currentYear - index,
  title: `${currentYear - index} - ${currentYear - index + 1} 学年`,
}));
const semesters = [
  { id: 1, title: '秋季学期' },
  { id: 2, title: '春季学期' },
  { id: 3, title: '夏季学期' },
];

export default function Index() {
  Index.config = {
    navigationBarTitleText: '成绩信息',
  };

  const initializeDefaultQuery = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = month > 5 ? date.getFullYear() : date.getFullYear() - 1;
    const semester = month > 8 || month < 3 ? 1 : month < 8 ? 2 : 3;
    return {
      year,
      semester,
    };
  };

  const {
    data: grades,
    query: gradesQuery,
    isError: isGradesError,
    isLoading: isGradesLoading,
    setQuery: setGradesQuery,
  } = useFetch(initializeDefaultQuery(), getGrades);

  const initialIndex = (() => {
    const { year, semester } = gradesQuery;
    const yearIndex = years.findIndex(item => item.id === year);
    const semesterIndex = semesters.findIndex(item => item.id === semester);
    return [yearIndex, semesterIndex];
  })();

  const queryString = useMemo(() => {
    const { year, semester } = gradesQuery;
    const yearTitle = years.find(item => item.id === year).title;
    const semesterTitle = semesters.find(item => item.id === semester).title;
    return `${yearTitle} - ${semesterTitle}`;
  }, [gradesQuery]);

  const onCourseClick = item => {
    const detail = encodeURIComponent(JSON.stringify(item));
    Taro.navigateTo({ url: `/pages/Grade/Detail/index?detail=${detail}` });
  };

  const onChange = e => {
    const [yearIndex, semesterIndex] = e.detail.value;
    const year = years[yearIndex].id;
    const semester = semesters[semesterIndex].id;
    setGradesQuery({ year, semester });
  };

  return (
    <View>
      <View className="overflow-hidden radius margin shadow-card box">
        <View className="cu-form-group padding-lr">
          <Picker
            rangeKey="title"
            mode="multiSelector"
            className="margin-lr"
            value={initialIndex}
            range={[[...years], [...semesters]]}
            onChange={onChange}
          >
            <View className="picker" style="text-align: center">
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
                <View className="cu-avatar">
                  <Text>{index + 1}</Text>
                </View>
                <View className="content">
                  <Text className="text-gray">{item.course}</Text>
                </View>
                <View className="action text-gray text-xs margin-right-xs">
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
