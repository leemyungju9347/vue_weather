<template>
  <div id="app">
    <AppHeader></AppHeader>
    <router-view></router-view>
  </div>
</template>
<script>
import AppHeader from '@/components/common/AppHeader.vue';
export default {
  components:{AppHeader}
}
</script>
<style>
@import url('./weather-icons-master/css/weather-icons.css');
@import './assets/css/reset.css';
@import './assets/css/common.css';
@import './assets/css/index.css';

</style>
