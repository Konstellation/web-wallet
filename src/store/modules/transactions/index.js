import { isEmpty } from 'lodash';
import chain from '../../../utils/chain';
import { DEFAULT_DENOM, DEFAULT_FEE } from '../../../constants';
import { Celestial } from '../../../utils/celestial';

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
        setLoading(state, loading) {
            state.loading = loading;
        },
        setTxList(state, txs) {
            state.txs = txs;
        },
        setTxInfo(state, txInfo) {
            state.txInfo = Object.assign({}, txInfo, state.txInfo);
        },
        setForm(state, form) {
            state.form = form;
        },
        setResult(state, result) {
            state.result = result;
        },
        setMemo(state, data) {
            state.memo = data;
        },
    },

    actions: {
        async fetchTxsTotalCount(context, params) {
            const { total_count } = await chain.fetchTotalTransactionsCount(params);
            if (isEmpty(total_count)) {
                return Promise.resolve();
            }

            return Promise.resolve(total_count);
        },
        async fetchTxs(context) {
            context.commit('setLoading', true);

            const limit = 100;
            // 1. query txs as sender
            const outboundTxs = await context.dispatch('fetchOutBoundTransactions', { limit });
            // 2. query txs as recipient
            const inboundTxs = await context.dispatch('fetchInBoundTransactions', { limit });
            // show action as receive in address page
            const list = _.uniqBy([...outboundTxs, ...inboundTxs], 'hash');
            list.sort((a, b) => b.height - a.height);

            context.commit('setTxList', list);
            context.commit('setLoading', false);

            return Promise.resolve(list);
        },
        async fetchOutBoundTransactions(context, { limit = 10 }) {
            context.commit('setLoading', true);
            const address = context.rootGetters['account/currentAddress'];
            const response = await Celestial.tx.txsQuery(`message.sender='${address}'`);

            return Promise.resolve(response);
        },
        async fetchInBoundTransactions(context, { limit = 10 }) {
            context.commit('setLoading', true);
            const address = context.rootGetters['account/currentAddress'];
            const response = await Celestial.tx.txsQuery(`transfer.recipient='${address}'`);

            return Promise.resolve(response);
        },
        // fetch txs all
        async fetchTxsAll(context, params) {
            const { txs } = await chain.fetchAllTransactions(params);
            return Promise.resolve(txs);
        },
        async fetchTxInfo(context, txhash) {
            context.commit('setLoading', true);
            // if (!isEmpty(context.state.txInfo[txhash])) {
            //     return Promise.resolve(context.state.txInfo[txhash]);
            // }

            const data = await chain.fetchTransaction(txhash);

            const { error } = data;
            if (isEmpty(error)) {
                context.commit('setTxInfo', {
                    [txhash]: data,
                });
            }

            context.commit('setLoading', false);

            return Promise.resolve(data);
        },
        async input(context, form) {
            context.commit('setForm', form);

            return Promise.resolve(form);
        },
        async result(context, result) {
            context.commit('setResult', result);

            return Promise.resolve(result);
        },
        async send(
            context,
            {
                keyStore,
                pass,
                form: { denom, fee, memo, address, amount },
                publicKey,
            },
        ) {
            const account = chain.importAccount({keyStore, pass});
            const response = await Celestial.bank.Send(
                {
                    fromAddress: Celestial.bank.ctx.signerAddress,
                    toAddress: address,
                    amount: [{ amount, denom }],
                },
                account.getPublicKey(),
            );
            console.log(response);
            return response;
            // return chain.send({
            //     from: account,
            //     to: address,
            //     amount: {amount, denom},
            //     memo,
            //     fee,
            // });
        },
        async fetchMemo(context, address) {
            const { result } = await chain.fetchAccount(address);

            context.commit('setMemo', result.memo_required);

            return Promise.resolve(result);
        },
    },
};
