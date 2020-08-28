<template>
  <div id="app" v-bind="bodyClassControl()">
    <AppHeader></AppHeader>
    <router-view></router-view>
  </div>
</template>
<script>
import AppHeader from '@/components/common/AppHeader.vue';
// import { dayTimeSetting } from '@/utils/dateFilters'
export default {
  components: { AppHeader },
  data() {
    return {
      app: null
    };
  },
  computed: {
    weatherData() {
      return this.$store.state.weatherData;
    },
    currentTime() {
      return this.weatherData.dt;
    },
    sunrise() {
      return this.weatherData.sys.sunrise;
    },
    sunset() {
      return this.weatherData.sys.sunset;
    },
    timezone() {
      return this.$store.state.timezone;
    }
  },
  mounted() {
    this.app = this.$el;
  },
  methods: {
    bodyClassControl() {
      if (this.app !== null) {
        const body = this.app.parentNode;
        const status = this.$store.state.dayStatus;
        // dayStatus 가 낮이면
        if (status === 'day') {
          body.classList.remove('night');
          // 밤이면
        } else {
          body.classList.add('night');
        }
      }
    }
  }
};
</script>
<style>
@import url('./weather-icons-master/css/weather-icons.css');
@import './assets/css/reset.css';
@import './assets/css/common.css';
@import './assets/css/index.css';
</style>
