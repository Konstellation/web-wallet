<template>
    <router-link
        :to="`/staking/detail/${v.operator_address}`"
        class="delegation-item">
        <div class="delegation-item__header">
            <font-awesome-icon
                icon="circle"
                :class="get(v, 'jailed') ? 'danger' : 'success'"/>
            <span class="delegation-item__header__name">
                {{ get(v, 'description.moniker') }}
            </span>
        </div>
        <div class="delegation-item__content">
            <p>
                <span>{{ $t('staking.address') }}</span>
                {{ v.operator_address | addr }}
            </p>
            <p>
                <span>{{ $t('staking.tokens') }}</span>
                {{ viewToken | formatAmount }}
            </p>
            <p>
                <span>{{ $t('staking.commission') }}</span>
                {{ get(v, 'commission.rate') | formatPercents }}
            </p>
            <p v-if="get(delegation, 'shares')">
                <span>{{ $t('distribution.unpaidReward') }}</span>
                {{ reward.amount | formatNumber }}
            </p>
            <p v-if="get(delegation, 'shares')">
                <span>{{ $t('staking.delegations') }}</span>
                {{ myDelegation | formatAmount }}
            </p>
        </div>
    </router-link>
</template>

<script>
    import {mapState} from 'vuex';
    import numeral from 'numeral';
    import {get, isEmpty} from 'lodash';
    import {getViewToken} from '@/utils/helpers';
    import BigNumber from 'bignumber.js';
    import {DEFAULT_DENOM} from '../../constants';

    export default {
        name: 'ValidatorPanel',
        props: {
            delegation: Object,
            v: {type: Object, required: true},
        },
        computed: {
            ...mapState('account', ['tokenMap']),
            ...mapState('distribution', ['rewardMap']),
            viewToken () {
                return [{denom: DEFAULT_DENOM, amount: this.v.tokens}];
            },
            reward () {
                return getViewToken(
                    get(this.rewardMap, [get(this.delegation, 'validator_address'), 0]),
                );
            },
            myDelegation () {
                // myShares
                const myShares = get(this.delegation, 'shares');
                // myToken/myGard
                const myToken = BigNumber(this.v.tokens)
                    .times(myShares)
                    .dividedBy(this.v.delegator_shares)
                    .toString();

                return {denom: DEFAULT_DENOM, amount: myToken};
            },
        },
        mounted () {
            const validator = get(this.delegation, 'validator_address');
            if (!isEmpty(validator)) {
                this.$store.dispatch('distribution/fetchDelegatorReward', validator);
            }
        },
        methods: {
            get,
            numeral,
            getViewToken,
        },
    };
</script>

<style lang="scss" scoped>
    .delegation-item {
        flex-basis: 33%;
        background: $color-primary;
        color: $color-title;
        padding: 14px $padding-basic;
        display: flex;
        flex-direction: column;

        &:hover {
            background: $color-hover;
        }

        &__header {
            display: flex;
            align-items: center;
            &__name {
                padding: 0 0 0 10px;
            }
        }

        &__content {

        }

        h3 {
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        p {
            display: flex;
            justify-content: space-between;

            span {
                color: $color-text;
            }
        }
    }
</style>
