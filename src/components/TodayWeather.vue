<template>
  <div class="today-weather">
    <h2>오늘의 날씨</h2>
    <strong>{{weatherData}}</strong>
    <h3><i class="fas fa-map-marker-alt"></i>{{weatherData.name}}</h3>
  </div>
</template>

<script>
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
  }
}
</script>

<style>

</style>