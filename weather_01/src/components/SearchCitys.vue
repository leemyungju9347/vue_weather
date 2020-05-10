<template>
  <form @submit.prevent="submitCity">
    <!-- 나라입력 -->
    <input type="text" v-model="country" placeholder="나라명을 입력해주세요."><br>
    <!-- 도시입력 -->
    <!-- <input type="text" v-model="city" placeholder="도시명을 입력해주세요."> -->
  </form>
</template>

<script>
import {eventBus} from '../main'
export default {
  props:['citys'],
  data(){
    return{
      city:'',
      country:'',
    }
  },
  methods:{
    submitCity(){
      eventBus.inputCity(this.country)
      this.country = ''

    }
  }
}
</script>

<style>
input{margin-bottom:20px;}
</style>