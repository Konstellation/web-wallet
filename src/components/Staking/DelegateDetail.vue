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
                        {{ $t('staking.title') }}
                    </div>
                    <div class="item-details__section__content">
                        <div class="item-details__data">
                            <div class="item-details__label">
                                {{ $t('staking.operator') }}
                            </div>
                            <k-address
                                class="item-details__value"
                                :address="get(v, 'operator_address')"/>
                        </div>
                        <div class="item-details__data">
                            <div class="item-details__label">
                                {{ $t('staking.consensus_pubkey') }}
                            </div>
                            <k-address
                                class="item-details__value"
                                :address="get(v, 'consensus_pubkey')"/>
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
                <template v-if="v.jailed">
                    <div class="item-details__section">
                        <div class="item-details__section__title">
                            {{ $t('staking.unjail') }}
                        </div>
                        <div class="item-details__section__content">
                            <div class="item-details__data item-details__row">
                                <div>
                                    <div class="item-details__label">
                                        {{ $t('staking.status') }}
                                    </div>
                                    <div class="item-details__value">
                                        {{ $t(get(v, 'jailed') ? 'staking.jailed' :
                                        'staking.active') }}
                                    </div>
                                </div>
                                <template v-if="isValidator(v.operator_address)">
                                    <div>
                                        <div class="item-details__btns">
                                            <div
                                                class="el-button"
                                                @click="confirmUnjail">
                                                <font-awesome-icon
                                                    class="img-unjail"
                                                    icon="hashtag"/>
                                                <span>
                                                    {{ $t('staking.unjail') | upper }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="item-details__section">
                    <div class="item_details__section__title">
                        {{ $t('staking.shares') }}
                    </div>
                    <div class="item-details__section__content">
                        <div class="item-details__row item-details__data">
                            <div>
                                <div class="item-details__label">
                                    {{ $t('staking.total_shares') }}
                                </div>
                                <div class="item-details__value">
                                    {{ shares | formatAmount }}
                                </div>
                            </div>
                            <div class="item-details__btns">
                                <div
                                    class="el-button"
                                    @click="toDelegate">
                                    <font-awesome-icon
                                        class="img-delegate"
                                        icon="angle-double-up"/>
                                    <span>
                                    {{ $t('staking.delegate') | upper }}
                                </span>
                                </div>
                            </div>
                        </div>
                        <template v-if="isDelegating && !isEmpty(v.delegation)">
                            <div class="item-details__row item-details__data">
                                <div class="">
                                    <div class="item-details__label">
                                        {{ $t('staking.delegated') }}
                                    </div>
                                    <div class="item-details__value">
                                        {{ myDelegation | formatAmount }}
                                    </div>
                                </div>
                                <div class="item-details__btns">
                                    <div
                                        class="el-button"
                                        @click="toRedelegate">
                                        <font-awesome-icon
                                            class="img-redelegate"
                                            icon="angle-double-right"/>
                                        <span>
                                        {{ $t('staking.redelegate') | upper }}
                                    </span>
                                    </div>
                                    <div
                                        class="el-button"
                                        @click="toUnbond">
                                        <font-awesome-icon
                                            class="img-unbond"
                                            icon="angle-double-down"/>
                                        <span>
                                        {{ $t('staking.unbond') | upper }}
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <template v-if="isDelegating && !isEmpty(v.delegation)">
                    <div class="item-details__section">
                        <div class="item-details__section__title">
                            {{ $t('distribution.reward') }}
                        </div>
                        <div class="item-details__section__content">
                            <div class="item-details__row item-details__data">
                                <div>
                                    <div class="item-details__label">
                                        {{ $t('distribution.unpaidReward') }}
                                    </div>
                                    <div class="item-details__value">
                                        {{ reward | formatAmount }}
                                    </div>
                                </div>
                                <div class="item-details__btns">
                                    <div
                                        class="el-button"
                                        @click="confirmWithdraw">
                                        <font-awesome-icon
                                            class="img-reward"
                                            icon="percent"/>
                                        <span>
                                    {{ $t('distribution.withdraw') | upper }}
                                </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-if="isDelegating && !isEmpty(v.unbonding)">
                    <div class="item-details__section">
                        <div class="item-details__section__title">
                            {{ $t('staking.unbondings') }}
                        </div>
                        <div class="item-details__section__content">
                            <table>
                                <tr>
                                    <th>
                                        {{ $t('staking.unbonding_height') }}
                                    </th>
                                    <th>
                                        {{ $t('staking.unbonding_amount') }}
                                    </th>
                                    <th>
                                        {{ $t('staking.completion_time') }}
                                    </th>
                                </tr>
                                <template v-for="u in v.unbonding">
                                    <tr
                                        :key="u.completion_time">
                                        <td>
                                            {{ get(u, 'creation_height') }}
                                        </td>
                                        <td>
                                            {{ get(u, 'balance') | toToken | formatAmount }}
                                        </td>
                                        <td>
                                            {{ get(u, 'completion_time') | formatTime }}
                                        </td>
                                    </tr>
                                </template>
                            </table>
                        </div>
                    </div>
                </template>
            </div>
        </template>
        <template v-else>
            <div class="error">
                {{ $t('staking.validatorNotExist') }}
            </div>
        </template>
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
</template>

<script>
    import {mapGetters, mapState} from 'vuex';
    import numeral from 'numeral';
    import {get, isEmpty} from 'lodash';
    import BigNumber from 'bignumber.js';
    import {getViewToken} from '../../utils/helpers';
    import {DEFAULT_DENOM} from '../../constants';
    import View from '../../views/View';

    export default {
        name: 'DelegateDetail',
        extends: View,
        data() {
            return {
                dialogVisible: false,
                withdrawLoading: false,
                pass: '',
                act: this.onWithdraw,
            };
        },
        computed: {
            ...mapState('account', ['userName', 'userMap']),
            ...mapState('distribution', [
                'rewardMap',
            ]),
            ...mapState('staking', [
                'validatorMap',
                'delegationMap',
                'operatorAddress',
                'unbondingMap',
            ]),
            ...mapGetters('account', {
                address: 'currentAddress',
            }),
            v() {
                const address = this.$route.params.validator;
                const validator = get(this.validatorMap, address) || {};
                const unbonding = get(this.unbondingMap, address);
                const unbondingList = [];
                if (!isEmpty(unbonding)) {
                    unbonding.entries.forEach(i => {
                        unbondingList[unbondingList.length] = i;
                    });
                }
                return {
                    ...validator,
                    delegation: get(this.delegationMap, address),
                    unbonding: unbondingList,
                };
            },
            validator() {
                const {validator} = this.$route.params;
                return validator;
            },
            shares() {
                return {denom: DEFAULT_DENOM, amount: this.v.tokens};
            },
            isDelegating() {
                return !isEmpty(this.v.delegation) || !isEmpty(this.v.unbonding);
            },
            myDelegation() {
                const t = {
                    denom: DEFAULT_DENOM,
                    amount: BigNumber(this.v.tokens)
                        .times(get(this.delegationMap, [this.v.operator_address, 'shares']))
                        .dividedBy(this.v.delegator_shares),
                };
                return getViewToken(t);
            },
            reward() {
                return getViewToken(
                    get(this.rewardMap, [this.$route.params.validator, 0]),
                );
            },
        },
        mounted() {
            this.$store.dispatch('staking/fetchValidatorOperatorAddress', this.address);
            this.$store.dispatch('staking/fetchValidators');
            this.$store.dispatch('staking/setForm', {});
            this.fetchData();
        },
        methods: {
            get,
            isEmpty,
            numeral,
            getViewToken,
            fetchData() {
                const {validator} = this.$route.params;

                // rest api returns 500 if result data empty
                // this.$store.dispatch("staking/fetchDelegation", validator);
                // this.$store.dispatch("staking/fetchUnbonding", validator);
                // so we fetch list api
                this.$store.dispatch('distribution/fetchDelegatorReward', validator);
                this.$store.dispatch('distribution/fetchValidatorRewards', validator);
                this.$store.dispatch('staking/fetchValidators');
                this.$store.dispatch('distribution/fetchValidatorDistribution', validator);
                this.$store.dispatch('distribution/fetchValidatorOutstandingRewards', validator);
                this.$store.dispatch('staking/fetchDelegations');
                this.$store.dispatch('staking/fetchDelegatorUnbondings');
            },
            viewAmount(amount) {
                return {
                    amount,
                    denom: DEFAULT_DENOM,
                };
            },
            toDelegate() {
                const {validator} = this.$route.params;
                this.$router.push(`/staking/delegate?to=${validator}`);
            },
            toUnbond() {
                const {validator} = this.$route.params;
                this.$router.push(`/staking/unbond?from=${validator}`);
            },
            toRedelegate() {
                const {validator} = this.$route.params;
                this.$router.push(`/staking/redelegate?from=${validator}`);
            },
            toEditValidator() {
                const {validator} = this.$route.params;
                this.$router.push(`/staking/validator/edit/${validator}`);
            },
            isValidator(valAddr) {
                return valAddr === this.operatorAddress;
                // return context.validators.find(v => v.operator_address === context.operatorAddress);
            },
            confirmUnjail() {
                this.pass = '';
                this.dialogVisible = true;
                this.act = this.unjail;

                return true;
            },
            confirmWithdraw() {
                if (isEmpty(this.reward)) {
                    return false;
                }
                this.pass = '';
                this.dialogVisible = true;
                this.act = this.onWithdraw;

                return true;
            },
            async unjail() {
                const {validator: validatorAddr} = this.$route.params;
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

                // this.withdrawLoading = true;
                this.dialogVisible = false;

                try {
                    const {
                        txhash, logs, code, error, raw_log,
                    } = await this.$store.dispatch('slashing/unjail', {
                        validatorAddr,
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
                    this.withdrawLoading = false;
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
            async onWithdraw() {
                const {validator} = this.$route.params;
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

                // this.withdrawLoading = true;
                this.dialogVisible = false;

                try {
                    const {
                        txhash, logs, code, error, raw_log,
                    } = await this.$store.dispatch('distribution/withdraw', {
                        pass: this.pass,
                        validatorAddr: validator,
                        keyStore: this.userMap[this.userName],
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
                    this.withdrawLoading = false;
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
    .validator {
        &__moniker {
            margin: 0 0 10px 0;
            font-size: 20px;
        }

        &__status {
            display: flex;
            flex-direction: column;
            align-items: end;

            &__value {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 7px 0;
            }
        }

        &__description {
            &__website {
                a {
                    color: $color-link;
                }
            }
        }

        table {
            tr {
                th {
                    font-size: 12px;
                    text-align: left;
                    padding: 0 30px 0 0;
                }
            }
        }
    }
</style>
