import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import User from './modules/user'
import Problems from './modules/Problems'

export default new Vuex.Store({
    strict: process.env.NODE != 'production',
    // strict: false,
    state: {
        a: "2",
        b: "3",
    },
    mutations: {
        getProblems(state, a) {
            state.a = a
        },
    },
    actions: {
        getProblems({ commit }, a) {
            commit('getProblems', a)
        },
    },
    getters: {
        count(state) {
            return state.a + state.b
        }
    },
    modules: {
        problems: Problems,
        user: User,
    }
})
