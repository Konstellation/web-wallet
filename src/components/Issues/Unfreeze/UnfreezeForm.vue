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
                <div class="form__item">
                    <el-form-item
                        class="form__item"
                        prop="holder"
                        :label="$t('issues.holder')">
                        <el-input
                            v-model="form.holder"
                            :placeholder="$t('send.address')"
                            clearable>
                        </el-input>
                    </el-form-item>
                </div>
                <el-form-item
                    prop="denom"
                    class="form__item"
                    :label="$t('issues.denom')">
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
            <div class="form__row">
                <el-form-item
                    prop="op"
                    class="form__item"
                    :label="$t('issues.direction')">
                    <el-checkbox-group
                        v-model="form.op">
                            <el-checkbox
                                label="in"
                                value="in">
                                {{ $t('issues.in') }}
                            </el-checkbox>
                            <el-checkbox
                                label="out"
                                value="out">
                                {{ $t('issues.out') }}
                            </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
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
                    :label="$t('issues.denom')">
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
            {{ $t('issues.freeze') | upper }}
        </el-button>
    </k-card>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import {isEmpty} from 'lodash';

    import AccountKeyPair from '@konstellation/cosmosjs/src/types/AccountKeyPair';
    import {DEFAULT_DENOM} from '../../../constants';
    import View from '../../../views/View';

    export default {
        name: 'UnfreezeForm',
        extends: View,
        data() {
            const requireError = name => new Error(this.$t('global.required', {name}));
            const validateAddr = (rule, value, callback) => {
                if (!value || value.trim() === '') {
                    callback(requireError(this.$t('send.address')));
                    return;
                }

                if (!AccountKeyPair.isValidAddress(value)) {
                    callback(this.$t('send.addressWarn'));
                    return;
                }

                callback();
            };
            const validateOp = (rule, value, callback) => {
                if (value.filter(o => o === 'in' || o === 'out').length === 0) {
                    callback(new Error(this.$t('issues.directionWarn')));
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
            const validateDenom = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('issues.emptyDenom')));
                    return;
                }

                callback();
            };

            return {
                form: {
                    denom: this.$route.query.denom || DEFAULT_DENOM,
                    holder: this.$route.query.holder || '',
                    op: this.$route.query.op ? this.$route.query.op.split('-') : ['in', 'out'],
                    fee: {
                        amount: 0,
                        denom: DEFAULT_DENOM,
                    },
                },
                rules: {
                    denom: [{validator: validateDenom, trigger: 'blur'}],
                    holder: [{validator: validateAddr, trigger: 'blur'}],
                    op: [{validator: validateOp, trigger: 'blur'}],
                    fee: [{validator: validateFee, trigger: 'blur'}],
                },
            };
        },
        computed: {
            ...mapState('account', ['balance']),
            ...mapGetters('account', ['currentAddress']),
            selectedBalance() {
                return this.balance.find(b => b.denom === this.form.fee.denom) || {
                    denom: DEFAULT_DENOM,
                    amount: 0,
                    label: DEFAULT_DENOM.toUpperCase(),
                };
            },
            viewBalance() {
                return this.balance.map(i => {
                    const token = {...i};
                    token.label = token.denom.toUpperCase();
                    return token;
                });
            },
        },
        beforeMount() {
            // this.form = JSON.parse(sessionStorage.getItem('mintForm')) || this.form;
        },
        async mounted() {
            const balance = await this.$store.dispatch('account/fetchBalance');
            if (isEmpty(balance)) {
                this.form.denom = '';
            }
        },
        methods: {
            setMyAddress() {
                this.form.to_address = this.currentAddress;
            },
            onSubmit(e) {
                e.preventDefault();
                this.$refs.form.validate(valid => {
                    if (!valid) return false;

                    // sessionStorage.setItem('mintFrom', JSON.stringify(this.form));
                    this.$store.dispatch('issue/setForm', this.form);
                    this.$router.push('/issues/unfreeze/confirm');

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
