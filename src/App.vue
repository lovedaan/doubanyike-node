<template>
    <div id="app">
        <Loading v-if="isShowLoading"></Loading>
        <navView></navView>
        <headerView></headerView>
        <router-view></router-view>
    </div>
</template>

<script>
    import navView from './views/sideNav.vue'
    import headerView from './views/Header.vue'
    import {mapGetters} from 'vuex'
    export default {
        name: 'app',
        components : {
            navView,
            headerView
        },
        computed :{
            ...mapGetters([
                'isShowLoading'
            ])
        }
    }
</script>

<style>

</style>
