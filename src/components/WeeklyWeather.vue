<template>
  <!-- 주간 날씨 -->
  <div class="weekly-weather" v-if="weeklyData">
    <div class="weekly-wthList" v-if="weeklyDataCheck">
      <!-- 피씨버전 -->
      <ul class="pc-weeklyWth">
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
          <i
            class="icon wi ww-icon"
            :class="`wi-owm-${item.weather[0].id}`"
          ></i>
          <!-- 날씨 설명 -->
          <p class="ww-desc">{{ item.weather[0].description }}</p>
        </li>
      </ul>
      <!-- 모바일버전 -->
      <div class="mobile-weeklyWth">
        <transition-group tag="ul" class="mobile-weeklyWth">
          <li
            v-for="(item, index) in weeklyData"
            :key="index + 0"
            v-show="index === slideIdx"
          >
            <strong>{{ weeklyDay(item.dt) }}</strong>
            <i
              class="icon wi ww-icon"
              :class="`wi-owm-${item.weather[0].id}`"
            ></i>
            <p class="ww-desc">{{ item.weather[0].description }}</p>
            <p class="ww-temp">
              <span class="max"
                ><i class="wi wi-direction-up"></i>{{ item.temp.max }} °C</span
              >
              <span class="min"
                ><i class="wi wi-direction-down"></i
                >{{ item.temp.min }} °C</span
              >
            </p>
          </li>
        </transition-group>
        <button class="prev" @click="prevShowWeather">
          <span>이전 날씨</span>
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="next" @click="nextShowWeather">
          <span>다음 날씨</span>
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
    <div class="warning" v-else>
      <p>
        <i class="warning-icon fas fa-exclamation-circle"></i>{{ logMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { daysFormat, dateFormat } from '@/utils/dateFilters';
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      logMessage: '주간 데이터를 불러올 수 없습니다.',
      slideIdx: 0
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
    },
    nextShowWeather() {
      const weekDataLen = this.weeklyData.length - 1;
      if (this.slideIdx < weekDataLen) {
        this.slideIdx++;
      } else {
        this.slideIdx = 0;
      }
    },
    prevShowWeather() {
      const weekDataLen = this.weeklyData.length - 1;
      if (this.slideIdx === 0) {
        console.log('슬라이드 인덱스가 0이면?');
        this.slideIdx = weekDataLen;
        console.log(this.slideIdx);
      } else {
        this.slideIdx--;
        console.log(this.slideIdx);
      }
    }
  }
};
</script>

<style></style>
