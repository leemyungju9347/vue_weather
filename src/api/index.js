import axios from 'axios';

const config = {
  baseUrl: 'https://api.openweathermap.org/data/2.5/weather?', // 현재 날씨를 출력해주는 url
  weeklyUrl: 'https://api.openweathermap.org/data/2.5/onecall?lat=', // 일주일간 날씨를 출력해주는 url
  fiveDaysUrl: 'https://api.openweathermap.org/data/2.5/forecast?q=',
  myKeyValue: 'e9bddd582ebeafb67b70af6a1ce5a3c5'
};

// 현재 날씨 데이터
function currentWeather(cityName) {
  return axios.get(
    `${config.baseUrl}${cityName}&appid=${config.myKeyValue}&units=metric`
  ); // &units=metric를 붙여주면 섭씨온도로 바꿔줌
}

// 주간 날씨 데이터
function weeklyWeather(location) {
  return axios.get(
    `${config.weeklyUrl}${location.lat}&lon=${location.lon}&appid=${config.myKeyValue}&units=metric`
  );
}

// 5일 3시간
function fiveDaysWeather(cityName) {
  return axios.get(
    `${config.fiveDaysUrl}${cityName}&appid=${config.myKeyValue}&units=metric`
  );
}

export { currentWeather, weeklyWeather, fiveDaysWeather };
