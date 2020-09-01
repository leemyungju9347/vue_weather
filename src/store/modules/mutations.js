export default {
  SET_WEATHER(state, data) {
    state.weatherData = data;
    state.weatherMain = data.main;
    state.weatherInfo = data.weather[0];
    state.location.lat = data.coord.lat;
    state.location.lon = data.coord.lon;
    state.currentCity = data.name;
    state.sunrise = data.sys.sunrise;
    state.sunset = data.sys.sunset;
    state.currentTime = data.dt;
  },
  SET_CITY(state, city) {
    state.city = city;
  },
  SET_WEEKLY(state, data) {
    state.weekly = data;
    state.weeklyData = data.daily;
    state.timezone = data.timezone;
  },
  SET_DAY(state, data) {
    state.dayStatus = data;
  }
};
