<template>
  <div id="app">
    <searchCitys></searchCitys>
    <router-view></router-view>
  </div>
</template>
<script>

import searchCitys from './components/SearchCitys'
export default {
  components:{searchCitys}
}
</script>
<style>

</style>
