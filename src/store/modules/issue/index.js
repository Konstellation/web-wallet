import chain from '../../../utils/chain';
import {DEFAULT_DENOM} from '../../../constants';

export default {
    namespaced: true,

    state: {
        form: {},
        issues: {},
        loading: false,
        allowances: {},
        freezes: {},
        allowance: {},
        params: {},
    },

    getters: {},

    mutations: {
        setLoading(state, loading) {
            state.loading = loading;
        },
        setForm(state, data) {
            state.form = data;
        },
        setIssues(state, data) {
            state.issues = data.reduce((acc, curr) => ({
                ...acc,
                [curr.denom]: curr,
            }), {});
        },
        addIssue(state, data) {
            state.issues = {
                ...state.issues,
                [data.denom]: data,
            };
        },
        setAllowances(state, {denom, allowances}) {
            state.allowances = {
                ...state.allowances,
                [denom]: allowances,
            };
        },
        setFreezes(state, {denom, freezes}) {
            state.freezes = {
                ...state.freezes,
                [denom]: freezes,
            };
        },
        setAllowance(state, allowance) {
            state.allowance = allowance;
        },
        setParams(state, data) {
            state.params = data;
        },
    },

    actions: {
        async setForm(context, form) {
            context.commit('setForm', form);

            return Promise.resolve();
        },
        async fetchIssues(context) {
            context.commit('setLoading', true);
            const {result: issues} = await chain.fetchIssues({});

            context.commit('setIssues', issues);
            context.commit('setLoading', false);
        },
        async fetchIssue(context, denom) {
            context.commit('setLoading', true);
            const {error, result} = await chain.fetchIssue(denom);

            if (result) {
                context.commit('addIssue', result.value);
            }

            context.commit('setLoading', false);
            return Promise.resolve({error, result});
        },
        async fetchAllowance(context, {ownerAddr, spenderAddr, denom}) {
            console.log(ownerAddr);
            context.commit('setLoading', true);
            const {result: allowance} = await chain.fetchAllowance(ownerAddr, spenderAddr, denom);

            // if (allowance) {
            //     context.commit('setAllowance', allowance);
            // }

            context.commit('setLoading', false);

            return Promise.resolve(allowance);
        },
        async fetchAllowances(context, {ownerAddr, denom}) {
            context.commit('setLoading', true);
            const {result: allowances} = await chain.fetchAllowances(ownerAddr, denom);

            if (allowances) {
                context.commit('setAllowances', {denom, allowances});
            }

            context.commit('setLoading', false);
        },
        async fetchFreezes(context, {denom}) {
            context.commit('setLoading', true);
            const {result: freezes} = await chain.fetchFreezes(denom);

            if (freezes) {
                context.commit('setFreezes', {denom, freezes});
            }

            context.commit('setLoading', false);
        },
        createIssue(context, {
            pass, keyStore, form: {
                total_supply: totalSupply,
                burn_owner_disabled: burnOwnerDisabled,
                burn_holder_disabled: burnHolderDisabled,
                burn_from_disabled: burnFromDisabled,
                mint_disabled: mintDisabled,
                freeze_disabled: freezeDisabled,
                ...form
            },
        }) {
            const issuer = chain.importAccount({keyStore, pass});
            return chain.issueCreate({
                issuer,
                ...form,
                totalSupply,
                burnOwnerDisabled,
                burnHolderDisabled,
                burnFromDisabled,
                mintDisabled,
                freezeDisabled,
                fee: {
                    amount: form.fee,
                    denom: DEFAULT_DENOM,
                },
            });
        },
        async approveIssue(context, {form: {spender: spenderAddr, amount, fee, denom}, pass, keyStore}) {
            const owner = chain.importAccount({keyStore, pass});

            return chain.approve({
                owner,
                spenderAddr,
                amount: [
                    {
                        denom,
                        amount,
                    },
                ],
                fee: {
                    amount: fee,
                    denom: DEFAULT_DENOM,
                },
            });
        },
        async transferIssue(context, {form: {to_address: toAddr, amount, denom, fee}, pass, keyStore}) {
            const from = chain.importAccount({keyStore, pass});

            return chain.transfer({
                from,
                toAddr,
                amount: [
                    {
                        amount,
                        denom,
                    },
                ],
                fee,
            });
        },
        async transferFromIssue(context, {form: {to_address: toAddr, from_address: fromAddr, amount, denom, fee}, pass, keyStore}) {
            const spender = chain.importAccount({keyStore, pass});

            return chain.transferFrom({
                spender,
                toAddr,
                fromAddr,
                amount: [
                    {
                        amount,
                        denom,
                    },
                ],
                fee,
            });
        },
        async mintIssue(context, {form: {to_address: toAddr, amount, denom, fee}, pass, keyStore}) {
            const minter = chain.importAccount({keyStore, pass});

            return chain.mint({
                minter,
                toAddr,
                amount: [
                    {
                        amount,
                        denom,
                    },
                ],
                fee,
            });
        },
        async burn(context, {form: {amount, denom, fee}, pass, keyStore}) {
            const burner = chain.importAccount({keyStore, pass});

            return chain.burn({
                burner,
                amount: [
                    {
                        amount,
                        denom,
                    },
                ],
                fee,
            });
        },
        async burnFrom(context, {form: {from_address: fromAddr, amount, denom, fee}, pass, keyStore}) {
            const burner = chain.importAccount({keyStore, pass});

            return chain.burnFrom({
                burner,
                fromAddr,
                amount: [
                    {
                        amount,
                        denom,
                    },
                ],
                fee,
            });
        },
        async freezeConfirm(context, {form: {holder: holderAddr, denom, op, fee}, pass, keyStore}) {
            const freezer = chain.importAccount({keyStore, pass});

            return chain.freeze({
                freezer,
                holderAddr,
                denom,
                op: op.filter(o => o === 'in' || o === 'out').join('-'),
                fee,
            });
        },
        async unfreezeConfirm(context, {form: {holder: holderAddr, denom, op, fee}, pass, keyStore}) {
            const freezer = chain.importAccount({keyStore, pass});

            return chain.unfreeze({
                freezer,
                holderAddr,
                denom,
                op: op.filter(o => o === 'in' || o === 'out').join('-'),
                fee,
            });
        },
        async changeFeatures(context, {
            form: {
                denom,
                burn_owner_disabled,
                burn_holder_disabled,
                burn_from_disabled,
                mint_disabled,
                freeze_disabled,
                fee,
            }, pass, keyStore,
        }) {
            const owner = chain.importAccount({keyStore, pass});

            return chain.changeFeatures({
                owner,
                denom,
                fee,
                burnOwnerDisabled: burn_owner_disabled,
                burnHolderDisabled: burn_holder_disabled,
                burnFromDisabled: burn_from_disabled,
                mintDisabled: mint_disabled,
                freezeDisabled: freeze_disabled,
            });
        },
        async changeDescription(context, {
            form: {
                denom,
                fee,
                description,
            }, pass, keyStore,
        }) {
            const owner = chain.importAccount({keyStore, pass});

            return chain.changeDescription({
                owner,
                denom,
                fee,
                description,
            });
        },
        async transferOwnership(context, {
            form: {
                denom,
                fee,
                to_address,
            }, pass, keyStore,
        }) {
            const owner = chain.importAccount({keyStore, pass});

            return chain.transferOwnership({
                owner,
                denom,
                fee,
                toAddr: to_address,
            });
        },
        async fetchIssueParams(context) {
            const {result: params} = await chain.fetchIssueParameters();
            if (params) {
                context.commit('setParams', params.value);
            }

            return Promise.resolve(params.value);
        },
    },
};
