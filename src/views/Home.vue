<template>
<!-- <div v-if="city && tempInfo && weather && weeklyWeather" class="city_area" v-bind="inputCity()">
    <i class="wi" :class="`wi-owm-${weather[0].id}`"></i>
    <button @click="getLocation()">위치받아오기</button>
    <p>{{ city }}</p>
    <h2>{{ city.name }},{{ city.sys.country }}</h2>
    <p>{{ weather[0].main }}</p>
    <strong>{{ tempInfo.temp }}°C</strong>
    <p>최저: {{ tempInfo.temp_min }} / 최고: {{ tempInfo.temp_max }}</p>
    <p>체감온도 : {{ tempInfo.feels_like}}</p>
    <p> {{weather[0].description}} </p>
    <p>습도:{{ tempInfo.humidity }}%</p>
    <p>바람:{{ city.wind.speed }}m/s</p>
    <p>기압:{{ tempInfo.pressure }}hpa</p>
    <ul>
        <li v-for="(item,index) in item.daily" :key="index">
            {{ new Date(item.dt * 1000) }}
        </li>
    </ul>
    <p class="week">{{ weeklyWeather }}</p>
</div> -->
<div v-bind="inputCity()">
    <!-- status가 true이면 내 위치 날씨 정보를 첫화면으로 불러옴 -->
    <div v-if="status === true && lo_weather && weather_sys && weather_info && temperature" v-bind="currentTime()">
        <strong class="lo">{{ lo_weather }}</strong><br>
        <h2>{{ lo_weather.name }},{{ weather_sys.country }}</h2>
        <i class="wi" :class="`wi-owm-${todayStatus}-${weather_info[0].id}`"></i>
        <p>{{ weather_info[0].main }}</p>
        <p>{{ temperature.temp }}°C</p>
    </div>
    <!-- status가 false이면 검색창에 입력한 나라의 날씨 정보를 불러옴 -->
    <div v-else-if="status === false && city && tempInfo && weather">
        <!-- <h1>{{ new Date(city.dt * 1000) }}</h1> -->
        <strong class="ci">{{ city }}</strong>
        <h2>{{ city.name }},{{ city.sys.country }}</h2>
        <i class="wi" :class="`wi-owm-${todayStatus}-${weather[0].id}`"></i>
        <p>{{ weather[0].main }}</p>
        <p>{{ tempInfo.temp }}°C</p>
    </div>
    <!-- 7일간의 날씨 데이터 -->
    <div class="weekday">
        <!-- <h2>{{ weeklyWeather.timezone }}</h2> -->
        <ul>
            <li v-bind:id="index" v-for="(item,index) in weeklyWeather.daily" :key="index" class="weekList" v-bind="dayChange(item.dt,index)">
                <strong class="day">{{ week[new Date(item.dt * 1000 ).getDay()] }}</strong>
                <i class="wi" :class="`wi-owm-${todayStatus}-${item.weather[0].id}`"></i><br>
                <strong class="desc">{{ item.weather[0].description }}</strong><br>
                <!-- <span>{{ item.temp.day }}°C</span> -->
                <p>{{ new Date(item.dt * 1000) }}</p>
                <p>{{ todays }}</p>
            </li>
        </ul>
    </div>
    <strong>{{ weeklyWeather }}</strong>

    <ul class="five">
        <li v-for="(list,index) in fiveDays.list" :key="index">
            <!-- <p>{{ new Date(list.dt * 1000) }}</p> -->
            <!-- <p>{{ new Date(list.dt * 1000).getHours() }}</p> -->
            <!-- <p>{{ dayListTime }}</p> -->
            <!-- <p>{{ list }}</p> -->
        </li>
    </ul>
</div>
</template>

<script>
import { eventBus } from '../main.js';

// import axios from 'axios'
export default {
    // data(){
    //     return{
    //         city:[]
    //     }
    // },
    // created(){
    //     axios.get('https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=e9bddd582ebeafb67b70af6a1ce5a3c5').then(res=>{
    //         this.city = res.data
    //         console.log(res.statusCode);
            
    //     }).catch(err=>{
    //         console.log(err);
           

    //     })
    // }
    //4월 30일
    // sunset,sunrise를 이용하여 해가 지면 어둡게하고 해가 뜨는 낮시간때는 밖에 보여주는 UI만들기
    // 내GPS를 이용해서 날씨 정보 받아오기
    data(){
        return{
            onCity:'',
            onSignal:false,
            weatherData:[],
            position:null,
            lat:null,
            lon:null,
            status:true,
            latit:null,
            longi:null,
            week : ['일','월','화','수','목','금','토'],
            timeColor:'red',
            todayStatus:'',
            listHours:''
        }
    },
    computed:{
        city(){
            return this.$store.state.city
        },
        tempInfo(){
            return this.$store.state.city.main
        },
        weather(){
            return this.$store.state.city.weather
        },
        weeklyWeather(){
            return this.$store.state.weeklyWeather
        },
        sys(){
            return this.$store.state.city.sys
        },
        sunrise(){
            return this.$store.state.city.sys.sunrise
        },
        sunset(){
            return this.$store.state.city.sys.sunset
        },
        dt(){
            return this.$store.state.city.dt
        },
        lo_weather(){
            return this.$store.state.locationWether
        },
        weather_info(){
            return this.$store.state.locationWether.weather
        },
        temperature(){
            return this.$store.state.locationWether.main
        },
        weather_sys(){
            return this.$store.state.locationWether.sys
        },
        weeklyWeather2(){
            return this.$store.state.weeklyWeather2
        },
        coord(){
            return this.$store.state.coord
        },
        fiveDays(){
            return this.$store.state.fiveDaysWeather
        },
        todays(){
            return (new Date().getMonth() + 1) + '월' + new Date().getDate() + '일'
        }
        // dayList(){
        //     return this.$store.state.fiveDaysWeather.list
        // },
        // dayListTime(){
        //     return new Date(dayList * 1000).getHours()
        // }    

    },
    //1. input이 입력되면 eventBus로 보낸 city명을 받아온뒤
    //2. city명을 데이터에 저장해주고,
    //3. 이 과정을 거친 후에 store로 시티명을 보내줘야함.

    // 변경 **** 첫화면 내 위치를 받아오는 함수를 이용하여 날씨를 출력해줌 ****
    // ** 조건 **
    // 첫화면에서는 만약? lo_weather 을 화면에 출력해주고
    // v-else input 이벤트가 일어나면 city 화면을 출력해줘
    // true일때는 lo_weather
    // false 일때는 city 화면


    //**** json 배열로 받아온 데이터의 위도 경도 값을 dispatch로 보내면 undefined로 보내짐 자꾸 안됨
    // 순서가 잘못된건지 데이터 값이 잘못된건지 모르겠음

    //**** dt, sunrise, sunset을 이용하여 
    // 낮에는 배경색을 빨간색 , 밤에는 배경색을 파란색으로 변경
    // 이를 이용해서 낮에는 낮에쓰는 아이콘, 밤에는 밤에쓰는 아이콘?
    created(){
        this.status = true // status 값을 true로 현재위치의 날씨 나타내도록

        if( navigator.geolocation ){
            navigator.geolocation.getCurrentPosition( position => {

                // store로 this.를 붙이면 안보내짐 왜??
                this.position = position.coords
                this.lon = position.coords.longitude
                this.lat = position.coords.latitude

                //내 위치값 변수 새로 생성
                let lon = position.coords.longitude 
                let lat = position.coords.latitude

                //console.log(Math.floor(lon), Math.floor(lat));
                
                this.$store.dispatch('FETCH_WEEKLY',{lat,lon}) // 일주일 날씨 정보
                this.$store.dispatch('FETCH_LOWEATHER',{lat,lon}) //현재 날씨 정보

            })
        }

    },
    methods:{
        // "lon": 126.98, "lat": 37.57
        inputCity(){
            eventBus.$on('inputCity', cityName =>{

                this.onCity = cityName

                this.$store.dispatch('FETCH_WEATHER',this.onCity) // input에서 받아온 도시를 보냄
                this.status = false 
                //const lon = this.city.coord.lon // 여기서 위치를 받아오면 전에 입력한 나라의 위치를 받아옴;;

                this.$store.dispatch('FETCH_FIVEDAYS',this.onCity)
                console.log(this.onCity);
                
            })
            
        },
        // 낮시간에는 낮에 뜨는 아이콘이 밤시간에는 저녁에 뜨는 아이콘을 출력하는 함수
        // 문제점 : 해외에는 우리나라 시간을 기준으로 하기 때문에 아이콘이 우리나라 시간대로 출력함
        currentTime(){
            let curTime = new Date(this.lo_weather.dt * 1000).getHours(); //21
            // let sunrise = new Date(this.weather_sys.sunrise * 1000).getHours() //5
            let sunset = new Date(this.weather_sys.sunset * 1000).getHours() //19

            // const body = document.querySelector('body');

            // console.log('현재시간' + curTime);
            // console.log('선라이즈' + sunrise);
            // console.log('선셋' + sunset);
        
            if( curTime >= sunset ){
                this.todayStatus = 'night'
                // body.style.backgroundColor = 'blue'
            }else{
                this.todayStatus = 'day'
                // body.style.backgroundColor = 'red'
            }
                        
        },
        dayChange(dt){
            console.log('현재'+dt);
            console.log(this.todays);
            
        }
        // getTime(){
          
        // }
        // check(name,coord){
        //     console.log(name,coord);
        //     // this.latit = coord.lat
        //     // this.longi = coord.lon

        //     // console.log(this.coord);
            
        //     //"lon": 126.42, "lat": 37.45
        //     let la = 126.42
        //     let lo = 37.45

        //     // let la = coord.lat
        //     // let lo = coord.lon


        //     if( la === undefined && la === undefined) return 

        //      this.$store.dispatch('FETCH_WEEKLY2',{la,lo}) // 위도 경도 값이 자꾸 undefined로 들어감.. 뭐가 문제일까

        //     console.log(la,lo);
            
        //     //51.51 lon:-0.13
            
        // }
        
    }
}
</script>

<style>
@import url('../weather-icons-master/css/weather-icons.css');
.city{border:3px solid orangered}
i{font-size: 50px;}
.week{border:3px solid blue}
button{width: 100px;height: 50px;background-color: orchid;}
.lo{background-color: palegoldenrod;}
.ci{background-color: palevioletred;}
.weekday{background-color: powderblue;}
.str{border:5px solid red;}
ul,li{list-style: none;margin: 0;padding: 0;}
ul{overflow: hidden;width: 100%;text-align: center;}
.weekList{
    /* background-color: rosybrown; */
    float: left;width: 12.5%;padding: 10px;box-sizing: border-box;}
i{padding: 10px;font-size: 30px;}
.desc{height:30px;display: block;font-size: 10px;}
.day{font-size: 10px;display: block;}
.five{border:3px solid red}

</style>