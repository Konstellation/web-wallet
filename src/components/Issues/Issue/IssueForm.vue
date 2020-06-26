<template>
    <k-card>
        <k-form
            ref="form"
            v-model="data"
            :rules="rules"
            :inputs="inputs"
            @submit="onSubmit"/>
        <el-button
            class="btn__primary"
            @click="onSubmit">
            {{ $t('issues.issue') | upper }}
        </el-button>
    </k-card>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
    import { isEmpty } from 'lodash';

    import { DEFAULT_DENOM } from '../../../constants';
    import View from '../../../views/View';

    export default {
        name: 'IssueForm',
        extends: View,
        data() {
            const validateDenom = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('issues.emptyDenom')));
                    return;
                }

                callback();
            };
            const validateSymbol = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('issues.emptySymbol')));
                    return;
                }

                callback();
            };
            const validateTotalSupply = (rule, value, callback) => {
                if (value <= 0) {
                    callback(new Error(this.$t('issues.totalSupplyRequired')));
                    return;
                }

                callback();
            };
            const validateDecimals = (rule, value, callback) => {
                if (value < 0) {
                    callback(new Error(this.$t('issues.decimalsRequired')));
                    return;
                }

                if (value > 18) {
                    callback(new Error(this.$t('issues.decimalsMax')));
                }

                callback();
            };
            const validateFee = (rule, value, callback) => {
                const balance = this.selectedBalance.amount - 0;
                if (value < 0) {
                    callback(new Error(this.$t('send.amountWarnPositive')));
                    return;
                }
                if (value > balance) {
                    callback(new Error(this.$t('send.amountWarn')));
                    return;
                }

                callback();
            };

            return {
                dialogVisible: false,
                pass: '',
                data: {
                    denom: '',
                    symbol: '',
                    total_supply: 1,
                    decimals: 0,
                    description: '',
                    fee: 0,
                    burn_owner_disabled: false,
                    burn_holder_disabled: false,
                    burn_from_disabled: false,
                    mint_disabled: false,
                    freeze_disabled: false,
                },
                inputs: [
                    {
                        field: 'denom',
                        title: 'issues.denom',
                        placeholder: 'knstl',
                        clearable: true,
                    },
                    {
                        field: 'symbol',
                        title: 'issues.symbol',
                        placeholder: 'KNSTL',
                        clearable: true,
                    },
                    {
                        field: 'total_supply',
                        title: 'issues.total_supply',
                        placeholder: 100000,
                        type: 'number',
                        min: 1,
                        step: 1,
                    },
                    {
                        field: 'decimals',
                        title: 'issues.decimals',
                        placeholder: 3,
                        type: 'number',
                        min: 0,
                        max: 18,
                        step: 1,
                    },
                    {
                        field: 'description',
                        title: 'issues.description',
                        rows: 3,
                        clearable: true,
                        type: 'textarea',
                    },
                    {
                        field: 'burn_owner_disabled',
                        title: 'issues.burn_owner_disabled',
                        type: 'checkbox',
                    },
                    {
                        field: 'burn_holder_disabled',
                        title: 'issues.burn_holder_disabled',
                        type: 'checkbox',
                    },
                    {
                        field: 'burn_from_disabled',
                        title: 'issues.burn_from_disabled',
                        type: 'checkbox',
                    },
                    {
                        field: 'mint_disabled',
                        title: 'issues.mint_disabled',
                        type: 'checkbox',
                    },
                    {
                        field: 'freeze_disabled',
                        title: 'issues.freeze_disabled',
                        type: 'checkbox',
                    },
                    {
                        field: 'fee',
                        title: 'send.fee',
                        type: 'number',
                        min: 0,
                        step: 1,
                    },
                ],
                rules: {
                    denom: [{ validator: validateDenom, trigger: 'blur' }],
                    symbol: [{ validator: validateSymbol, trigger: 'blur' }],
                    total_supply: [{ validator: validateTotalSupply, trigger: 'blur' }],
                    decimals: [{ validator: validateDecimals, trigger: 'blur' }],
                    fee: [{ validator: validateFee, trigger: 'blur' }],
                },
            };
        },
        computed: {
            ...mapState('account', ['balance']),
            ...mapState('issue', ['form']),
            ...mapGetters('account', ['currentAddress']),
            selectedBalance() {
                return this.balance[0] || {
                    denom: DEFAULT_DENOM,
                    amount: 0,
                    label: DEFAULT_DENOM.toUpperCase(),
                };
            },
        },
        beforeMount() {
            if (this.form.denom) {
                this.data = this.form;
            }
        },
        async mounted() {
            const balance = await this.$store.dispatch('account/fetchBalance');
            if (isEmpty(balance)) {
                this.data.denom = '';
            }
        },
        methods: {
            setAmountAll() {
                this.data.amount = this.selectedBalance.amount;
            },
            onSubmit(e) {
                e.preventDefault();
                this.$refs.form.validate(valid => {
                    if (!valid) return false;

                    // sessionStorage.setItem('createIssueForm', JSON.stringify(this.data));
                    this.$store.dispatch('issue/setForm', this.data);
                    this.$router.push('/issues/issue/confirm');

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
