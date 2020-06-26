<template>
    <k-card>
        <template v-if="v.operator_address">
            <div class="item-details validator">
                <div class="item-details__row">
                    <div class="validator__moniker">
                        <div class="item-details__label">
                            {{ $t('staking.moniker') }}
                        </div>
                        <div class="item-details__value">
                            {{ get(v, 'description.moniker') }}
                        </div>
                    </div>
                    <div class="validator__status">
                        <div class="item-details__label">
                            {{ $t('staking.status') }}
                        </div>
                        {{ get(v, 'status') === 2 ? $t('staking.bonded') : get(v, 'status') === 0 ?
                        $t('staking.unbonded') : $t('staking.unbonding') }}
                        <div class="item-details__value">
                            <font-awesome-icon
                                icon="circle"
                                :class="get(v, 'jailed') ? 'danger' : 'success'"/>
                        </div>
                    </div>
                </div>
                <div class="item-details__section">
                    <div class="item-details__section__title">
                        {{ $t('staking.description') }}
                    </div>
                    <div class="item-details__section__content">
                        <div class="validator__description">
                            <div class="item-details__row">
                                <div class="item-details__data">
                                    <div class="item-details__label">
                                        {{ $t('staking.identity') }}
                                    </div>
                                    <div class="item-details__value">
                                        {{ get(v, 'description.identity') || '-' }}
                                    </div>
                                </div>
                                <div class="validator__description__website item-details__data">
                                    <div class="item-details__label">
                                        {{ $t('staking.website') }}
                                    </div>
                                    <template v-if="get(v, 'description.website')">
                                        <a
                                            :href="get(v, 'description.website')"
                                            class="item-details__value">
                                            {{ get(v, 'description.website') }}
                                        </a>
                                    </template>
                                    <template v-else>
                                        <div class="item-details__value">
                                            -
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div class="item-details__data item-details__row">
                                <div>
                                    <div class="item-details__label">
                                        {{ $t('staking.details') }}
                                    </div>
                                    <div class="item-details__value">
                                        {{ get(v, 'description.details') || '-' }}
                                    </div>
                                </div>
                                <template v-if="isValidator(v.operator_address)">
                                    <div class="item-details__btns">
                                        <div
                                            class="el-button"
                                            @click="toEditValidator">
                                            <font-awesome-icon
                                                class="img-edit"
                                                icon="edit"/>
                                            <span>
                                                {{ $t('staking.edit_validator') | upper }}
                                            </span>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item-details__section">
                    <div class="item-details__section__title">
                        {{ $t('staking.commission') }}
                    </div>
                    <div class="item-details__section__content">
                        <div class="item-details__row item-details__data">
                            <div>
                                <div class="item-details__label">
                                    {{ $t('staking.commission_rate') }}
                                </div>
                                <div class="item-details__value">
                                    {{ numeral(get(v,
                                    'commission.commission_rates.rate')).format('(0.[00]%)') }}
                                </div>
                            </div>
                            <div>
                                <div class="item-details__label">
                                    {{ $t('staking.commission_max') }}
                                </div>
                                <div class="item-details__value">
                                    {{ numeral(get(v,
                                    'commission.commission_rates.max_rate')).format('(0.[00]%)') }}
                                </div>
                            </div>
                            <div>
                                <div class="item-details__label">
                                    {{ $t('staking.commission_change') }}
                                </div>
                                <div class="item-details__value">
                                    {{ numeral(get(v,
                                    'commission.commission_rates.max_change_rate')).format('(0.[00]%)')
                                    }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        {{v}}
        <el-dialog
            v-loading="withdrawLoading"
            :title="$t('create.pass')"
            :visible.sync="dialogVisible"
            width="360px"
            element-loading-text="Loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.7)"
            :close-on-click-modal="false">
            <el-input
                v-model="pass"
                type="password"
                :placeholder="$t('create.pass')"
                @keyup.enter.native="act">
            </el-input>
            <span slot="footer">
                <el-button @click="act">
                    {{ $t('global.ok') }}
                </el-button>
            </span>
        </el-dialog>
    </k-card>
    <!--    <k-card>-->
    <!--        <div class="item-details">-->
    <!--            <data-item-->
    <!--                v-if="$route.query.action !== 'unbond'"-->
    <!--                :label="$t('staking.commission')">-->
    <!--                {{ numeral(get(toValidator, 'commission.commission_rates.rate')).format('(0.[00]%)')-->
    <!--                }}-->
    <!--            </data-item>-->
    <!--            <data-item :label="$t('send.amount')">-->
    <!--                {{ form.amount | formatAmount }}-->
    <!--            </data-item>-->
    <!--            <data-item :label="$t('send.fee')">-->
    <!--                {{ form.fee | formatFee }}-->
    <!--            </data-item>-->
    <!--        </div>-->
    <!--        <el-button-->
    <!--            class="btn__primary"-->
    <!--            @click="onSubmit">-->
    <!--            {{ $t('global.confirm') | upper }}-->
    <!--        </el-button>-->
    <!--        <el-dialog-->
    <!--            :title="$t('create.pass')"-->
    <!--            :visible.sync="dialogVisible"-->
    <!--            width="360px"-->
    <!--            :close-on-click-modal="false">-->
    <!--            <el-input-->
    <!--                v-model="pass"-->
    <!--                type="password"-->
    <!--                :placeholder="$t('create.pass')"-->
    <!--                @keyup.enter.native="onSend">-->
    <!--            </el-input>-->
    <!--            <span slot="footer">-->
    <!--                <el-button @click="onSend">-->
    <!--                    {{ $t('global.ok') }}-->
    <!--                </el-button>-->
    <!--            </span>-->
    <!--        </el-dialog>-->
    <!--    </k-card>-->
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
            ...mapState('staking', {v: 'form'}),
        },
        beforeMount() {
            if (!this.form.amount) {
                // this.$router.back();
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
                        logs: [
                            {
                                success,
                            },
                        ],
                        error, raw_log: {
                            code,
                            message,
                        },
                    } = await this.$store.dispatch(
                        `staking/${this.$route.query.action}`,
                        {
                            pass: this.pass,
                            keyStore: this.userMap[this.userName],
                        },
                    );
                    if (error) {
                        this.$store.dispatch('transactions/result', {});
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
                                name: this.$route.query.action,
                            }),
                            center: true,
                        });

                        if (this.$route.query.action === 'unbond') {
                            this.$router.push(
                                `/staking/detail/${this.fromValidator.operator_address}`,
                            );
                        } else {
                            this.$router.push(
                                `/staking/detail/${this.toValidator.operator_address}`,
                            );
                        }
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
</style>
