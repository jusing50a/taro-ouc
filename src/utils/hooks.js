import { useState, useEffect, useReducer } from '@tarojs/taro';

export const useFetch = (defaultQuery, fetchCallBack, sequenceMode = false) => {
  const [query, setQuery] = useState(defaultQuery);
  const [states, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'FETCH_START':
          return {
            data: sequenceMode ? state.data : [],
            isError: false,
            isLoading: true,
            isDone: false,
          };
        case 'FETCH_SUCCEED':
          return {
            data:
              sequenceMode && action.page !== 1
                ? [...state.data, ...action.payload]
                : action.payload,
            isError: false,
            isLoading: false,
            isDone: !action.payload.length,
          };
        case 'FETCH_ERROR':
          return {
            ...state,
            isLoading: false,
            isError: true,
            isDone: false,
          };
        default:
          return state;
      }
    },
    {
      data: [],
      isError: false,
      isLoading: false,
      isDone: false,
    }
  );
  useEffect(() => {
    const { page } = query;
    const fetchData = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const { data: payload } = await fetchCallBack(query);
        dispatch({ type: 'FETCH_SUCCEED', payload, page });
      } catch (e) {
        setTimeout(() => {
          dispatch({ type: 'FETCH_ERROR' });
        }, 400);
      }
    };
    fetchData();
  }, [query, fetchCallBack]);

  return { query, setQuery, ...states };
};
