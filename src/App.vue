<template>
  <div id="app" v-bind="bodyClassControl()">
    <AppHeader></AppHeader>
    <router-view></router-view>
    <ToastPopup></ToastPopup>
  </div>
</template>
<script>
import AppHeader from '@/components/common/AppHeader.vue';
import ToastPopup from '@/components/common/ToastPopup.vue';
export default {
  components: { AppHeader, ToastPopup },
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
        // 3초뒤에 적용되도록 셋타임아웃을 줌 저녁시간대에 체크해봐야함.
        setTimeout(() => {
          const body = this.app.parentNode;
          const status = this.$store.state.dayStatus;
          // dayStatus 가 낮이면
          if (status === 'day') {
            body.classList.remove('night');
            // 밤이면
          } else {
            body.classList.add('night');
          }
        }, 3000);
      }
    }
  }
};
</script>
<style>
@import url('./weather-icons-master/css/weather-icons.css');
@import './assets/css/reset.css';
@import './assets/css/common.css';
@import './assets/css/weatherIcon.css';
</style>
