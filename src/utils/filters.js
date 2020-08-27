// 월
let monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

// 요일
let dayNames = ['Sunday','MonDay','Tuesday','Wednesday','Thursday','Friday','Saturday'];

// '요일 날짜 월' 형식의 포맷
function todayFormat(dt) {
    let today = new Date(dt * 1000);
    let month = monthNames[today.getMonth()];
    let day = dayNames[today.getDay()];
    let date = today.getDate();

    return `${day} ${date} ${month}`
}

// '시간 : 분' 형식의 시간 포맷
function timeFormat(dt) {
    let today = new Date(dt * 1000);
    let hours = today.getHours();
    hours = hours >= 10 ? hours : `0${hours}`
    let minutes = today.getMinutes();
    minutes = minutes >= 10 ? minutes : `0${minutes}`

    return `${hours} : ${minutes}`
}


// 요일 포맷
function daysFormat(dt){
    let today = new Date(dt * 1000);
    let day = dayNames[today.getDay()];

    return day
}

// '날짜 월' 형식의 포맷
function dateFormat(dt){
    let today = new Date(dt * 1000);
    let month = monthNames[today.getMonth()]
    let date = today.getDate();
    date = date >= 10 ? date : `0${date}`

    return `${date} ${month}`
}

function currentTimeFormat(date) {
    let hours = date.getHours();
    hours = hours >= 10 ? hours :`0${hours}`
    let minutes = date.getMinutes()
    minutes = minutes >= 10 ? minutes :`0${minutes}`
    let seconds = date.getSeconds()
    seconds = seconds >= 10 ? seconds :`0${seconds}`
    return `${date.toDateString()}  ${hours} : ${minutes} : ${seconds}`
}

export {todayFormat,timeFormat,daysFormat,dateFormat,currentTimeFormat}