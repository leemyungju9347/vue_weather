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
import { mapState } from 'vuex';

export default {
  components: { AppHeader, ToastPopup },
  data() {
    return {
      app: null
    };
  },
  computed: {
    ...mapState(['dayStatus'])
  },
  mounted() {
    this.app = this.$el;
  },
  methods: {
    bodyClassControl() {
      if (this.app !== null) {
        // 3초뒤에 적용되도록 셋타임아웃을 줌 저녁시간대에 체크해봐야함.

        const body = this.app.parentNode;
        // dayStatus 가 낮이면
        if (this.dayStatus === 'day') {
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
@import './assets/css/mediaqueries.css';
@import './assets/css/weatherIcon.css';
</style>
