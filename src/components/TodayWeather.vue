<template>
  <!-- 오늘의 날씨 -->
  <div
    v-bind="dayStatusControl()"
    class="today-weather"
    v-if="weatherData && weatherMain && weatherInfo"
  >
    <!-- 간단한 날씨 정보 -->
    <div class="summary-weather">
      <!-- 도시, 날짜 -->
      <h3>
        <i class="fas fa-map-marker-alt"></i>
        {{ weatherData.name }} , {{ weatherData.sys.country }}
      </h3>
      <!-- 해당 도시의 현재 시간까지 출력하기. -->
      <p class="date">{{ todayForm(currentTime, timezone) }}</p>
      <!-- 날씨정보 -->
      <div class="weather-info">
        <i
          class="icon wi main-icon"
          :class="`wi-owm-${dayStatus}-${weatherInfo.id}`"
        ></i>
        <strong class="temp">{{ weatherMain.temp }} °C</strong>
        <strong class="weather-desc">{{ weatherInfo.description }}</strong>
      </div>
    </div>
    <!-- 자세한 날씨 정보 -->
    <ul class="detail-weather">
      <li class="m-temp">
        <i class="wi wi-direction-up"></i>
        <span>max</span>
        {{ weatherMain.temp_max }} °C
      </li>
      <li class="m-temp">
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
    <!-- 새로고침 기능 보류 -->
    <div class="refresh-weather">
      <p class="refresh-time">{{ currentTimeForm() }}</p>
      <button class="refresh-btn" @click.prevent="DataRefreshEvent()">
        <i class="wi wi-refresh"></i>
      </button>
    </div>
  </div>
  <!-- <div v-else>데이터가 없을때</div> -->
</template>

<script>
import {
  currentTimeFormat,
  dayTimeSetting,
  localDateFormat
} from '@/utils/dateFilters';

export default {
  data() {
    return {
      // 현재 위치
      location: {
        lat: null,
        lon: null
      },
      dayTime: 'day'
    };
  },
  computed: {
    // 날씨 데이터
    weatherData() {
      return this.$store.state.weatherData;
    },
    weatherInfo() {
      return this.$store.state.weatherInfo;
    },
    weatherMain() {
      return this.$store.state.weatherMain;
    },
    // 현재 도시 위치
    currentCity() {
      return this.$store.state.currentCity;
    },
    // 일출 일몰
    sunset() {
      return this.weatherData.sys.sunset;
    },
    sunrise() {
      return this.weatherData.sys.sunrise;
    },
    currentTime() {
      return this.$store.state.weatherData.dt;
    },
    // 현재 국가 위치타임존
    timezone() {
      return this.$store.state.timezone;
    },
    dayStatus() {
      return this.$store.state.dayStatus;
    }
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
    // 현재 위치 파악하는 함수
    async currentLocation() {
      // 위치정보가 있으면
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(position => {
          this.location.lat = position.coords.latitude;
          this.location.lon = position.coords.longitude;

          // 현재 날씨 위도 경도
          this.$store.dispatch(
            'FETCH_WEATHER',
            `lat=${this.location.lat}&lon=${this.location.lon}`
          );
          // 주간 날씨 위도 경도
          this.$store.dispatch('FETCH_WEEKLY_WEATHER', this.location);
        });

        // 위치정보가 없을때 에러처리 해줄것
        // 1. 초기값 서울/한국의 위치정보를 저장해놓고 출력하도록
        // 2. 인풋값이 입력되면 출력하도록
      } else {
        console.log('위치 정보가 없어요!!!');
      }
    },
    // 날짜 출력 함수
    todayForm(date, timezone) {
      return localDateFormat(date, timezone);
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
    dayStatusControl() {
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
};
</script>

<style></style>
