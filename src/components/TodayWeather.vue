<template>
  <!-- 오늘의 날씨 -->
  <div v-bind="dayStatusControl()" class="today-weather">
    <div
      class="today-weather-cont"
      v-if="weatherData && weatherMain && weatherInfo"
    >
      <h3 class="cur-location">
        <i class="fas fa-map-marker-alt"></i>
        {{ weatherData.name }} , {{ weatherData.sys.country }}
      </h3>
      <p class="date">{{ localCurrentDate(timezone) }}</p>
      <!-- 간단한 날씨 정보 -->
      <div class="weather-info">
        <div class="summary-weather">
          <i
            class="icon wi main-icon"
            :class="`wi-owm-${dayStatus}-${weatherInfo.id}`"
          ></i>
          <p class="wther-txt">
            <strong class="temp">{{ weatherMain.temp }} °C</strong>
            <strong class="weather-desc">{{ weatherInfo.description }}</strong>
          </p>
        </div>
        <!-- 자세한 날씨 정보 -->
        <ul class="detail-weather">
          <li>
            <i class="wi wi-direction-up"></i>
            <span>max</span>
            {{ weatherMain.temp_max }} °C
          </li>
          <li>
            <i class="wi wi-direction-down"></i>
            <span>min</span>
            {{ weatherMain.temp_min }} °C
          </li>
          <li>
            <i class="wi wi-humidity"></i>
            <span>humidity</span>
            {{ weatherMain.humidity }} %
          </li>
          <li>
            <i class="wi wi-strong-wind"></i>
            <span>wind</span>
            {{ weatherData.wind.speed }} m/s
          </li>
          <li>
            <i class="wi wi-sunrise"></i>
            <span>sunrise</span>
            {{ dayTimeSet(sunrise, timezone, true) }}
          </li>
          <li>
            <i class="wi wi-sunset"></i>
            <span>sunset</span>
            {{ dayTimeSet(sunset, timezone, true) }}
          </li>
        </ul>
      </div>
    </div>
    <div class="warning" v-else>
      <p>
        <i class="warning-icon fas fa-exclamation-circle"></i>{{ logMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import {
  currentTimeFormat,
  dayTimeSetting,
  localDateFormat,
  localCurrentDateFormat
} from '@/utils/dateFilters';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      // 현재 위치
      location: {
        lat: null,
        lon: null
      },
      logMessage: ''
    };
  },
  computed: {
    // state
    ...mapState([
      'weatherData',
      'weatherInfo',
      'weatherMain',
      'currentCity',
      'timezone',
      'dayStatus',
      'sunset',
      'sunrise',
      'currentTime'
    ]),
    // getters
    ...mapGetters(['timeCondition'])
    //init logmessage
  },
  async created() {
    try {
      // 페이지 첫 로드시 현재 위치의 날씨 정보 함수 호출
      await this.currentLocation();
    } catch (err) {
      console.log('TodayWeather.vue created에서 에러남', err);
    }
  },
  mounted() {},
  methods: {
    ...mapActions(['FETCH_WEATHER', 'FETCH_WEEKLY_WEATHER']),
    localCurrentDate(timezone) {
      return localCurrentDateFormat(timezone);
    },
    // 현재 위치 파악하는 함수
    async currentLocation() {
      // 위치정보가 있으면
      if (navigator.geolocation) {
        // 현재 위치 불러오기
        await navigator.geolocation.getCurrentPosition(position => {
          this.location.lat = position.coords.latitude;
          this.location.lon = position.coords.longitude;
          // console.log('액션스 팻치웨더', this.FETCH_WEATHER());
          // 현재 날씨 위도 경도
          this.FETCH_WEATHER(
            `lat=${this.location.lat}&lon=${this.location.lon}`
          );
          this.FETCH_WEEKLY_WEATHER(this.location);
          // 주간 날씨 위도 경도
          this.logMessage = '';
        }, this.showError);
      } else {
        this.logMessage = 'GPS를 지원하지 않습니다.';
      }
    },
    // 날짜 출력 함수
    todayForm(date, timezone) {
      return localDateFormat(date, timezone);
    },
    // GPS 에러처리
    showError(error) {
      console.log('에러발생', error);
      if (error.code == 1) {
        this.logMessage = '위치 정보를 찾아올 수 없습니다. GPS를 허용해주세요.';
      } else {
        this.logMessage = '위치 정보 찾기를 실패했습니다.';
      }
    },
    // 새로고침이벤트
    async DataRefreshEvent() {
      console.log('refresh 이벤트 테스트중');
      await this.$store.dispatch('FETCH_WEATHER', `q=${this.currentCity}`);
      // await this.$store.dispatch('FETCH_WEEKLY_WEATHER',this.weeklyLocation)
    },
    // 현재시간
    currentTimeForm() {
      return currentTimeFormat(new Date());
    },
    // 일출, 일몰 시간 현지 시간에 맞게 출력
    dayTimeSet(date, timezone, position) {
      return dayTimeSetting(date, timezone, position);
    },
    // 낮, 밤 제어
    // getters를 이용??
    dayStatusControl() {
      if (this.timeCondition) {
        const current = dayTimeSetting(this.currentTime, this.timezone, false);
        const sunrise = dayTimeSetting(this.sunrise, this.timezone, false);
        const sunset = dayTimeSetting(this.sunset, this.timezone, false);

        if (current > sunset || current < sunrise) {
          this.$store.commit('SET_DAY', 'night');
        } else {
          this.$store.commit('SET_DAY', 'day');
        }
      }
    }
  }
};
</script>

<style></style>
