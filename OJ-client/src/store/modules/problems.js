import http from '@/js/axios'
import Vue from 'vue'
const getKonwledge = async function (element) {
    let { data: res } = await http.get("problems/catalogs", {
        params: {
            parentID: element.id
        }
    });
    let children = res.data;
    element.children = children
    if (children.length != 0) {
        element.children.forEach(async element => {
            getKonwledge(element);
        });
    } else {
        delete element.children;
    }
}

export default {
    state: {
        problems: [],
        catalogs: [],
        konwledge: [],
        konwledgeMenu: [],
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
        setKonwledge(state, { konwledge, menu }) {
            state.konwledge = konwledge
            state.konwledgeMenu = menu
        },
        getKonwledge(state, { element, children }) {
            Vue.set(element, "children", children);
        }
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
            let konwledge = res.data
            let menu = []
            konwledge.forEach(async element => {
                menu.push(element.id);
                dispatch('getKonwledge', element)
            });
            commit('setKonwledge', { konwledge: konwledge, menu: menu })
        },
    },
}