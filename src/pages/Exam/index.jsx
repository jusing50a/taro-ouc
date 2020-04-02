import Taro, { useMemo } from '@tarojs/taro';
import { View, Text, Picker } from '@tarojs/components';
import { useFetch } from '../../utils';
import { getExams } from '../../api';
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

const periods = [
  { id: 3, title: '期末考试' },
  { id: 2, title: '期中考试' },
];

export default function Index() {
  Index.config = {
    navigationBarTitleText: '考试信息',
  };

  const initializeDefaultQuery = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = month > 5 ? date.getFullYear() : date.getFullYear() - 1;
    const semester = month > 8 || month < 3 ? 1 : month < 8 ? 2 : 3;
    const period = 3;
    return {
      year,
      semester,
      period,
    };
  };

  const {
    data: exams,
    query: examsQuery,
    isError: isExamsError,
    isLoading: isExamsLoading,
    setQuery: setExamsQuery,
  } = useFetch(initializeDefaultQuery(), getExams);

  const initialIndex = (() => {
    const { year, semester, period } = examsQuery;
    const yearIndex = years.findIndex(item => item.id === year);
    const semesterIndex = semesters.findIndex(item => item.id === semester);
    const periodIndex = periods.findIndex(item => item.id === period);
    return [yearIndex, semesterIndex, periodIndex];
  })();

  const queryString = useMemo(() => {
    const { year, semester, period } = examsQuery;
    const yearTitle = years.find(item => item.id === year).title;
    const semesterTitle = semesters.find(item => item.id === semester).title;
    const periodTitle = periods.find(item => item.id === period).title;
    return `${yearTitle} - ${semesterTitle} - ${periodTitle}`;
  }, [examsQuery]);

  const onChange = e => {
    const [yearIndex, semesterIndex, periodIndex] = e.detail.value;
    const year = years[yearIndex].id;
    const semester = semesters[semesterIndex].id;
    const period = periods[periodIndex].id;
    setExamsQuery({ year, semester, period });
  };

  const onExamClick = item => {
    const detail = encodeURIComponent(JSON.stringify(item));
    Taro.navigateTo({ url: `/pages/Exam/Detail/index?detail=${detail}` });
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
            range={[[...years], [...semesters], [...periods]]}
            onChange={onChange}
          >
            <View className="picker" style="text-align: center">
              {queryString}
            </View>
          </Picker>
        </View>
      </View>
      <View className="overflow-hidden radius margin shadow-card">
        {isExamsError ? (
          <Error
            onClick={() => {
              setExamsQuery({ ...examsQuery });
            }}
          />
        ) : isExamsLoading && !exams.length ? (
          <Loading />
        ) : !exams.length ? (
          <Empty />
        ) : (
          <View className="cu-list menu-avatar">
            {exams.map((item, index) => (
              <View
                className="cu-item"
                key={item.id}
                onClick={() => {
                  onExamClick(item);
                }}
              >
                <View className="cu-avatar">
                  <Text>{index + 1}</Text>
                </View>
                <View className="content">
                  <Text className="text-gray">{item.course}</Text>
                </View>
                <View className="action text-gray text-xs margin-right-xs">
                  <Text>{item.examType}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
