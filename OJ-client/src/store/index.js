import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import User from './modules/user'
import Problems from './modules/Problems'

export default new Vuex.Store({
    strict: process.env.NODE != 'production',
    // strict: false,
    state: {
    },
    mutations: {
        getProblems(state, a) {
            state.a = a
        },
    },
    actions: {},
    getters: {},
    modules: {
        problems: Problems,
        user: User,
    }
})
