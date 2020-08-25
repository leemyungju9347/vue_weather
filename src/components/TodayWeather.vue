<template>
  <div class="today-weather" v-if="weatherData && weatherMain && weatherInfo">
    <!-- 간단한 날씨 정보 -->
    <div class="summary-weather">
      <!-- 도시, 날짜 -->
      <h3>
        <i class="fas fa-map-marker-alt"></i>
        {{weatherData.name}} , {{ weatherData.sys.country }}
        </h3>
      <p class="date">{{ todayFormat(weatherData.dt) }}</p>
      <!-- 날씨정보 -->
      <div class="weather-info">
        <i class="wi main-icon" :class="`wi-owm-${weatherInfo.id}`"></i>
        <strong class="temp">{{ weatherMain.temp }} °C</strong>
        <strong class="weather-desc">{{ weatherInfo.main }}</strong>
      </div> 
    </div>
    <!-- 자세한 날씨 정보 -->
    <ul class="detail-weather">
      <li><i class="wi wi-direction-up"></i>{{ weatherMain.temp_max }} °C</li>
      <li><i class="wi wi-direction-down"></i>{{ weatherMain.temp_min }} °C</li>
      <li><i class="wi wi-humidity"></i>{{ weatherMain.humidity }} %</li>
      <li><i class="wi wi-strong-wind"></i>{{ weatherData.wind.speed }} m/s</li>
      <li><i class="wi wi-sunrise"></i>{{ sysFormat(weatherData.sys.sunrise) }}</li>
      <li><i class="wi wi-sunset"></i>{{ sysFormat(weatherData.sys.sunset) }}</li>
    </ul>
  </div>
</template>

<script>
import {dateFormat,sysDateFormat} from '@/utils/filters'
export default {
  data() {
    return {
      // 현재 위치
      location:{
        lat:null,
        lon:null
      }
    }
  },
  computed:{
    weatherData(){
      return this.$store.state.weatherData
    },
    weatherInfo(){
      return this.$store.state.weatherInfo
    },
    weatherMain(){
      return this.$store.state.weatherMain
    },
    
  },
  async created(){ 
    try{
      // 페이지 첫 로드시 현재 위치의 날씨 정보 함수 호출
      await this.currentLocation()
    } catch (err) {
      console.log('TodayWeather.vue created에서 에러남',err);
    }
  },
  methods:{
    // 현재 위치 파악하는 함수
    async currentLocation(){
      // 위치정보가 있으면
      if(navigator.geolocation){
        await navigator.geolocation.getCurrentPosition(position=>{
          this.location.lat = position.coords.latitude
          this.location.lon = position.coords.longitude
          // 현재 날씨 위도 경도
          this.$store.dispatch('FETCH_WEATHER',`lat=${this.location.lat}&lon=${this.location.lon}`) 
          // 주간 날씨 위도 경도 
          this.$store.dispatch('FETCH_WEEKLY_WEATHER',this.location)

        })

        // 위치정보가 없을때 에러처리 해줄것
        // 1. 초기값 서울/한국의 위치정보를 저장해놓고 출력하도록
        // 2. 인풋값이 입력되면 출력하도록
      }else{
        console.log('위치 정보가 없어요!!');
        
      }
    },
    // 날짜 출력 함수
    todayFormat(date){
      return dateFormat(date)
    },
    sysFormat(date){
      return sysDateFormat(date)
    }
  }
}
</script>

<style>
</style>