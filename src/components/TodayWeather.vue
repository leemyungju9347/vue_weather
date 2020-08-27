<template>
<!-- 오늘의 날씨 -->
  <div class="today-weather" v-if="weatherData && weatherMain && weatherInfo">
    <!-- 간단한 날씨 정보 -->
    <div class="summary-weather">
      <!-- 도시, 날짜 -->
      <h3>
        <i class="fas fa-map-marker-alt"></i>
        {{weatherData.name}} , {{ weatherData.sys.country }}
      </h3>
      <!-- 해당 도시의 현재 시간까지 출력하기. -->
      <p class="date">{{ todayForm(weatherData.dt) }}</p>
      <!-- 날씨정보 -->
      <div class="weather-info">
        <i class="icon wi main-icon" :class="`wi-owm-${dayTime}-${weatherInfo.id}`"></i>
        <strong class="temp">{{ weatherMain.temp }} °C</strong>
        <strong class="weather-desc">{{ weatherInfo.description }}</strong>
      </div> 
    </div>
    <!-- 자세한 날씨 정보 -->
    <ul class="detail-weather">
      <li class="m-temp"><i class="wi wi-direction-up"></i>{{ weatherMain.temp_max }} °C</li>
      <li class="m-temp"><i class="wi wi-direction-down"></i>{{ weatherMain.temp_min }} °C</li>
      <li><i class="wi wi-humidity"></i>{{ weatherMain.humidity }} %</li>
      <li><i class="wi wi-strong-wind"></i>{{ weatherData.wind.speed }} m/s</li>
      <li><i class="wi wi-sunrise"></i>{{ sysTimeForm(weatherData.sys.sunrise) }}</li>
      <li><i class="wi wi-sunset"></i>{{ sysTimeForm(weatherData.sys.sunset) }}</li>
    </ul>
    <!-- 새로고침 기능 보류 -->
    <div class="refresh-weather">
      <p class="refresh-time">{{ currentTimeForm() }}</p>
      <button class="refresh-btn" @click.prevent="DataRefreshEvent()"><i class="wi wi-refresh"></i></button>
    </div>
  </div>
  <div v-else>데이터가 없을때</div>
</template>

<script>
import {todayFormat,timeFormat,currentTimeFormat} from '@/utils/filters'
import moment from 'moment-timezone'
export default {
  data() {
    return {
      // 현재 위치
      location:{
        lat:null,
        lon:null
      },
      dayTime:'day',
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
    currentCity(){
      return this.$store.state.currentCity
    },
    weeklyLocation(){
      return this.$store.state.location
    },
    sunset(){
      return timeFormat(this.weatherData.sys.sunset)
    },
    sunrise(){
      return timeFormat(this.weatherData.sys.sunrise)
    },
    timezone(){
      return this.$store.state.timezone
    }
    // timezone(){
    //   return new Date(this.weatherData.timezone * 1000)
    // },
    // timeSet(){
    //   return new Date(this.weatherData.dt * 1000).toGMTString()
    // },
    // cityTimezone(){
    //   return new Date(this.weatherData.sys.sunset * 1000 + this.weatherData.timezone)
    // },
    // localTimezone(){
    //   return new Date(this.weatherData.dt).getTimeZoneOffset()
    // },
    // timeCalc(){
    //   return new Date(this.weatherData.sys.sunrise * 1000 -(this.weatherData.timezone * 1000))
    // }
  },
  async created(){ 
    try{
      // 페이지 첫 로드시 현재 위치의 날씨 정보 함수 호출
      await this.currentLocation()
    } catch (err) {
      console.log('TodayWeather.vue created에서 에러남',err);
    }
    

    //  var d = moment().tz('America/Toronto');
    //  console.log(d);

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
    todayForm(date){
      return todayFormat(date)
    },
    sysTimeForm(date){
      return timeFormat(date)
    },
    async DataRefreshEvent(){
      console.log('refresh 이벤트 테스트중');
      await this.$store.dispatch('FETCH_WEATHER', `q=${this.currentCity}`)
      // await this.$store.dispatch('FETCH_WEEKLY_WEATHER',this.weeklyLocation)
    },
    // 현재시간
    currentTimeForm(){
      return currentTimeFormat(new Date())
    },
    momentTime(){
      const date = new Date(this.weatherData.sys.sunrise * 1000)
      const sunrise = moment(date).tz(this.timezone).format()

      return sunrise
    },
    daySunset(){
      const date = new Date(this.weatherData.sys.sunset * 1000)
      const sunset = moment(date).tz(this.timezone).format()

      return sunset
    }
    // timezoneOffset(){
    //   // d = new Date()
    //   // localTime = d.getTime()
    //   // localOffset = d.getTimezoneOffset() * 60000
    //   // utc = localTime + localOffset
    //   // var atlanta = utc + (1000 * -14400)
    //   // nd = new Date(atlanta)
    //   let date = new Date()
    //   let localTime = date.getTime() // 현지시간얻기
    //   let localOffset = date.getTimezoneOffset() * 60000 // 로컬 offset
    //   let utc = localTime + localOffset
    //   let city = utc + ( 1000 * this.weatherData.timezone )

    //   let nd = new Date(city)


    //   return nd
    // },
    // offset(){
    //   // let d = new Date(this.weatherData.dt * 1000)
    //   // let utc = d.getTime() + ( this.weatherData.timezone * 60000)

    //   // var nd = new Date(utc + (3600000*this.weatherData.timezone));
    //   // console.log(nd);

    //   const timezone = {
    //     timezone : this.$store.state.timezone
    //   }
    //   const sunset = new Date(this.weatherData.sys.sunrise * 1000).toLocaleString('en',timezone)

    //   let currentUtcTime = new Date(this.weatherData.sys.sunrise * 1000)
    //   const currentDateTimeCentralTimeZone = new Date(currentUtcTime.toLocaleString('en-US',{timezone: 'Europe/London'}));
    //   console.log('시카고',currentDateTimeCentralTimeZone);
    //   // const sunrise = new Date(this.weatherData.sys.sunrise * 1000).toLocaleString('en', { timeZone: city })

    //   // console.log(sunrise);
    //   // console.log(sunset);
    //   console.log(sunset);
    //   return currentDateTimeCentralTimeZone
    // }

    // dayTimeCheck(){
    //   return new Date().sunset(37,127)
    // }
  }
}
</script>

<style>
</style>