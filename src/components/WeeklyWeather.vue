<template>
  <!-- 주간 날씨 -->
  <div class="weekly-weather" v-if="weeklyData">
    <ul v-if="weeklyDataCheck">
      <li v-for="(item, index) in weeklyData" :key="index">
        <!-- 날짜 -->
        <strong>{{ weeklyDay(item.dt) }}</strong>
        <span class="date">{{ weeklyDate(item.dt) }}</span>
        <!-- 온도 최저 / 최고 -->
        <p class="ww-temp">
          <span class="max"
            ><i class="wi wi-direction-up"></i>{{ item.temp.max }} °C</span
          >
          <span class="min"
            ><i class="wi wi-direction-down"></i>{{ item.temp.min }} °C</span
          >
        </p>
        <i class="icon wi ww-icon" :class="`wi-owm-${item.weather[0].id}`"></i>
        <!-- 날씨 설명 -->
        <p class="ww-desc">{{ item.weather[0].description }}</p>
      </li>
    </ul>
    <div class="warning" v-else>
      <i class="warning-icon fas fa-exclamation-circle"></i>{{ logMessage }}
    </div>
  </div>
</template>

<script>
import { daysFormat, dateFormat } from '@/utils/dateFilters';
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      logMessage: '주간 데이터를 불러올 수 없습니다.'
    };
  },
  computed: {
    ...mapState(['weeklyData']),
    ...mapGetters(['weeklyDataCheck'])
  },
  methods: {
    // 요일
    weeklyDay(dt) {
      return daysFormat(dt);
    },
    // 간단한 날짜
    weeklyDate(dt) {
      return dateFormat(dt);
    }
  }
};
</script>

<style></style>
