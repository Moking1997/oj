import http from '@/js/axios'
import Vue from 'vue'

export default {
    state: {
        search: '',
        course: 0,
        courses: [],
        problems: [],
        catalog: 0,
        catalogs: [],
        konwledge: [],
        konwledgeMenu: [],
        konwledgeHeader: [],
        tags: [],
        currentPage: 1,
        total: 10,
        tag: '',
        type: '',
        types: [],
        personal: 0
    },
    mutations: {
        setProblems(state, params) {
            state.tag = params.tag
            state.type = params.type
            state.search = params.search
            state.total = params.total
            state.course = params.course
            state.catalog = params.catalog
            state.personal = params.personal
            state.problems = params.problems
            state.currentPage = params.currentPage

        },
        setTags(state, tags) {
            state.tags = tags
        },
        setTypes(state, types) {
            state.types = types
        },
        setCourses(state, courses) {
            state.courses = courses
        },
        setCatalog(state, catalog) {
            state.catalog = catalog
        },
        setKonwledge(state, { konwledge, menu, header }) {
            state.konwledgeHeader = header
            state.konwledge = konwledge
            state.konwledgeMenu = menu
        },
        getKonwledge(state, { element, children }) {
            Vue.set(element, "children", children);
        }
    },
    actions: {
        async setProblems({ commit, state }, { ...params }) {
            let {
                tag = state.tag,
                search = state.search,
                type = state.type,
                course = state.course,
                currentPage = 1,
                catalog = state.catalog,
                personal = state.personal,
            } = params
            let { data: res } = await http.get("problems", {
                params: {
                    type: type,
                    search: search,
                    course: course,
                    tag: tag,
                    catalog: catalog,
                    personal: personal,
                    currentPage: currentPage,
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
        async setTypes({ commit }, types) {
            let { data: res } = await http.get("problems/type")
            commit('setTypes', res.type)
        },
        async setCourses({ commit }) {
            let id = window.sessionStorage.getItem('id')
            let { data: res } = await http.get("course", {
                params: {
                    tearcher_id: id
                }
            })
            commit('setCourses', res.data)
        },
        setCatalog({ commit }, catalog) {
            commit('setCatalog', catalog)
        },
        async getKonwledge({ dispatch, commit }, element) {
            let { data: res } = await http.get("problems/catalogs", {
                params: {
                    parentID: element.id
                }
            });

            let children = res.data;
            commit('getKonwledge', { element: element, children: children })
            if (children.length != 0) {
                element.children.forEach(async element => {
                    dispatch('getKonwledge', element)
                });
            } else {
                delete element.children;
            }
        },
        async setKonwledge({ dispatch, commit }, konwledges) {
            let { data: res } = await http.get("problems/catalogs", {
                params: {
                    parentID: 0
                }
            });
            let header = res.data
            let konwledge = res.data
            let menu = []
            konwledge.forEach(async element => {
                menu.push(element.id);
                dispatch('getKonwledge', element)
            });
            commit('setKonwledge', { konwledge: konwledge, menu: menu, header: header })
        },
    },
}