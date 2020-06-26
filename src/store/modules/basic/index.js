import _ from 'lodash';
import chain from '../../../utils/chain';

export default {
    namespaced: true,

    state: {
        info: '',
        pageTitle: '',
    },

    getters: {},

    mutations: {
        setInfo (state, info) {
            state.info = info;
        },
        setTitle (state, title) {
            state.pageTitle = title;
        },
    },

    actions: {
        async fetchInfo (context) {
            const {node_info} = await chain.fetchNodeInfo();
            if (_.isEmpty(node_info)) {
                return Promise.reject();
            }

            context.commit('setInfo', node_info);

            return Promise.resolve();
        },
        setPageTitle (context, title) {
            context.commit('setTitle', title);
        },
        clearPageTitle (context) {
            context.commit('setTitle', undefined);
        },
    },
};
