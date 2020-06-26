<template>
    <k-card>
        <el-form
            ref="form"
            label-position="top"
            :model="form"
            class="form"
            :rules="rules"
            @submit="onSubmit">
            <el-form-item
                class="form__item"
                prop="moniker"
                :label="$t('staking.moniker')">
                <el-input
                    v-model="form.description.moniker"
                    :placeholder="$t('staking.moniker')">
                </el-input>
            </el-form-item>
            <el-form-item
                class="form__item"
                :label="$t('staking.identity')"
                prop="identity">
                <el-input
                    v-model="form.description.identity"
                    :placeholder="$t('staking.identity')">
                </el-input>
            </el-form-item>
            <el-form-item
                class="form__item"
                :label="$t('staking.website')"
                prop="website">
                <el-input
                    v-model="form.description.website"
                    :placeholder="$t('staking.website')">
                </el-input>
            </el-form-item>
            <el-form-item
                class="form__item"
                :label="$t('staking.details')"
                prop="details">
                <el-input
                    v-model="form.description.details"
                    :placeholder="$t('staking.details')">
                </el-input>
            </el-form-item>
            <el-form-item
                class="form__item"
                :label="$t('staking.minSelf')"
                prop="minSelfDelegation">
                <el-input
                    v-model="form.min_self_delegation"
                    :placeholder="$t('staking.min_self_delegation')">
                </el-input>
            </el-form-item>
            <el-form-item
                class="form__item"
                :label="$t('staking.commission_rate')"
                prop="rate">
                <el-input
                    v-model="form.commission.commission_rates.rate"
                    :placeholder="$t('staking.rate')">
                </el-input>
            </el-form-item>
            <el-form-item
                class="form__item"
                :label="$t('staking.commission_max')"
                prop="max_rate">
                <el-input
                    v-model="form.commission.commission_rates.max_rate"
                    :placeholder="$t('staking.max_rate')">
                </el-input>
            </el-form-item>
            <el-form-item
                class="form__item"
                :label="$t('staking.commission_change')"
                prop="max_change_rate">
                <el-input
                    v-model="form.commission.commission_rates.max_change_rate"
                    :placeholder="$t('staking.max_change_rate')">
                </el-input>
            </el-form-item>
        </el-form>
        <el-button
            class="btn__primary"
            @click="onSubmit">
            {{ $t('staking.edit_validator') | upper }}
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
        name: 'EditValidatorForm',
        extends: View,
        data() {
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
                form: {
                    description: {
                        moniker: '',
                        website: '',
                        identity: '',
                        details: '',
                    },
                    min_self_delegation: 1,
                    commission: {
                        commission_rates: {
                            commission_rate: 0.000000000000000000,
                            commission_max_rate: 0.000000000000000000,
                            commission_max_change_rate: 0.000000000000000000,
                        },
                    },
                },
                rules: {
                    validator: [{validator: validateAddr, trigger: 'blur'}],
                    amount: [{validator: validateAmount, trigger: 'blur'}],
                },
            };
        },
        computed: {
            ...mapState('account', ['balance']),
            ...mapState('staking', ['toValidator', 'validatorMap']),
            viewBalance() {
                return this.balance.find(i => i.denom === DEFAULT_DENOM);
            },
            validator() {
                const {validator} = this.$route.params;
                return this.validatorMap[validator];
            },
            viewFee() {
                return {
                    amount: this.fee,
                    denom: DEFAULT_DENOM,
                };
            },
        },
        async mounted() {
            const {validator} = this.$route.params;
            const v = await this.$store.dispatch('staking/fetchValidator', validator);
            this.form = {
                ...v,
            };
        },
        methods: {
            get,
            selectValidator() {
                if (this.$route.query.to) {
                    return;
                }

                this.$router.push('/staking/validator');
            },
            setAmountAll() {
                this.$store.dispatch('staking/setForm', {
                    ...this.form,
                    amount: this.viewBalance.amount,
                    fee: this.viewFee,
                });
            },
            viewAmount(amount) {
                return {
                    amount,
                    denom: DEFAULT_DENOM,
                };
            },
            onSubmit(e) {
                e.preventDefault();
                this.$refs.form.validate(valid => {
                    if (!valid) return false;

                    this.$store.dispatch('staking/setForm', this.form);

                    this.$router.push('/staking/validator/confirm');

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
