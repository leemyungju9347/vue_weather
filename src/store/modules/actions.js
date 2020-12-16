import { currentWeather, weeklyWeather } from '@/api/index';
import bus from '@/utils/bus';

let errMessage = '';

export default {
  async FETCH_WEATHER({ commit }, payload) {
    try {
      const response = await currentWeather(payload);
      console.log(response);
      commit('SET_WEATHER', await response.data);
      errMessage = '';
      return response;
      // 에러처리
    } catch (error) {
      if (error) {
        const errCode = error.request.status;
        if (errCode === 404) {
          errMessage = '잘못된 정보입니다. 다시 입력해주세요.';
        } else {
          errMessage = '검색어를 다시 확인해주세요.';
        }
      }

      bus.$emit('show:toast', errMessage);
    }
  },
  // 주간 날씨 데이터
  async FETCH_WEEKLY_WEATHER({ commit }, payload) {
    try {
      const response = await weeklyWeather(payload);

      commit('SET_WEEKLY', await response.data);
      return response;
      // 컴포넌트에서 에러처리 했기때문에 리턴
    } catch (error) {
      return false;
    }
  }
};
