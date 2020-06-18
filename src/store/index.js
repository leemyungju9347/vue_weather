import Vue from 'vue'
import Vuex from 'vuex'
import {weatherApi,weatherweeklyApi,weatherLocationApi,weatherweeklyApi2,weatherFiveDaysApi} from '../api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city:[],
    weeklyWeather:[],
    locationWether:[],
    weeklyWeather2:[],
    fiveDaysWeather:[]
  },
  mutations: {
    SET_WEATHER(state,city){
      state.city = city
    },
    SET_WEEKLY(state,weekly){
      state.weeklyWeather = weekly
    },
    SET_LOCATION(state,locate){
      state.locationWether = locate
    },
    SET_WEEKLY2(state,week){
      state.weeklyWeather2 = week
    },
    SET_FIVEDAY(state,five){
      state.fiveDaysWeather = five
    }
  },
  actions: {
    FETCH_WEATHER(context,cityName){
      return weatherApi(cityName)
      .then(res=>{
        context.commit('SET_WEATHER',res.data)
        
        return res
      })
      .catch(err=>{
          console.log(err);
          
      })
    },
    FETCH_WEEKLY(context,{lat,lon}){
      return weatherweeklyApi(lat,lon)
        .then(res => {
          context.commit('SET_WEEKLY',res.data)

          return res
      })
      .catch(err=>{
        console.log(err);
        
    })
    },
    FETCH_LOWEATHER(context,{lat,lon}){
      return weatherLocationApi(lat,lon)
        .then(res=>{
            context.commit('SET_LOCATION',res.data)

            return res
        })
        .catch(err=>{
          console.log(err);
          
      })
    },
    FETCH_WEEKLY2(context,{lat,lon}){
        return weatherweeklyApi2(lat,lon)
          .then(res=>{
              context.commit('SET_WEEKLY2',res.data)

              return res
          })
          .catch(err=>{
            console.log(err);
            
        })
          
    },
    FETCH_FIVEDAYS(context,cityName){
        return weatherFiveDaysApi(cityName)
          .then(res=>{
              context.commit('SET_FIVEDAY',res.data)

              return res
          })
          .catch(err=>{
            console.log(err);
            
        })
    }

  },
  modules: {
  }
})
