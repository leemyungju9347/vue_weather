import moment from '@/plugin/moment';

// 날짜 형식에 맞게 출력해주는 필터
let monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
let dayNames = [
  'Sunday',
  'MonDay',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

// '요일 날짜 월' 형식의 포맷
function todayFormat(dt) {
  let today = new Date(dt * 1000);
  let month = monthNames[today.getMonth()];
  let day = dayNames[today.getDay()];
  let date = today.getDate();

  return `${day} ${date} ${month}`;
}

function localDateFormat(dt, timezone) {
  const today = new Date(dt * 1000);
  // const date = moment.tz(today,timezone).format('LLLL')
  const date = moment.tz(today, timezone).format('dddd DD MMMM, HH : mm A');

  return date;
}

// '시간 : 분' 형식의 시간 포맷
function timeFormat(dt) {
  let today = new Date(dt * 1000);
  let hours = today.getHours();
  hours = hours >= 10 ? hours : `0${hours}`;
  let minutes = today.getMinutes();
  minutes = minutes >= 10 ? minutes : `0${minutes}`;

  return `${hours} : ${minutes}`;
}

// 요일 포맷
function daysFormat(dt) {
  let today = new Date(dt * 1000);
  let day = dayNames[today.getDay()];

  return day;
}

// '날짜 월' 형식의 포맷
function dateFormat(dt) {
  let today = new Date(dt * 1000);
  let month = monthNames[today.getMonth()];
  let date = today.getDate();
  date = date >= 10 ? date : `0${date}`;

  return `${date} ${month}`;
}

// 현재 시간 포맷
function currentTimeFormat(date) {
  let hours = date.getHours();
  hours = hours >= 10 ? hours : `0${hours}`;
  let minutes = date.getMinutes();
  minutes = minutes >= 10 ? minutes : `0${minutes}`;
  let seconds = date.getSeconds();
  seconds = seconds >= 10 ? seconds : `0${seconds}`;
  return `${date.toDateString()}  ${hours} : ${minutes} : ${seconds}`;
}

// 일출, 일몰 포맷 함수
function dayTimeSetting(date, timezone, position) {
  const today = new Date(date * 1000);
  const dayTimes = moment.tz(today, timezone).format('HH : mm A');
  const dayHours = moment.tz(today, timezone).format('HH');
  // console.log('데이트필터 인 타임존', timezone);
  // console.log('데이트필터😋', dayHours);
  return position ? dayTimes : dayHours;
}

// 늦게로드되길래 store에서 직접 호출했으나 똑같았음 일단 주석처리
// function sunriseCheck() {
//     const sunrise = store.state.sunrise;
//     const timezone = store.state.timezone;
//     const today = new Date(sunrise * 1000);
//     const dayTime = moment.tz(today,timezone).format('HH : mm')

//     return dayTime
// }

export {
  todayFormat,
  timeFormat,
  daysFormat,
  dateFormat,
  currentTimeFormat,
  dayTimeSetting,
  localDateFormat
};
