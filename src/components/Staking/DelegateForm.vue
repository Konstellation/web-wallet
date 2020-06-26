<template>
    <k-card>
        <el-form
            ref="form"
            label-position="top"
            :model="form"
            class="form"
            :rules="rules"
            @submit="onSubmit">
            <el-form-item prop="validator">
                <el-input
                    :value="get(toValidator, 'description.moniker')"
                    :placeholder="$t('staking.toValidator')"
                    @focus="selectValidator">
                </el-input>
            </el-form-item>
            <div class="row-balance">
                Balance: {{ viewBalance | formatAmount }}
                <a @click="setAmountAll">
                    {{ $t('staking.all') }}
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
            <div class="row-balance">
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
            {{ $t('staking.delegate') | upper }}
        </el-button>
    </k-card>
</template>

<script>
    import {mapState} from 'vuex';
    import BigNumber from 'bignumber.js';
    import {get, isEmpty} from 'lodash';
    import {DEFAULT_DENOM} from '../../constants';
    import View from '../../views/View';

    export default {
        name: 'DelegateForm',
        extends: View,
        data () {
            const requireError = name => new Error(this.$t('global.required', {name}));
            const validateAddr = (rule, value, callback) => {
                if (isEmpty(this.toValidator)) {
                    callback(requireError(this.$t('staking.validator')));
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
            ...mapState('account', ['balance']),
            ...mapState('staking', ['form', 'toValidator', 'validatorMap']),
            viewBalance () {
                return this.balance.find(i => i.denom === DEFAULT_DENOM);
            },
            viewFee () {
                return {
                    amount: this.fee,
                    denom: DEFAULT_DENOM,
                };
            },
        },
        async mounted () {
            const {to} = this.$route.query;
            if (to) {
                isEmpty(this.validatorMap[to]) && (await this.$store.dispatch('staking/fetchValidators'));
                this.$store.dispatch('staking/setToValidator', this.validatorMap[to]);
            }

            this.$store.dispatch('account/fetchBalance');
        },
        methods: {
            get,
            selectValidator () {
                if (this.$route.query.to) {
                    return;
                }

                this.$router.push('/staking/validator');
            },
            setAmountAll () {
                this.$store.dispatch('staking/setForm', {
                    ...this.form,
                    amount: this.viewBalance.amount,
                    fee: this.viewFee,
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

                    this.$router.push('/staking/confirm?action=delegate');

                    return true;
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .row-balance {
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

    .btn-send {
        margin-top: $padding-basic;
        width: 100%;
        padding: $padding-basic;
    }
</style>
