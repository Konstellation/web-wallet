import {isEmpty} from 'lodash';
import chain from '../../../utils/chain';

export default {
    namespaced: true,

    state: {
        rewards: [],
        distribution: {},
        distributionMap: {},
        rewardMap: {},
        vRewardsMap: {},
        vRewards: {},
        outstandingRewardsMap: {},
        outstandingRewards: {},
        params: {},
    },

    getters: {},

    mutations: {
        setRewards(state, data) {
            state.rewards = data;
        },
        setRewardMap(state, data) {
            state.rewardMap = Object.assign({}, state.rewardMap, data);
        },
        setVRewardsMap(state, data) {
            state.vRewardsMap = Object.assign({}, state.vRewardsMap, data);
        },
        setVRewards(state, data) {
            state.vRewards = Object.assign({}, state.vRewards, data);
        },
        setOutstandingRewardsMap(state, data) {
            state.outstandingRewardsMap = Object.assign({}, state.outstandingRewardsMap, data);
        },
        setOutstandingRewards(state, data) {
            state.outstandingRewards = Object.assign({}, state.outstandingRewards, data);
        },
        setDistributionMap(state, data) {
            state.distributionMap = Object.assign({}, state.distributionMap, data);
        },
        setDistribution(state, data) {
            state.distribution = Object.assign({}, state.distribution, data);
        },
        setParams(state, data) {
            state.params = data;
        },
    },

    actions: {
        async fetchDistributionParameters(context) {
            const {result} = await chain.fetchDistributionParameters();
            context.commit('setParams', result);

            return Promise.resolve(result);
        },
        async fetchDistributionCommunityPool() {
            const {result} = await chain.fetchDistributionCommunityPool();

            return Promise.resolve(result);
        },
        async fetchDelegatorRewards(context) {
            const delegatorAddr = context.rootGetters['account/currentAddress'];
            const {result: {rewards}} = await chain.fetchDelegatorRewards(delegatorAddr);
            if (!isEmpty(rewards)) {
                context.commit('setRewards', rewards);

                rewards.forEach(i => {
                    context.commit('setRewardMap', {
                        [i.operator_address]: i,
                    });
                });
            }

            return Promise.resolve(rewards);
        },
        async fetchDelegatorReward(context, validatorAddr) {
            const delegatorAddr = context.rootGetters['account/currentAddress'];
            const {result: reward} = await chain.fetchDelegatorReward(delegatorAddr, validatorAddr);
            if (!isEmpty(reward)) {
                context.commit('setRewardMap', {
                    [validatorAddr]: reward,
                });
            }

            return Promise.resolve(reward);
        },
        async fetchValidatorRewards(context) {
            const currentAddress = context.rootGetters['account/currentAddress'];
            const {result: operatorAddr} = await chain.fetchValidatorOperatorAddress(currentAddress);

            const {result: rewards} = await chain.fetchValidatorRewards(operatorAddr);
            if (!isEmpty(rewards)) {
                context.commit('setVRewardsMap', {
                    [operatorAddr]: rewards,
                });
                context.commit('setVRewards', rewards);
            }

            return Promise.resolve(rewards);
        },
        async fetchValidatorDistribution(context) {
            const currentAddress = context.rootGetters['account/currentAddress'];
            const {result: operatorAddr} = await chain.fetchValidatorOperatorAddress(currentAddress);

            const {result: distribution} = await chain.fetchValidatorDistribution(operatorAddr);
            if (!isEmpty(distribution)) {
                context.commit('setDistributionMap', {
                    [operatorAddr]: distribution,
                });
                context.commit('setDistribution', distribution);
            }

            return Promise.resolve(distribution);
        },
        async fetchValidatorOutstandingRewards(context) {
            const currentAddress = context.rootGetters['account/currentAddress'];
            const {result: operatorAddr} = await chain.fetchValidatorOperatorAddress(currentAddress);

            const {result: rewards} = await chain.fetchValidatorOutstandingRewards(operatorAddr);
            if (!isEmpty(rewards)) {
                context.commit('setOutstandingRewardsMap', {
                    [operatorAddr]: rewards,
                });
                context.commit('setOutstandingRewards', rewards);
            }

            return Promise.resolve(rewards);
        },
        async withdrawAll(context, {
            pass,
            keyStore,
        }) {
            const delegator = chain.importAccount({keyStore, pass});

            return chain.withdrawDelegationRewards({delegator});
        },
        async withdraw(context, {
            pass,
            keyStore,
            validatorAddr,
        }) {
            const delegator = chain.importAccount({keyStore, pass});

            return chain.withdrawDelegationReward({delegator, validatorAddr});
        },
        async withdrawValidator(context, {
            pass,
            keyStore,
            validatorAddr,
        }) {
            const operator = chain.importAccount({keyStore, pass});

            return chain.withdrawValidatorRewards({operator, validatorAddr});
        },
    },
};
