<template>
    <k-card>
        <el-form
            ref="form"
            label-position="top"
            :model="form"
            class="form"
            :rules="rules"
            @submit="onSubmit">
            <div class="row-label">
                {{ $t('staking.fromValidator') }}
            </div>
            <el-form-item prop="from">
                <el-input
                    :value="get(fromValidator, 'description.moniker')"
                    :placeholder="$t('staking.fromValidator')">
                </el-input>
            </el-form-item>
            <div class="row-label">
                {{ $t('staking.toValidator') }}
            </div>
            <el-form-item prop="validator">
                <el-input
                    :value="get(toValidator, 'description.moniker')"
                    :placeholder="$t('staking.toValidator')"
                    @focus="selectValidator">
                </el-input>
            </el-form-item>
            <div class="row-label">
                Total: {{ viewBalance | formatAmount }}
                <a @click="setAmountAll">
                    {{ $t('staking.redelegateAll') }}
                </a>
            </div>
            <el-form-item prop="amount">
                <el-input
                    v-model="form.amount"
                    type="number"
                    min="0"
                    step="1"
                    :placeholder="$t('send.amount')"
                    clearable>
                </el-input>
            </el-form-item>
            <div class="fee">
                <span>{{ $t('send.fee') }}</span> {{ viewFee | formatFee }}
            </div>
            <el-form-item prop="fee">
                <el-input
                    v-model="fee"
                    type="number"
                    min="0"
                    step="1"
                    :placeholder="$t('send.fee')"
                    clearable>
                </el-input>
            </el-form-item>
        </el-form>
        <el-button
            class="btn__primary"
            @click="onSubmit">
            {{ $t('staking.redelegate') | upper }}
        </el-button>
    </k-card>
</template>

<script>
    import {mapState} from 'vuex';
    import BigNumber from 'bignumber.js';
    import {get, isEmpty} from 'lodash';

    import {getViewToken} from '../../utils/helpers';
    import {DEFAULT_DENOM} from '../../constants';
    import View from '../../views/View';

    export default {
        name: 'RedelegateForm',
        extends: View,
        data () {
            const requireError = name => new Error(this.$t('global.required', {name}));
            const validateAddr = (rule, value, callback) => {
                if (isEmpty(this.toValidator)) {
                    callback(requireError(this.$t('staking.validator')));
                    return;
                }
                if (this.toValidator.operator_address === this.$route.query.from) {
                    callback(new Error(this.$t('staking.validatorDup')));
                    return;
                }
                callback();
            };
            const validateAmount = (rule, value, callback) => {
                if (!value || value.toString().trim() === '') {
                    callback(requireError(this.$t('send.amount')));
                    return;
                }
                const input = value - 0;
                const balance = this.viewBalance.amount - 0;
                if (input <= 0) {
                    callback(new Error(this.$t('send.amountWarnPositive')));
                    return;
                }
                if (input > balance) {
                    callback(new Error(this.$t('send.amountWarn')));
                    return;
                }
                if (
                    BigNumber(input)
                        .modulo(BigNumber(0.1).pow(18))
                        .toNumber() !== 0
                ) {
                    callback(new Error(this.$t('send.amountWarnInvalid')));
                    return;
                }
                callback();
            };
            return {
                fee: 0,
                rules: {
                    validator: [{validator: validateAddr, trigger: 'blur'}],
                    amount: [{validator: validateAmount, trigger: 'blur'}],
                },
            };
        },
        computed: {
            ...mapState('staking', [
                'validatorMap',
                'delegationMap',
                'form',
                'fromValidator',
                'toValidator',
            ]),
            v () {
                const address = this.$route.query.from;
                const validator = get(this.validatorMap, address) || {};

                return {
                    ...validator,
                    delegation: get(this.delegationMap, address),
                };
            },
            viewFee () {
                return {
                    amount: this.fee,
                    denom: DEFAULT_DENOM,
                };
            },
            viewBalance () {
                const total = BigNumber(this.v.tokens)
                    .times(get(this.v, 'delegation.shares'))
                    .div(this.v.delegator_shares)
                    .toFixed();
                const coins = {denom: DEFAULT_DENOM, amount: total || '0'};

                return getViewToken(coins);
            },
        },
        async mounted () {
            const {from} = this.$route.query;
            isEmpty(this.validatorMap[from]) && (await this.$store.dispatch('staking/fetchValidators'));
            await this.$store.dispatch('staking/fetchDelegations');
            this.$store.dispatch('staking/setFromValidator', this.validatorMap[from]);
            this.$store.dispatch('staking/fetchDelegation', from);
        },
        methods: {
            get,
            selectValidator () {
                this.$router.push('/staking/validator/list');
            },
            setAmountAll () {
                this.$store.dispatch('staking/setForm', {
                    ...this.form,
                    fee: this.viewFee,
                    amount: this.viewBalance.amount,
                });
            },
            viewAmount (amount) {
                return {
                    amount,
                    denom: DEFAULT_DENOM,
                };
            },
            onSubmit (e) {
                e.preventDefault();
                this.$refs.form.validate(valid => {
                    if (!valid) return false;

                    this.$store.dispatch('staking/setForm', {
                        ...this.form,
                        fee: this.viewFee,
                        amount: this.viewAmount(this.form.amount),
                    });

                    const {from} = this.$route.query;
                    this.$router.push(`/staking/confirm?action=redelegate&from=${from}`);

                    return true;
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .row-label {
        a {
            cursor: pointer;
            float: right;
        }
    }

    .fee {
        span {
            margin-right: 16px;
        }
    }
</style>
