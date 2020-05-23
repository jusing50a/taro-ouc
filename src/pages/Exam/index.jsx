import Taro, { useMemo } from '@tarojs/taro';
import { View, Text, Picker } from '@tarojs/components';
import { useFetch } from '../../utils';
import { getExams } from '../../api';
import store from '../../store';
import {
  YEARS,
  SEMESTERS,
  PERIODS,
  CURRENT_YEAR,
  CURRENT_SEMESTER,
  CURRENT_PERIOD,
} from '../../config';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import Empty from '../../components/Empty';

export default function Index() {
  Index.config = {
    navigationBarTitleText: '考试信息',
  };

  const currentYear = store.state[CURRENT_YEAR];
  const currentSemester = store.state[CURRENT_SEMESTER];
  const currentPeriod = store.state[CURRENT_PERIOD];
  const [years, semesters, periods] = [YEARS, SEMESTERS, PERIODS];

  const {
    data: exams,
    query: examsQuery,
    isError: isExamsError,
    isLoading: isExamsLoading,
    setQuery: setExamsQuery,
  } = useFetch(
    { year: currentYear, semester: currentSemester, period: currentPeriod },
    getExams
  );

  const initialIndex = (() => {
    const { year, semester, period } = examsQuery;
    const yearIndex = years.findIndex(item => item.id === year);
    const semesterIndex = semesters.findIndex(item => item.id === semester);
    const periodIndex = periods.findIndex(item => item.id === period);
    return [yearIndex, semesterIndex, periodIndex];
  })();

  const queryString = useMemo(() => {
    const { year, semester, period } = examsQuery;
    const yearTitle = (years.find(item => item.id === year) || {}).title;
    const semesterTitle = (semesters.find(item => item.id === semester) || {})
      .title;
    const periodTitle = (periods.find(item => item.id === period) || {}).title;
    return `${yearTitle} / ${semesterTitle} / ${periodTitle}`;
  }, [examsQuery, years, semesters, periods]);

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
            className="margin-lr picker-arrow-brand"
            value={initialIndex}
            range={[[...years], [...semesters], [...periods]]}
            onChange={onChange}
          >
            <View className="picker text-basic-dark text-center">
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
                <View className="cu-avatar bg-basic-light">
                  <Text>{index + 1}</Text>
                </View>
                <View className="content">
                  <Text className="text-basic">{item.course}</Text>
                </View>
                <View className="action text-basic-light text-xs margin-right-xs">
                  <Text>{/-(.+) \d+/.exec(item.duration)[1]}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
