/**
 * Created by Administrator on 2017/4/10.
 */
"use strict";

import getters from './getters'

const state = {
    isShowLoading : false
}

const mutations = {
    showLoading(state){
        state.isShowLoading = true;
    },
    hideLoading(state){
        state.isShowLoading = false;
    }
}

export default {
    state,
    mutations,
    getters
}
