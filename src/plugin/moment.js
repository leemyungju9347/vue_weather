import momentTimezone from 'moment-timezone';
// import Vue from 'vue';

const moment = momentTimezone;
moment.tz.setDefault('Asia/Seoul');

// Vue.use(moment);

export default moment;

// export default {
//   install(Vue, moment) {
//     Vue.prototype.$moment = moment;
//   }
// };
