<template>
    <k-card>
        <div class="item-details">
            <component
                :is="detail"
                :detail="form"/>
            <div class="item-details__section issue__tx">
                <div class="item-details__section__title">
                    {{ $t('send.tx') }}
                </div>
                <div class="item-details__section__content">
                    <div class="issue__tx__fee">
                        <div class="item-details__label">
                            {{ $t('send.fee') }}
                        </div>
                        <div class="item-details__value">
                            {{ form.fee | toToken | formatFee }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-button
            class="btn__primary"
            @click="onSubmit">
            {{ $t(actionTitle) | upper }}
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
            <span
                slot="footer"
                class="dialog-footer">
                <el-button @click="onSend">
                    {{ $t('global.ok') | upper }}
                </el-button>
              </span>
        </el-dialog>
    </k-card>
</template>

<script>
    import { mapState } from 'vuex';
    import { get, isEmpty } from 'lodash';
    import View from '../../views/View';

    export default {
        name: 'FormConfirm',
        extends: View,
        data() {
            return {
                dialogVisible: false,
                pass: '',
            };
        },
        computed: {
            ...mapState('account', {
                userName: 'userName',
                userMap: 'userMap',
            }),
            ...mapState('issue', ['form']),
        },
        methods: {
            get,
            isEmpty,
            async onSubmit() {
                this.pass = '';
                this.dialogVisible = true;
            },
            async onSend() {
                if (!this.pass) {
                    this.$message({
                        type: 'error',
                        message: this.$t('global.required', { name: this.$t('create.pass') }),
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
                    } = await this.$store.dispatch(this.action, {
                        form: this.form,
                        keyStore: this.userMap[this.userName],
                        pass: this.pass,
                    });

                    if (error) {
                        this.$message({
                            type: 'error',
                            message: error,
                            center: true,
                        });
                    }
                    if (code) {
                        const { message } = JSON.parse(raw_log);
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
                                message: `${this.$t('global.success', { name: log })} ${this.$t('send.waitTxConfirmation')}`,
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
                    // this.$store.dispatch('transactions/result', {});
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
