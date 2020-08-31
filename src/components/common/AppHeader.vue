<template>
  <div class="app-header">
    <form action="" @submit.prevent="inputCity()">
      <label for="search-bar" v-if="!city">Please enter a city name.</label>
      <input id="search-bar" type="text" v-model="city" />
      <button><i class="fas fa-search search"></i></button>
    </form>
  </div>
</template>

<script>
import bus from '@/utils/bus';
import { inputValidation } from '@/utils/validation';
export default {
  data() {
    return {
      city: '',
      message: ''
    };
  },
  computed: {
    location() {
      return this.$store.state.location;
    },
    inputValidCheck() {
      return inputValidation(this.city);
    }
  },
  methods: {
    // 영어만 입력되도록 예외처리
    async inputCity() {
      // 값이 있으면
      if (this.city) {
        // 영어로 입력됐으면
        if (this.inputValidCheck) {
          // 현재 날씨
          await this.$store.dispatch('FETCH_WEATHER', `q=${this.city}`);
          // 주간 날씨
          await this.$store.dispatch('FETCH_WEEKLY_WEATHER', this.location);
          this.message = '';

          // 영어로 입력되지 않으면
        } else {
          this.message = '도시명을 영어로 입력해주세요.';
          bus.$emit('show:toast', this.message);
        }
        this.city = '';
      } else {
        this.message = '도시명이 입력되지 않았습니다.';
        bus.$emit('show:toast', this.message);
      }
    }
  }
};
</script>

<style></style>
