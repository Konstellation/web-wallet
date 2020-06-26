import chain from '../../../utils/chain';

export default {
    namespaced: true,

    state: {},

    getters: {},

    mutations: {},

    actions: {
        async unjail (context, {pass, validatorAddr, keyStore}) {
            const validator = chain.importAccount({keyStore, pass});

            return chain.unjailValidator({
                validator,
                validatorAddr,
            });
        },
    },
};
