import axios from 'axios'


const config = {
    baseUrl : 'https://api.openweathermap.org/data/2.5/weather?q=', //나라, 도시를 입력하는 url
    locationBaseUrl:'https://api.openweathermap.org/data/2.5/weather?lat=', // 위도,경도 입력하는 url
    weeklyUrl:'https://api.openweathermap.org/data/2.5/onecall?lat=', // 일주일간 날씨를 출력해주는 url
    fiveDaysUrl:'https://api.openweathermap.org/data/2.5/forecast?q=',
    myKeyValue : 'e9bddd582ebeafb67b70af6a1ce5a3c5',
    myKeyValue2:'7a122f70e8cf37f7a5b65cf0abc54a13'
}
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=


//나라입력
function weatherApi(cityName){
    return axios.get(`${config.baseUrl}${cityName}&appid=${config.myKeyValue}&units=metric`) // &units=metric를 붙여주면 섭씨온도로 바꿔줌
}

//위도, 경도를 이용한 날씨 불러오기
function weatherLocationApi(lat,lon){
    return axios.get(`${config.locationBaseUrl}${lat}&lon=${lon}&appid=${config.myKeyValue}&units=metric`)
}

//5일 3시간
//api.openweathermap.org/data/2.5/forecast?q= {도시 이름} & appid = {귀하의 API 키}
function weatherFiveDaysApi(cityName){
    return axios.get(`${config.fiveDaysUrl}${cityName}&appid=${config.myKeyValue}&units=metric`)
}


//위클리 날씨 데이터 - 위도,경도
function weatherweeklyApi(lat,lon){
    return axios.get(`${config.weeklyUrl}${lat}&lon=${lon}&exclude=hourly,current&appid=${config.myKeyValue}&units=metric`)
}

function weatherweeklyApi2(lat,lon){
    return axios.get(`${config.weeklyUrl}${lat}&lon=${lon}&exclude=hourly,current&appid=${config.myKeyValue}&units=metric`)
}

export {weatherApi,weatherweeklyApi,weatherLocationApi,weatherweeklyApi2,weatherFiveDaysApi}