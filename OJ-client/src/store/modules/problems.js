import http from '@/js/axios'

export default {
    state: {
        problems: [],
        catalogs: [],
        tags: [],
        catalog: 0,
        currentPage: 1,
        total: 10,
        tag: '',
    },
    mutations: {
        setProblems(state, params) {
            state.tag = params.tag
            state.total = params.total
            state.catalog = params.catalog
            state.problems = params.problems
            console.log(state)
        },
        setTags(state, tags) {
            state.tags = tags
        },
        setCatalog(state, catalog) {
            state.catalog = catalog
        },
    },
    actions: {
        async setProblems({ commit, state }, { ...params }) {
            let { data: res } = await http.get("problems", {
                params: {
                    tag: params.tag,
                    catalog: params.catalog,
                    currentPage: params.currentPage,
                }
            })
            params.problems = res.problems
            params.total = res.total
            commit('setProblems', params)
        },
        async setTags({ commit }, tags) {
            let { data: res } = await http.get("problems/tags")
            commit('setTags', res.tags)
        },
        setCatalog({ commit }, catalog) {
            commit('setCatalog', catalog)
        },
    },
}