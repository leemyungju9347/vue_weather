function dateFormat(dt) {
    let today = new Date(dt * 1000);
    let monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    let month = monthNames[today.getMonth()];
    let dayNames = ['Sunday','MonDay','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let day = dayNames[today.getDay()];
    let date = today.getDate();

    return `${day} ${date} ${month}`
}

function sysDateFormat(dt) {
    let today = new Date(dt * 1000);
    let hours = today.getHours();
    hours = hours >= 10 ? hours : `0${hours}`
    let minutes = today.getMinutes();
    minutes = minutes >= 10 ? minutes : `0${minutes}`

    return `${hours} : ${minutes}`
}

export {dateFormat,sysDateFormat}