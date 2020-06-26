<template>
    <k-card>
        <div class="item-details">
            <data-item
                v-if="!isEmpty(fromValidator)"
                :label="$t('staking.fromValidator')">
                {{ get(fromValidator, 'description.moniker') }}
            </data-item>
            <data-item
                v-if="!isEmpty(toValidator)"
                :label="$t('staking.toValidator')">
                {{ get(toValidator, 'description.moniker') }}
            </data-item>
            <data-item
                v-if="$route.query.action !== 'unbond'"
                :label="$t('staking.commission')">
                {{ numeral(get(toValidator, 'commission.commission_rates.rate')).format('(0.[00]%)')
                }}
            </data-item>
            <data-item :label="$t('send.amount')">
                {{ form.amount | formatAmount }}
            </data-item>
            <data-item :label="$t('send.fee')">
                {{ form.fee | formatFee }}
            </data-item>
        </div>
        <el-button
            class="btn__primary"
            @click="onSubmit">
            {{ $t('global.confirm') | upper }}
        </el-button>
        <el-dialog
            :title="$t('create.pass')"
            :visible.sync="dialogVisible"
            width="360px"
            :close-on-click-modal="false">
            <el-input
                v-model="pass"
                type="password"
                :placeholder="$t('create.pass')"
                @keyup.enter.native="onSend">
            </el-input>
            <span slot="footer">
                <el-button @click="onSend">
                    {{ $t('global.ok') }}
                </el-button>
            </span>
        </el-dialog>
    </k-card>
</template>

<script>
    import {mapState} from 'vuex';
    import numeral from 'numeral';
    import {get, isEmpty} from 'lodash';

    export default {
        name: 'StakingConfirm',
        data() {
            return {
                dialogVisible: false,
                pass: '',
            };
        },
        computed: {
            ...mapState('account', ['userName', 'userMap']),
            ...mapState('staking', ['form', 'toValidator', 'fromValidator']),
        },
        beforeMount() {
            if (!this.form.amount) {
                this.$router.back();
            }
        },
        methods: {
            get,
            isEmpty,
            numeral,
            async onSubmit() {
                this.dialogVisible = true;
            },
            async onSend() {
                if (!this.pass) {
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
                        txhash, logs, code, error, raw_log,
                    } = await this.$store.dispatch(`staking/${this.$route.query.action}`, {
                        form: this.form,
                        keyStore: this.userMap[this.userName],
                        pass: this.pass,
                    });

                    if (error) {
                        this.$store.dispatch('transactions/result', {});
                        this.$message({
                            type: 'error',
                            message: error,
                            center: true,
                        });
                    }

                    if (error) {
                        this.$message({
                            type: 'error',
                            message: error,
                            center: true,
                        });
                    }
                    if (code) {
                        const {message} = JSON.parse(raw_log);
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
                    if (logs) {
                        const [
                            {
                                log,
                                message,
                                success,
                            },
                        ] = logs;

                        if (success) {
                            this.dialogVisible = false;
                            this.$message({
                                type: 'success',
                                message: `${this.$t('global.success', {name: log})} ${this.$t('send.waitTxConfirmation')}`,
                            });
                            loading.close();

                            this.$router.push(`/tx/${txhash}`);
                        } else {
                            this.$message({
                                type: 'error',
                                message,
                                center: true,
                            });
                        }
                    }

                    loading.close();
                } catch (e) {
                    this.$store.dispatch('transactions/result', {});
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
</style>
