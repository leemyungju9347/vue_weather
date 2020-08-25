<template>
    <div class="app-header">
        <form action="" @submit.prevent="inputCity()">
            <label for="search-bar" v-if="!city">Please enter a city name.</label>
            <input id="search-bar" type="text" v-model="city">
            <button><i class="fas fa-search search"></i></button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            city:''
        }
    },
    computed:{
        location(){
            return this.$store.state.location
        },
    },
    methods:{
        // 영어만 입력되도록 예외처리
        async inputCity(){
            if( this.city ){
                // 현재 날씨 
                await this.$store.dispatch('FETCH_WEATHER',`q=${this.city}`)
                // 주간 날씨
                await this.$store.dispatch('FETCH_WEEKLY_WEATHER',this.location)
                this.city = '' 
            }else{
                alert('값을 입력해주세요!')
            }
            
        }
    }
}
</script>

<style>

</style>