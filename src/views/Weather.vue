<template>
    <div class="weather-wrap">
        <TodayWeather></TodayWeather>
        <WeeklyWeather></WeeklyWeather>
    </div>
</template>

<script>
import TodayWeather from '@/components/TodayWeather.vue';
import WeeklyWeather from '@/components/WeeklyWeather.vue';
export default {
    components:{
        TodayWeather,
        WeeklyWeather
    }
}
</script>

<style>

</style>