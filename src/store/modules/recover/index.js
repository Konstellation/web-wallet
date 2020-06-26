export default {
    namespaced: true,
    state: {
        keyText: '',
        phrase: '',
    },
    getters: {},
    mutations: {
        setKeyText (state, keyText) {
            state.keyText = keyText;
        },
        setPhrase (state, phrase) {
            state.phrase = phrase;
        },
    },
    actions: {
        async inputKey (context, {keyStore}) {
            context.commit('setKeyText', keyStore);

            return Promise.resolve(keyStore);
        },
        async inputPhrase (context, {phrase}) {
            context.commit('setPhrase', phrase);

            return Promise.resolve(phrase);
        },
        async clearKey (context) {
            context.commit('setKeyText', '');
            context.commit('setPhrase', '');

            return Promise.resolve(true);
        },
    },
};
