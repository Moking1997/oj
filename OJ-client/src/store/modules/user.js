export default {
    state: {
        limit: 2
    },
    mutations: {
        setLimit(state, limit) {
            state.limit = limit
        },
    },
    actions: {
        setLimit({ commit }, limit) {
            commit('setLimit', limit)
        },
    },
}