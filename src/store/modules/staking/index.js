import {isEmpty} from 'lodash';
import chain from '../../../utils/chain';

export default {
    namespaced: true,

    state: {
        delegations: [],
        delegationMap: {},
        rewards: [],
        rewardMap: {},
        validators: [],
        validatorMap: {},
        toValidator: {},
        fromValidator: {},
        form: {},
        unbondings: [],
        unbondingMap: {},
        params: {},
        operatorAddress: '',
    },

    getters: {},

    mutations: {
        setDelegations(state, data) {
            state.delegations = data;
        },
        setDelegationMap(state, data) {
            state.delegationMap = data;
        },
        setDelegation(state, data) {
            state.delegationMap = Object.assign({}, state.delegationMap, data);
        },
        setRewards(state, data) {
            state.rewards = data;
        },
        setRewardMap(state, data) {
            state.rewardMap = Object.assign({}, state.rewardMap, data);
        },
        setValidators(state, data) {
            state.validators = data;
        },
        setToValidator(state, data) {
            state.toValidator = data;
        },
        setFromValidator(state, data) {
            state.fromValidator = data;
        },
        setForm(state, data) {
            state.form = data;
        },
        setUnbondings(state, data) {
            state.unbondings = data;
        },
        setValidatorMap(state, data) {
            state.validatorMap = Object.assign({}, state.validatorMap, data);
        },
        setUnbondingMap(state, data) {
            state.unbondingMap = Object.assign({}, state.unbondingMap, data);
        },
        setParams(state, data) {
            state.params = data;
        },
        setOperatorAddress(state, data) {
            state.operatorAddress = data;
        },
    },

    actions: {
        async fetchStakingParameters(context) {
            const {result} = await chain.fetchStakingParameters();
            context.commit('setParams', result);

            return Promise.resolve(result);
        },
        async fetchDelegations(context) {
            const delegatorAddr = context.rootGetters['account/currentAddress'];
            const {result: delegations} = await chain.fetchDelegatorDelegations(delegatorAddr);
            if (!isEmpty(delegations)) {
                context.commit('setDelegations', delegations);

                const delegationMap = {};
                delegations.forEach(i => {
                    delegationMap[i.validator_address] = i;
                });

                context.commit('setDelegationMap', delegationMap);
            }

            return Promise.resolve(delegations);
        },
        async fetchValidatorDelegations(context, {validatorAddr}) {
            const {result: delegations} = await chain.fetchValidatorDelegations(validatorAddr);

            return Promise.resolve(delegations);
        },
        async fetchValidatorUnbondingDelegations(context, {validatorAddr}) {
            const {result: delegations} = await chain.fetchValidatorUnbondingDelegations(validatorAddr);

            return Promise.resolve(delegations);
        },
        async fetchDelegatorRedelegations(context, {validatorSrcAddr, validatorDstAddr}) {
            const delegatorAddr = context.rootGetters['account/currentAddress'];
            const {result: redelegations} = await chain.fetchDelegatorRedelegations(delegatorAddr, validatorSrcAddr, validatorDstAddr);

            return Promise.resolve(redelegations);
        },
        async fetchDelegation(context, validatorAddr) {
            const delegatorAddr = context.rootGetters['account/currentAddress'];
            const {result} = await chain.fetchDelegatorDelegation(delegatorAddr, validatorAddr);
            if (!isEmpty(result)) {
                context.commit('setDelegation', {
                    [validatorAddr]: result,
                });
            }

            return Promise.resolve(result);
        },
        async fetchDelegatorUnbondings(context) {
            const delegatorAddr = context.rootGetters['account/currentAddress'];
            const {result: delegations} = await chain.fetchDelegatorUnbondingDelegations(delegatorAddr);
            if (!isEmpty(delegations)) {
                context.commit('setUnbondings', delegations);

                delegations.forEach(i => {
                    context.commit('setUnbondingMap', {
                        [i.validator_address]: i,
                    });
                });
            }

            return Promise.resolve(delegations);
        },
        async fetchDelegatorUnbonding(context, validatorAddr) {
            const delegatorAddr = context.rootGetters['account/currentAddress'];
            const {result} = await chain.fetchDelegatorUnbondingDelegation(delegatorAddr, validatorAddr);
            if (!isEmpty(result)) {
                context.commit('setUnbondingMap', {
                    [validatorAddr]: result,
                });
            }

            return Promise.resolve(result);
        },
        async fetchValidatorOperatorAddress(context, address) {
            const {result} = await chain.fetchValidatorOperatorAddress(address);

            context.commit('setOperatorAddress', result);

            return Promise.resolve(result);
        },
        async fetchValidatorsAll(context) {
            const {result: validatorsBonded} = await chain.fetchValidators('bonded');
            const {result: validatorsUnbonded} = await chain.fetchValidators('unbonded');
            const {result: validatorsUnbonding} = await chain.fetchValidators('unbonding');

            const validators = [...validatorsBonded, ...validatorsUnbonded, ...validatorsUnbonding];

            validators.sort((a, b) => b.tokens - a.tokens);

            context.commit(
                'setValidators',
                validators.map((i, index) => {
                    i.index = index + 1;
                    return i;
                }),
            );

            const validatorMap = {};
            validators.forEach(v => {
                validatorMap[v.operator_address] = v;
            });

            context.commit('setValidatorMap', validatorMap);

            return Promise.resolve(validators);
        },
        async fetchValidators(context, status) {
            if (!status) {
                return context.dispatch('fetchValidatorsAll');
            }

            const {result: validators} = await chain.fetchValidators(status);
            // if (isEmpty(validators)) {
            //     return Promise.reject();
            // }

            validators.sort((a, b) => b.tokens - a.tokens);

            context.commit(
                'setValidators',
                validators.map((i, index) => {
                    i.index = index + 1;
                    return i;
                }),
            );

            const validatorMap = {};
            validators.forEach(v => {
                validatorMap[v.operator_address] = v;
            });

            context.commit('setValidatorMap', validatorMap);

            return Promise.resolve(validators);
        },
        async fetchValidator(context, validatorAddr) {
            const {result: validator} = await chain.fetchValidatorDetails(validatorAddr);
            if (isEmpty(validator)) {
                return Promise.reject();
            }

            context.commit('setValidatorMap', {
                [validatorAddr]: validator,
            });

            return Promise.resolve(validator);
        },
        async setToValidator(context, validator) {
            context.commit('setToValidator', validator);

            return Promise.resolve();
        },
        async setFromValidator(context, validator) {
            context.commit('setFromValidator', validator);

            return Promise.resolve();
        },
        async setForm(context, form) {
            context.commit('setForm', form);

            return Promise.resolve();
        },
        async delegate(context, {pass, keyStore}) {
            const {
                form: {
                    amount,
                    fee,
                },
                toValidator: {
                    operator_address,
                },
            } = context.state;

            const delegator = chain.importAccount({keyStore, pass});

            return chain.delegate({
                delegator,
                validatorAddr: operator_address,
                amount,
                fee,
            });
        },
        async unbond(context, {pass, keyStore}) {
            const {
                form: {
                    amount,
                    fee,
                },
                fromValidator: {
                    operator_address: validatorAddr,
                },
            } = context.state;

            const delegator = chain.importAccount({keyStore, pass});

            return chain.undelegate({
                delegator,
                validatorAddr,
                amount,
                fee,
            });
        },
        async redelegate(context, {
            pass,
            keyStore,
        }) {
            const {
                form: {
                    amount,
                    fee,
                },
                fromValidator: {operator_address: validatorSrcAddr},
                toValidator: {operator_address: validatorDstAddr},
            } = context.state;

            const delegator = chain.importAccount({keyStore, pass});

            return chain.redelegate({
                delegator,
                validatorSrcAddr,
                validatorDstAddr,
                amount,
                fee,
            });
        },
    },
};
