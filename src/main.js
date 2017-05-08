// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Loading from './components/Loading'
import store from './store'

Vue.use(Loading);

// ajax请求发出前
axios.interceptors.request.use(function (config) {
    store.dispatch('showLoading');
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// ajax请求发回来
axios.interceptors.response.use(function (response) {
    store.dispatch('hideLoading');
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});


Vue.config.productionTip = false;

Vue.prototype.http = axios;

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
