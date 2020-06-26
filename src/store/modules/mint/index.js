import chain from '../../../utils/chain';

export default {
    namespaced: true,
    state: {
        params: {},
    },
    getters: {},
    mutations: {
        setParams (state, data) {
            state.params = data;
        },
    },
    actions: {
        async fetchMintParams (context) {
            const {result: params} = await chain.fetchMintParameters();
            if (params) {
                context.commit('setParams', params);
            }

            return Promise.resolve(params);
        },
    },
};
