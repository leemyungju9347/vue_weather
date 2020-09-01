export default {
  weeklyDataCheck(state) {
    return state.weeklyData.length !== 0;
  },
  timeCondition(state) {
    return state.currentTime && state.sunrise && state.sunset;
  }
};
