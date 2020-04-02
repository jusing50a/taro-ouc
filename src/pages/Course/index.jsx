import Taro, { useMemo } from '@tarojs/taro';
import { View, Text, Picker } from '@tarojs/components';
import { useFetch } from '../../utils';
import { getCourses } from '../../api';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import Empty from '../../components/Empty';

const date = new Date();
const month = date.getMonth() + 1;
const currentYear = month > 5 ? date.getFullYear() : date.getFullYear() - 1;
const currentSemester = month > 8 || month < 3 ? 1 : month < 8 ? 2 : 3;

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
    navigationBarTitleText: '选课信息',
  };

  const {
    data: courses,
    query: coursesQuery,
    isError: isCoursesError,
    isLoading: isCoursesLoading,
    setQuery: setCoursesQuery,
  } = useFetch({ year: currentYear, semester: currentSemester }, getCourses);

  const initialIndex = (() => {
    const { year, semester } = coursesQuery;
    const yearIndex = years.findIndex(item => item.id === year);
    const semesterIndex = semesters.findIndex(item => item.id === semester);
    return [yearIndex, semesterIndex];
  })();

  const queryString = useMemo(() => {
    const { year, semester } = coursesQuery;
    const yearTitle = years.find(item => item.id === year).title;
    const semesterTitle = semesters.find(item => item.id === semester).title;
    return `${yearTitle} - ${semesterTitle}`;
  }, [coursesQuery]);

  const onCourseClick = item => {
    const detail = encodeURIComponent(JSON.stringify(item));
    Taro.navigateTo({ url: `/pages/Course/Detail/index?detail=${detail}` });
  };

  const onChange = e => {
    const [yearIndex, semesterIndex] = e.detail.value;
    const year = years[yearIndex].id;
    const semester = semesters[semesterIndex].id;
    setCoursesQuery({ year, semester });
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
        {isCoursesError ? (
          <Error
            onClick={() => {
              setCoursesQuery({ ...coursesQuery });
            }}
          />
        ) : isCoursesLoading && !courses.length ? (
          <Loading />
        ) : !courses.length ? (
          <Empty />
        ) : (
          <View className="cu-list menu-avatar">
            {courses.map((item, index) => (
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
                  <Text>{item.lecturer}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
