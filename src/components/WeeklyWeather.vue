<template>
  <div class="weekly-weather">
    <h2>주간 날씨</h2>
    <ul>
      <li v-for="(item,index) in weeklyData" :key="index">
        <strong>{{item}}</strong>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed:{
    weeklyData(){
      return this.$store.state.weeklyData
    }
  }
}
</script>

<style>

</style>