<template>
    <k-card>
        <el-form
            ref="form"
            label-position="top"
            :model="form"
            :rules="rules"
            class="form"
            @submit="onSubmit">
            <div class="form__row">
                <el-form-item
                    class="form__item"
                    prop="address"
                    :label="$t('send.address')">
                    <el-input
                        v-model="form.address"
                        :placeholder="$t('send.address')"
                        clearable>
                    </el-input>
                </el-form-item>
            </div>
            <div class="form__row">
                <div class="form__item">
                    <el-form-item
                        prop="amount"
                        :label="$t('send.amount')">
                        <div class="row-balance">
                            {{ $t('send.balance') }}: {{ selectedBalance.amount | formatNumber }}
                            <a @click="setAmountAll">
                                {{ $t('send.all') }}
                            </a>
                        </div>
                        <el-input
                            v-model="form.amount"
                            type="number"
                            min="0"
                            step="1"
                            :placeholder="$t('send.amount')"
                            clearable>
                        </el-input>
                    </el-form-item>
                </div>
                <el-form-item
                    prop="denom"
                    class="form__item"
                    :label="$t('send.denom')">
                    <el-select
                        v-model="form.denom"
                        style="width: 100%"
                        :placeholder="$t('send.denom')">
                        <el-option
                            v-for="i in viewBalance"
                            :key="i.denom"
                            :label="i.label"
                            :value="i.denom">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <el-form-item>
                <el-input
                    v-model="form.memo"
                    type="textarea"
                    :rows="3"
                    :placeholder="$t('send.memo')"
                    clearable>
                </el-input>
            </el-form-item>
            <div class="form__row">
                <el-form-item
                    prop="fee"
                    class="form__item"
                    :label="$t('send.fee')">
                    <el-input
                        v-model="form.fee.amount"
                        type="number"
                        min="0"
                        step="1"
                        :placeholder="$t('send.fee')"
                        clearable>
                    </el-input>
                </el-form-item>
                <el-form-item
                    prop="fee"
                    class="form__item"
                    :label="$t('send.denom')">
                    <el-select
                        v-model="form.fee.denom"
                        style="width: 100%"
                        :placeholder="$t('send.denom')">
                        <el-option
                            v-for="i in viewBalance"
                            :key="i.denom"
                            :label="i.label"
                            :value="i.denom">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
        </el-form>
        <el-button
            class="btn__primary"
            @click="onSubmit">
            {{ $t('main.send') | upper }}
        </el-button>
    </k-card>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
    import { isEmpty } from 'lodash';

    import AccountKeyPair from '@konstellation/cosmosjs/src/types/AccountKeyPair';
    import { DEFAULT_DENOM } from '../../constants';
    import View from '../../views/View';

    export default {
        name: 'SendForm',
        extends: View,
        data() {
            const requireError = name => new Error(this.$t('global.required', { name }));
            const validateAddr = (rule, value, callback) => {
                if (!value || value.trim() === '') {
                    callback(requireError(this.$t('send.address')));
                    return;
                }

                if (!AccountKeyPair.isValidAddress(value)) {
                    callback(this.$t('send.addressWarn'));
                    return;
                }

                if (value === this.currentAddress) {
                    callback(this.$t('send.addressSelf'));
                    return;
                }

                // this.$store.dispatch('transactions/fetchMemo', value);
                callback();
            };
            const validateAmount = (rule, value, callback) => {
                const input = value - 0;
                const balance = this.selectedBalance.amount - 0;
                if (input <= 0) {
                    callback(new Error(this.$t('send.amountWarnPositive')));
                    return;
                }
                if (input > balance) {
                    callback(new Error(this.$t('send.amountWarn')));
                    return;
                }

                callback();
            };
            const validateFee = (rule, value, callback) => {
                const input = value.amount - 0;
                const balance = this.selectedBalance.amount - 0;
                if (input < 0) {
                    callback(new Error(this.$t('send.amountWarnPositive')));
                    return;
                }
                if (input > balance) {
                    callback(new Error(this.$t('send.amountWarn')));
                    return;
                }

                callback();
            };

            return {
                formData: {},
                form: {
                    denom: this.$route.query.denom || DEFAULT_DENOM,
                    amount: this.$route.query.amount || 0,
                    address: this.$route.query.address || '',
                    memo: '',
                    fee: {
                        amount: 0,
                        denom: DEFAULT_DENOM,
                    },
                },
                rules: {
                    address: [{ validator: validateAddr, trigger: 'blur' }],
                    amount: [{ validator: validateAmount, trigger: 'blur' }],
                    fee: [{ validator: validateFee, trigger: 'blur' }],
                },
            };
        },
        computed: {
            ...mapState('account', ['balance']),
            ...mapState('transactions', ['memo']),
            ...mapGetters('account', ['currentAddress']),
            viewBalance() {
                return this.balance.map(i => {
                    const token = { ...i };
                    token.label = token.denom.toUpperCase();
                    return token;
                });
            },
            selectedBalance() {
                return this.balance.find(b => b.denom === this.form.denom) || {
                    denom: DEFAULT_DENOM,
                    amount: 0,
                    label: DEFAULT_DENOM.toUpperCase(),
                };
            },
        },
        async mounted() {
            if (!isEmpty(sessionStorage.getItem('sendForm'))) {
                this.formData = JSON.parse(sessionStorage.getItem('sendForm'));
            }
            Object.keys(this.formData).forEach(k => {
                this.form[k] = this.formData[k];
            });

            const balance = await this.$store.dispatch('account/fetchBalance');
            if (isEmpty(balance)) {
                this.form.denom = '';
            }
        },
        methods: {
            setAmountAll() {
                this.form.amount = this.selectedBalance.amount;
            },
            onSubmit(e) {
                e.preventDefault();
                this.$refs.form.validate(valid => {
                    if (!valid) return false;
                    if (this.memo) {
                        if (this.form.memo === '') {
                            this.$message.error(
                                this.$t('global.required', {
                                    name: this.$t('send.memo'),
                                }),
                            );
                        } else {
                            sessionStorage.setItem('sendForm', JSON.stringify(this.form));
                            this.$store.dispatch('transactions/input', this.form);
                            this.$router.push('/send/confirm');
                        }
                    } else {
                        sessionStorage.setItem('sendForm', JSON.stringify(this.form));
                        this.$store.dispatch('transactions/input', this.form);
                        this.$router.push('/send/confirm');
                    }

                    return true;
                });
            },
        },
    };
</script>

<style lang="scss" scoped>

    .row-balance {
        margin: -16px 0 4px;
        font-size: 11px;

        a {
            color: $color-warning;
            cursor: pointer;
        }
    }

    .btn-send {
        margin-top: $padding-basic;
        width: 100%;
        padding: $padding-basic;
    }
</style>
