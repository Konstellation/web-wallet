<template>
    <k-card>
        <el-form
            ref="form"
            class="form"
            :model="form"
            :rules="rules">
            <el-form-item prop="title">
                <el-input
                    v-model="form.title"
                    :placeholder="$t('common.title')">
                </el-input>
            </el-form-item>
            <el-form-item prop="description">
                <el-input
                    v-model="form.description"
                    type="textarea"
                    :rows="4"
                    :placeholder="$t('common.description')"
                    maxlength="150"
                    show-word-limit>
                </el-input>
            </el-form-item>
            <el-form-item prop="type">
                <el-select
                    v-model="form.proposalType"
                    @change="changeType">
                    <el-option
                        label="Text"
                        value="text">
                    </el-option>
                    <el-option
                        label="ParameterChange"
                        value="param_change">
                    </el-option>
                </el-select>
            </el-form-item>
            <template
                v-if="form.proposalType === 'param_change'">
                {{ parameterSelected }}
                <template v-for="param in parameterSelected">
                    {{ paramScheme[param] }}
                    <template v-if="paramScheme[param].type === 'number'">
                        <el-form-item :key="param">
                            <label>{{ param }}</label>
                            <el-input
                                v-model="changes[param].value"
                                :type="paramScheme[param].type"
                                step="0.00000000000001"
                                :placeholder="param">
                            </el-input>
                        </el-form-item>
                    </template>
                    <template v-else-if="paramScheme[param].type === 'amount'">
                        <div
                            :key="param"
                            class="form__row">
                            <div class="form__item">
                                <el-form-item
                                    prop="amount"
                                    :label="$t('issues.amount')">
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
                                :label="$t('issues.denom')">
                                <el-input
                                    v-model="form.denom"
                                    style="width: 100%"
                                    :placeholder="$t('send.denom')">
                                </el-input>
                            </el-form-item>
                        </div>
                    </template>
                    <template v-else>
                        <el-form-item :key="param">
                            <label>{{ param }}</label>
                            <el-input
                                v-model="changes[param].value"
                                :placeholder="param">
                            </el-input>
                        </el-form-item>
                    </template>
                </template>
            </template>
            <el-form-item prop="amount">
                <div class="amount-info">
                    <p>{{ $t("gov.activation") }}: 10</p>
                    <p v-if="!isEmpty(currentBalance)">
                        {{ $t("send.balance") }}: {{ currentBalance | formatAmount }}
                    </p>
                </div>
                <el-input v-model.number.trim="form.amount"></el-input>
            </el-form-item>
        </el-form>
        <el-button
            class="btn__primary"
            @click="onSubmit('form')">
            {{ $t("global.confirm") | upper }}
        </el-button>
        <el-dialog
            :title="$t('gov.select_param_change')"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false">
            <el-checkbox-group v-model="parameterSelected">
                <el-checkbox
                    v-for="(param, title, index) in paramScheme"
                    :key="index"
                    :label="title"
                    @change="selectParameter(param)">
                </el-checkbox>
            </el-checkbox-group>
            <span
                slot="footer"
                class="dialog-footer">
                <el-button
                    @click="dialogVisible = false">
                    {{ $t('global.ok') }}
                </el-button>
            </span>
        </el-dialog>
        <el-dialog
            :title="$t('create.pass')"
            :visible.sync="dialogVisible1"
            width="360px"
            :close-on-click-modal="false">
            <el-input
                v-model="form.pass"
                type="password"
                :placeholder="$t('create.pass')"
                @keyup.enter.native="createProposal(false)">
            </el-input>
            <span
                slot="footer"
                class="dialog-footer">
                <el-button
                    @click="createProposal(false)">
                    {{ $t('global.ok') }}
                </el-button>
            </span>
        </el-dialog>
    </k-card>
</template>
<script>
    import {mapState} from 'vuex';
    import {isEmpty} from 'lodash';
    import Vue from 'vue';
    import {DEFAULT_DENOM, paramScheme} from '../../constants';
    import View from '../../views/View';

    export default {
        name: 'ProposalCreate',
        extends: View,
        data() {
            return {
                dialogVisible: false,
                dialogVisible1: false,
                parameterSelected: [],
                paramScheme,
                changes: {},
                form: {
                    title: null,
                    description: null,
                    proposalType: 'Text',
                    denom: DEFAULT_DENOM,
                    amount: 100,
                    pass: null,
                },
            };
        },
        computed: {
            ...mapState('account', ['userName', 'userMap', 'balance']),
            ...mapState('gov', ['minDeposit']),
            ...mapState('mint', {mintParams: 'params'}),
            ...mapState('distribution', {distributionParams: 'params'}),
            ...mapState('issue', {issueParams: 'params'}),
            params() {
                return {
                    ...this.mintParams,
                    ...this.issueParams,
                    ...this.distributionParams,
                };
            },
            rules() {
                const validatorNumber = (rule, value, callback) => {
                    if (!Number.isInteger(value) || value <= 0) {
                        callback(new Error(this.$t('deposit.PositiveNumber')));
                        return;
                    }
                    callback();
                };
                return {
                    title: [
                        {
                            required: true,
                            message: this.$t('global.required', {
                                name: this.$t('common.title'),
                            }),
                            trigger: 'blur',
                        },
                    ],
                    description: [
                        {
                            required: true,
                            message: this.$t('global.required', {
                                name: this.$t('common.description'),
                            }),
                            trigger: 'blur',
                        },
                    ],
                    amount: [
                        {
                            validator: validatorNumber,
                            trigger: 'blur',
                        },
                    ],
                };
            },
            currentBalance() {
                return this.balance.filter(i => i.denom === DEFAULT_DENOM)[0];
            },
        },
        mounted() {
            this.$store.dispatch('account/fetchBalance');
            this.$store.dispatch('mint/fetchMintParams');
            this.$store.dispatch('distribution/fetchDistributionParameters');
            // this.$store.dispatch('issue/fetchIssueParams');
        },
        methods: {
            isEmpty,
            changeType(val) {
                if (val === 'param_change') {
                    this.dialogVisible = true;
                }
            },
            onSubmit(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.form.pass = '';
                        this.dialogVisible1 = true;

                        return true;
                    }

                    return false;
                });
            },
            selectParameter(param) {
                Vue.set(this.changes, param.title, {
                    subspace: param.title.split('/')[0],
                    key: param.title.split('/')[1],
                    value: this.params[param.name],
                    subkey: '',
                });
            },
            formatChanges() {
                return Object.values(this.changes);
                // return Object.entries(this.changes).map(([title, ch]) => ({
                //     ...ch,
                //     value: paramScheme[title].type === 'number' ? Number(ch.value) : ch.value,
                // }));
                // return Object.entries(this.changes).map(([title, ch]) => ({
                //     ...ch,
                //     value: Object.assign({}, ...Object.entries(paramScheme[title].json)
                //         .map(([k, v]) => ({[k]: Number(v.replace('$value', ch.value))}))),
                // }));
            },
            async createProposal() {
                if (!this.form.pass) {
                    this.$message({
                        type: 'error',
                        message: this.$t('global.required', {name: this.$t('create.pass')}),
                        center: true,
                    });
                    return false;
                }
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                });

                try {
                    const {
                        logs: [
                            {
                                success,
                            },
                        ],
                        error, raw_log: {
                            code,
                            message,
                        },
                    } = await this.$store.dispatch('gov/create', {
                        form: {...this.form, changes: this.formatChanges()},
                        pass: this.form.pass,
                        keyStore: this.userMap[this.userName],
                    });
                    if (error) {
                        this.$message({
                            type: 'error',
                            message: error,
                            center: true,
                        });
                    }
                    if (code) {
                        // const codeErrors = {
                        //     4: 'Signature verification error',
                        //     5: 'insufficient funds to pay for fees',
                        // };

                        this.$message({
                            type: 'error',
                            message,
                            center: true,
                        });
                    }

                    if (success) {
                        this.dialogVisible = false;
                        this.$message({
                            type: 'success',
                            message: this.$t('global.success', {
                                name: this.$t('gov.create'),
                            }),
                            center: true,
                            duration: 1000,
                            onClose: () => {
                                this.$router.push({
                                    path: '/gov?tab=my',
                                });
                            },
                        });
                        loading.close();
                    } else {
                        this.$message({
                            type: 'error',
                            message,
                            center: true,
                        });
                    }

                    loading.close();
                } catch (e) {
                    this.$message({
                        type: 'error',
                        message: `${this.$t('send.error')} ${e}`,
                        center: true,
                    });
                }

                loading.close();
                return true;
            },
        },
    };
</script>
<style lang="scss" scoped>
    .el-checkbox-group {
        display: flex;
        justify-content: flex-start;

        align-items: center;
        flex-wrap: wrap;

        .el-checkbox {
            flex-basis: 35%;
            font-size: 16px;
            margin-bottom: 15px;
        }
    }

    .dialog-footer {
        .ok-btn {
            background-color: $main-btn;
            color: #fff;
        }
    }

    @include responsive($sm) {
        .el-dialog {
            width: 90% !important;
        }
        .creat-form {
            .amount-info {
                display: block;
            }
        }
    }
</style>
