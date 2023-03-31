
import Vue from 'vue';
import Vuex from 'vuex';
import news from './modules/newsData'
Vue.use(Vuex)

export const store = new Vuex.Store({
    modules:{
        news,
    }
})