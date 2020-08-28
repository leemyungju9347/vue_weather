<template>
  <!-- 주간 날씨 -->
  <div class="weekly-weather" v-if="weeklyData">
    <ul>
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
  </div>
</template>

<script>
import { daysFormat, dateFormat } from '@/utils/dateFilters';
export default {
  computed: {
    weeklyData() {
      return this.$store.state.weeklyData;
    }
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
