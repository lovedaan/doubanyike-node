/**
 * Created by Administrator on 2017/4/10.
 */
"use strict";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import actions from './actions'
import mutations from './mutations'

export default new Vuex.Store({
    modules :{
        mutations
    },
    actions
})
