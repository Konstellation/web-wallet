import {
    isEmpty,
} from 'lodash';
import chain from '../../../utils/chain';
import {DEFAULT_DENOM, DEFAULT_FEE} from '../../../constants';

export default {
    namespaced: true,

    state: {
        loading: false,
        txs: [],
        txInfo: {},
        form: {
            denom: DEFAULT_DENOM,
            fee: DEFAULT_FEE,
        },
        result: {},
        memo: false,
    },

    getters: {},

    mutations: {
        setLoading (state, loading) {
            state.loading = loading;
        },
        setTxList (state, txs) {
            state.txs = txs;
        },
        setTxInfo (state, txInfo) {
            state.txInfo = Object.assign({}, txInfo, state.txInfo);
        },
        setForm (state, form) {
            state.form = form;
        },
        setResult (state, result) {
            state.result = result;
        },
        setMemo (state, data) {
            state.memo = data;
        },
    },

    actions: {
        async fetchTxsTotalCount (context, params) {
            const {total_count} = await chain.fetchTotalTransactionsCount(params);
            if (isEmpty(total_count)) {
                return Promise.resolve();
            }

            return Promise.resolve(total_count);
        },
        async fetchTxs (context) {
            context.commit('setLoading', true);

            const limit = 100;
            // 1. query txs as sender
            const outboundTxs = await context.dispatch('fetchOutBoundTransactions', {limit});
            // 2. query txs as recipient
            const inboundTxs = await context.dispatch('fetchInBoundTransactions', {limit});
            // show action as receive in address page
            const list = _.uniqBy([...outboundTxs, ...inboundTxs], 'txhash');
            list.sort((a, b) => b.height - a.height);

            context.commit('setTxList', list);
            context.commit('setLoading', false);

            return Promise.resolve(list);
        },
        async fetchOutBoundTransactions (context, {limit = 10}) {
            context.commit('setLoading', true);
            const address = context.rootGetters['account/currentAddress'];
            const {total_count} = await chain.fetchOutboundTransactions(address, {
                limit,
            });
            let page = Math.ceil(total_count / limit) || 1;
            let data = await chain.fetchOutboundTransactions(address, {
                limit,
                page,
            });
            if (isEmpty(data)) {
                context.commit('setLoading', false);
                return Promise.reject();
            }

            let {txs} = data;
            if (txs.length < limit && total_count > limit) {
                page--;
                data = await chain.fetchOutboundTransactions(address, {
                    limit,
                    page,
                });
                if (isEmpty(data)) {
                    context.commit('setLoad', false);
                    return Promise.reject();
                }

                txs = [...txs, ...data.txs];
            }

            return Promise.resolve(txs);
        },
        async fetchInBoundTransactions (context, {limit = 10}) {
            context.commit('setLoading', true);
            const address = context.rootGetters['account/currentAddress'];
            const {total_count} = await chain.fetchInboundTransactions(address, {
                limit,
            });
            let page = Math.ceil(total_count / limit) || 1;
            let data = await chain.fetchInboundTransactions(address, {
                limit,
                page,
            });
            if (isEmpty(data)) {
                context.commit('setLoading', false);
                return Promise.reject();
            }

            let {txs} = data;
            if (txs.length < limit && total_count > limit) {
                page--;
                data = await chain.fetchInboundTransactions(address, {
                    limit,
                    page,
                });
                if (isEmpty(data)) {
                    context.commit('setLoad', false);
                    return Promise.reject();
                }

                txs = [...txs, ...data.txs];
            }

            return Promise.resolve(txs);
        },
        // fetch txs all
        async fetchTxsAll (context, params) {
            const {txs} = await chain.fetchAllTransactions(params);
            return Promise.resolve(txs);
        },
        async fetchTxInfo (context, txhash) {
            context.commit('setLoading', true);
            // if (!isEmpty(context.state.txInfo[txhash])) {
            //     return Promise.resolve(context.state.txInfo[txhash]);
            // }

            const data = await chain.fetchTransaction(txhash);

            const {error} = data;
            if (isEmpty(error)) {
                context.commit('setTxInfo', {
                    [txhash]: data,
                });
            }

            context.commit('setLoading', false);

            return Promise.resolve(data);
        },
        async input (context, form) {
            context.commit('setForm', form);

            return Promise.resolve(form);
        },
        async result (context, result) {
            context.commit('setResult', result);

            return Promise.resolve(result);
        },
        async send (context, {
            keyStore,
            pass,
            form: {denom, fee, memo, address, amount},
        }) {
            const account = chain.importAccount({keyStore, pass});
            return chain.send({
                from: account,
                to: address,
                amount: {amount, denom},
                memo,
                fee,
            });
        },
        async fetchMemo (context, address) {
            const {result} = await chain.fetchAccount(address);

            context.commit('setMemo', result.memo_required);

            return Promise.resolve(result);
        },
    },
};
