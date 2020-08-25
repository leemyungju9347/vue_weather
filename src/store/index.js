import Vue from 'vue'
import Vuex from 'vuex'
import {currentWeather,weeklyWeather} from '@/api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 검색 도시
    city:'',
    // 현재 날씨 데이터
    weatherData:[],
    weatherMain:null,
    weatherInfo:null,
    // 위치
    location:{
      lat:null,
      lon:null
    },
    // 주간 날씨 데이터
    weeklyData:[],
    weekly:[],
    timezone:''
  },
  mutations: {
    SET_WEATHER(state,data){
      state.weatherData = data;
      state.weatherMain = data.main;
      state.weatherInfo = data.weather[0]
      state.location.lat = data.coord.lat
      state.location.lon = data.coord.lon
    },
    SET_CITY(state,city){
      state.city = city
    },
    SET_WEEKLY(state,data){
      state.weekly = data
      state.weeklyData = data.daily
      state.timezone = data.timezone
    },
  },
  actions: {
    // 현재 날씨 데이터
    async FETCH_WEATHER({commit},cityName){
      try {
        const response = await currentWeather(cityName)

        commit('SET_WEATHER',response.data)

        return response
      } catch (error) {
        console.log('여기는 스토어 fetch weather',error);
      }
      
    },
    // 주간 날씨 데이터
    async FETCH_WEEKLY_WEATHER({commit},location){
      try {
        const response = await weeklyWeather(location)
        
        commit('SET_WEEKLY',response.data)
        return response 

      } catch (error) {
        console.log('여기는 스토어 fetch location',error);
      }
    }
  },
  modules: {
  }
})
