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
            {{ $t('issues.approve') | upper }}
        </el-button>
    </k-card>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
    import { isEmpty } from 'lodash';

    import { DEFAULT_DENOM } from '../../../constants';
    import View from '../../../views/View';

    export default {
        name: 'ApproveForm',
        extends: View,
        data() {
            const validateDenom = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('issues.emptyDenom')));
                    return;
                }

                callback();
            };
            const validateSpender = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('issues.emptySpender')));
                    return;
                }

                callback();
            };
            const validateAmount = (rule, value, callback) => {
                if (value < 0) {
                    callback(new Error(this.$t('issues.amountLowerZero')));
                    return;
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
                    denom: this.$route.query.denom || '',
                    spender: this.$route.query.spender || '',
                    amount: this.$route.query.amount || 0,
                    fee: 0,
                },
                rules: {
                    denom: [{ validator: validateDenom, trigger: 'blur' }],
                    spender: [{ validator: validateSpender, trigger: 'blur' }],
                    amount: [{ validator: validateAmount, trigger: 'blur' }],
                    fee: [{ validator: validateFee, trigger: 'blur' }],
                },
            };
        },
        computed: {
            ...mapState('account', ['balance']),
            ...mapGetters('account', ['currentAddress']),
            selectedBalance() {
                return this.balance[0] || {
                    denom: DEFAULT_DENOM,
                    amount: 0,
                    label: DEFAULT_DENOM.toUpperCase(),
                };
            },
            balances() {
                return this.balance.map(i => {
                    const token = { ...i };
                    token.label = token.denom.toUpperCase();
                    return token;
                });
            },
            inputs() {
                return [
                    {
                        field: 'spender',
                        title: 'issues.spender',
                        placeholder: 'darc1z6u8hddknlp33z79rra7q4gjlw3thwqrdzyplq',
                        clearable: true,
                    },
                    {
                        field: 'denom',
                        title: 'issues.denom',
                        type: 'select',
                        values: this.balances,
                    },
                    {
                        field: 'amount',
                        title: 'issues.amount',
                        placeholder: 1000,
                        type: 'number',
                        min: 1,
                        step: 1,
                    },
                    {
                        field: 'fee',
                        title: 'send.fee',
                        type: 'number',
                        min: 0,
                        step: 1,
                    },
                ];
            },
        },
        beforeMount() {
            this.data = JSON.parse(sessionStorage.getItem('approveForm')) || this.data;
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

                    sessionStorage.setItem('approveForm', JSON.stringify(this.data));
                    this.$store.dispatch('issue/setForm', this.data);
                    this.$router.push('/issues/approve/confirm');

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
