<template>
    <k-card>
        <div
            v-for="(v, i) in validators"
            :key="i"
            class="item"
            @click="() => onSelect(v)">
            <div>
                <h3>
                    {{ i + 1 }}. {{ get(v, 'description.moniker') }}
                    <font-awesome-icon
                        icon="circle"
                        :class="get(v, 'jailed') ? 'danger' : 'success'"/>
                </h3>
                <p>
                    {{ $t('staking.commission') }}:
                    {{ get(v, 'commission.commission_rates.rate') | formatPercents }} /
                    {{ $t('staking.max') }}:
                    {{ get(v, 'commission.commission_rates.max_rate') | formatPercents }}
                </p>
            </div>
            <div class="tokens">
                <h3>{{ v.tokens | formatNumber }}</h3>
                <p>{{ denom | formatDenom }}</p>
            </div>
        </div>
    </k-card>
</template>

<script>
    import {mapState} from 'vuex';
    import numeral from 'numeral';
    import {get} from 'lodash';

    import {getViewToken} from '../../utils/helpers';
    import {DEFAULT_DENOM} from '../../constants';

    export default {
        name: 'ValidatorList',
        data () {
            return {
                denom: DEFAULT_DENOM,
            };
        },
        computed: {
            ...mapState('staking', ['validators']),
        },
        mounted () {
            this.$store.dispatch('staking/fetchValidators');
        },
        methods: {
            get,
            numeral,
            getViewToken,
            onSelect (v) {
                this.$store.dispatch('staking/setToValidator', v);
                this.$router.back();
            },
        },
    };
</script>

<style lang="scss" scoped>
    .item {
        background: $color-primary;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px $padding-basic;
        margin-bottom: 12px;
        cursor: pointer;

        &:hover {
            background: $color-hover;
        }

        h3 {
            color: $color-title;
            font-size: 18px;

            span {
                color: $color-success;
                font-size: 12px;

                &.jailed {
                    color: $color-error;
                    font-size: 12px;
                }
            }
        }

        p {
            color: $color-text;
            font-size: 14px;
        }

        .tokens {
            text-align: center;
        }
    }
</style>
