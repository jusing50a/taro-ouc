import Taro, { useState, useDidShow } from '@tarojs/taro';
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import { getSchoolNotifications } from '../../api';
import { useFetch } from '../../utils';
import { TOKEN } from '../../config';
import store from '../../store';
import theme from '../../assets/theme';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import superMario from '../../assets/images/icon-navigator-super-mario.png';
import anonymousMask from '../../assets/images/icon-navigator-anonymous-mask.png';
import ironMan from '../../assets/images/icon-navigator-iron-man.png';
import scream from '../../assets/images/icon-navigator-scream.png';
import stormtrooper from '../../assets/images/icon-navigator-stormtrooper.png';
import walterWhite from '../../assets/images/icon-navigator-walter-white.png';

const swiperItems = [
  {
    id: 0,
    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
  },
  {
    id: 1,
    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
  },
  {
    id: 2,
    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
  },
  {
    id: 3,
    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
  },
  {
    id: 4,
    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
  },
  {
    id: 5,
    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg',
  },
  {
    id: 6,
    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
  },
];

const navigatorItems = [
  {
    icon: superMario,
    color: '#98d98e',
    title: '选课信息',
    path: '/pages/Course/index',
  },
  {
    icon: anonymousMask,
    color: '#ee836f',
    title: '课表',
    path: '/pages/Schedule/index',
  },
  {
    icon: ironMan,
    color: '#867ba9',
    title: '考试信息',
    path: '/pages/Exam/index',
  },
  {
    icon: scream,
    color: '#f5b199',
    title: '成绩信息',
    path: '/pages/Grade/index',
  },
  {
    icon: walterWhite,
    color: '#489cc1',
    title: '培养方案',
    path: '/pages/TrainingProgram/index',
  },
  {
    icon: stormtrooper,
    color: '#fcc800',
    title: '更多',
  },
];

export default function Index() {
  Index.config = {
    navigationBarTitleText: 'Hi OUC',
  };

  const [currentSwiperIndex, setCurrentSwiperIndex] = useState(0);
  const {
    data: notifications,
    query: notificationsQury,
    isLoading: isNotificationsLoading,
    isError: isNotificationsError,
    setQuery: setNotificationQuery,
  } = useFetch({ page: 1, keywords: '' }, getSchoolNotifications);

  const onCurrentSwiperIndexChange = e => {
    setCurrentSwiperIndex(e.detail.current);
  };

  const onNavigatorItemClick = async path => {
    if (!path) {
      Taro.showModal({
        title: '提示',
        confirmColor: theme['color-brand'],
        cancelColor: theme['color-theme'],
        content: '更多功能需要你来发掘，有好的想法？快联系开发者！',
      });
    } else if (store.state[TOKEN]) {
      Taro.navigateTo({ url: path });
    } else {
      const result = await Taro.showModal({
        title: '提示',
        confirmColor: theme['color-brand'],
        cancelColor: theme['color-theme'],
        content: '您还没有登录，无法使用当前功能。是否立即登录？',
      });
      if (result.confirm) {
        Taro.navigateTo({ url: '/packages/Login/index' });
      }
    }
  };

  const onNotificationClick = id => {
    Taro.navigateTo({ url: `/pages/Notification/Detail/index?id=${id}` });
  };

  const onMoreNotificationsClick = () => {
    Taro.navigateTo({ url: '/pages/Notification/index' });
  };

  useDidShow(() => {
    isNotificationsError && setNotificationQuery({ ...notificationsQury });
  });

  return (
    <View>
      <Swiper
        autoplay
        circular
        className="card-swiper"
        duration={500}
        interval={5000}
        onChange={onCurrentSwiperIndexChange}
      >
        {swiperItems.map(item => (
          <SwiperItem
            key={item.id}
            class={currentSwiperIndex === item.id ? 'cur' : ''}
          >
            <View className="swiper-item radius">
              <Image mode="aspectFill" src={item.url} />
            </View>
          </SwiperItem>
        ))}
      </Swiper>
      <View className="radius overflow-hidden margin-bottom margin-left margin-right cu-list grid col-3 shadow-card">
        {navigatorItems.map(item => (
          <View
            className="cu-item"
            key={item.name}
            onClick={() => {
              onNavigatorItemClick(item.path);
            }}
          >
            <View>
              <Image src={item.icon} style="width: 120rpx; height: 120rpx;" />
            </View>
            <View>
              <Text className="text-basic-dark" style={{ color: item.color }}>
                {item.title}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View className="overflow-hidden radius margin shadow-card">
        <View onClick={onMoreNotificationsClick}>
          <View className="cu-bar bg-white solid-bottom">
            <View className="action">
              <Text className="cuIcon-title text-brand" />
              <Text className="text-basic-dark">教务通知</Text>
            </View>
            <View className="action">
              <Text className="cuIcon-right text-brand" />
            </View>
          </View>
        </View>
        {isNotificationsError ? (
          <Error
            onClick={() => {
              setNotificationQuery({ ...notificationsQury });
            }}
          />
        ) : isNotificationsLoading && !notifications.length ? (
          <Loading />
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
          </View>
        )}
      </View>
    </View>
  );
}
