<template>
    <el-form
        ref="form"
        label-position="top"
        :model="form"
        class="form"
        :rules="rules"
        @submit="onSubmit">
        <el-form-item
            prop="description"
            class="form__item">
            <el-input
                v-model="form.description">
                {{ $t('issues.description') }}
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
        <el-button
            class="btn__primary"
            @click="onSubmit">
            {{ $t('global.confirm') | upper }}
        </el-button>
    </el-form>
</template>

<script>
    import {get} from 'lodash';
    import moment from 'dayjs';
    import {mapGetters, mapState} from 'vuex';
    import View from '../../../views/View';
    import {DEFAULT_DENOM} from '../../../constants';

    export default {
        name: 'ChangeDescriptionForm',
        extends: View,
        props: {
            issue: Object,
        },
        data() {
            const validateDenom = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('issues.emptyDenom')));
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
                form: {
                    fee: {
                        amount: 0,
                        denom: DEFAULT_DENOM,
                    },
                    denom: this.issue.denom,
                    description: this.issue.description,
                },
                rules: {
                    denom: [{validator: validateDenom, trigger: 'blur'}],
                    fee: [{validator: validateFee, trigger: 'blur'}],
                },
            };
        },
        computed: {
            ...mapState('account', ['balance', 'keyStore']),
            ...mapGetters('account', {address: 'currentAddress'}),
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
        async mounted() {
            this.$store.dispatch('account/fetchBalance', this.address);
        },
        methods: {
            get,
            moment,
            onSubmit(e) {
                e.preventDefault();

                this.$store.dispatch('issue/setForm', this.form);
                this.$router.push('/issues/change_description/confirm');
            },
        },
    };
</script>
