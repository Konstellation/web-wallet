<template>
    <k-page
        :title="$t('staking.title')">
        <div class="container">
            <div class="top">
                <div class="top__left">
                    <div class="top__left__box">
                        <div class="top__delegation__total">
                            <div class="top__asset__img">
                                <div
                                    class="top__asset__logo-none">
                                </div>
                            </div>
                            <div class="top__asset__info">
                                <p class="top__asset__title">
                                    {{ $t('staking.delegationTotal') }}
                                </p>
                                <p class="top__asset__amount">
                                    {{ totalDelegation.amount | formatNumber }}
                                </p>
                                <p class="top__asset__denom">
                                    {{ totalDelegation.denom | formatDenom }}
                                </p>
                            </div>
                        </div>
                        <div class="top__delegation__reward">
                            <div class="top__asset__img">
                                <div
                                    class="top__asset__logo-none">
                                </div>
                            </div>
                            <div class="top__asset__info">
                                <p class="top__asset__title">
                                    {{ $t('distribution.rewards') }}
                                </p>
                                <p class="top__asset__amount">
                                    {{ totalRewards.amount | formatNumber }}
                                </p>
                                <p class="top__asset__denom">
                                    {{ totalRewards.denom | formatDenom }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="top__right">
                    <div class="top__btns">
                        <div
                            class="top__btn"
                            @click="confirmWithdraw">
                            <i class="el-icon-money"></i>
                            {{ $t('distribution.withdraw') }}
                        </div>
                        <router-link
                            to="/staking/delegate"
                            class="top__btn">
                            <i class="el-icon-lock"></i>
                            {{ $t('staking.delegate') }}
                        </router-link>
                    </div>
                </div>
            </div>
            <template v-if="ownValidator">
                <div class="top__validator">
                    <div class="top__validator__title">
                        {{ $t('staking.validator') }}
                    </div>
                    <div class="top__validator__body">
                        <div class="top__validator__body__name">
                            {{ userName }}
                        </div>
                        <k-address
                            class="top__validator__body__operator"
                            :address="operatorAddress"
                            :ellipsis="true"/>
                        <div class="item-details__btns">
                            <div
                                class="el-button"
                                @click="confirmValidatorWithdraw">
                                <font-awesome-icon
                                    class="danger"
                                    icon="percent"/>
                                <span>
                                    {{ $t('distribution.withdraw') | upper }}
                                </span>
                            </div>
                            <template v-if="ownValidator.jailed">
                                <div
                                    class="el-button"
                                    @click="confirmUnjail">
                                    <font-awesome-icon
                                        class="img-unjail"
                                        icon="hashtag"/>
                                    <span>
                                    {{ $t('slashing.unjail') | upper }}
                                </span>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="top">
                    <div class="top__left__full">
                        <div class="top__left__box">
                            <div class="top__delegation__reward">
                                <div class="top__asset__img">
                                    <div
                                        class="top__asset__logo-none">
                                    </div>
                                </div>
                                <div class="top__asset__info">
                                    <p class="top__asset__title">
                                        {{ $t('distribution.self_bond_rewards') }} /
                                        {{ $t('distribution.val_commission') }}
                                        <el-tooltip
                                            class="item"
                                            :content="$t('distribution.distribution_description')"
                                            placement="top">
                                            <font-awesome-icon
                                                icon="question"/>
                                        </el-tooltip>
                                    </p>
                                    <p class="top__asset__amount">
                                        {{ vDistribution.self_bond_rewards[0].amount | formatNumber
                                        }}
                                        / {{ vDistribution.val_commission[0].amount | formatNumber
                                        }}
                                    </p>
                                    <p class="top__asset__denom">
                                        {{ vDistribution.val_commission[0].denom | formatDenom }}
                                    </p>
                                </div>
                            </div>
                            <div class="top__delegation__reward">
                                <div class="top__asset__img">
                                    <div
                                        class="top__asset__logo-none">
                                    </div>
                                </div>
                                <div class="top__asset__info">
                                    <p class="top__asset__title">
                                        {{ $t('distribution.validator_rewards') }}
                                        <el-tooltip
                                            class="item"
                                            :content="$t('distribution.rewards_description')"
                                            placement="top">
                                            <font-awesome-icon
                                                icon="question"/>
                                        </el-tooltip>
                                    </p>
                                    <p class="top__asset__amount">
                                        {{ validatorRewards.amount | formatNumber }}
                                    </p>
                                    <p class="top__asset__denom">
                                        {{ validatorRewards.denom | formatDenom }}
                                    </p>
                                </div>
                            </div>
                            <div class="top__delegation__reward">
                                <div class="top__asset__img">
                                    <div
                                        class="top__asset__logo-none">
                                    </div>
                                </div>
                                <div class="top__asset__info">
                                    <p class="top__asset__title">
                                        {{ $t('distribution.outstanding_rewards') }}
                                        <el-tooltip
                                            class="item"
                                            :content="$t('distribution.outstanding_rewards_description')"
                                            placement="top">
                                            <font-awesome-icon
                                                icon="question"/>
                                        </el-tooltip>
                                    </p>
                                    <p class="top__asset__amount">
                                        {{ vOutstandingRewards.amount | formatNumber }}
                                    </p>
                                    <p class="top__asset__denom">
                                        {{ vOutstandingRewards.denom | formatDenom }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <el-tabs
                v-model="$route.query.tab"
                class="bottom"
                :before-leave="onTabChange"
                type="card">
                <el-tab-pane
                    :label="$t('staking.delegations')"
                    name="delegations"
                    class="bottom__pane">
                    <box-grid>
                        <validator-panel
                            v-for="v in viewDelegations"
                            :key="v.validator_address"
                            :v="v.validator"
                            :delegation="v.delegation"
                            class="item"/>
                    </box-grid>
                </el-tab-pane>
                <el-tab-pane
                    :label="$t('staking.validators')"
                    name="validators"
                    class="bottom__pane">
                    <box-grid>
                        <template
                            slot="filters"
                            class="tools">
                            <el-select
                                v-model="filter">
                                <el-option
                                    value="tokens"
                                    :label="$t('staking.tokensMax')">
                                </el-option>
                                <el-option
                                    value="commission"
                                    :label="$t('staking.commissionMin')">
                                </el-option>
                            </el-select>
                            <el-select
                                v-model="status"
                                @change="onStatusChange">
                                <el-option
                                    value="bonded"
                                    :label="$t('staking.bonded')">
                                </el-option>
                                <el-option
                                    value="unbonded"
                                    :label="$t('staking.unbonded')">
                                </el-option>
                                <el-option
                                    value="unbonding"
                                    :label="$t('staking.unbonding')">
                                </el-option>
                            </el-select>
                        </template>
                        <validator-panel
                            v-for="v in validators"
                            :key="v.validator_address"
                            :v="v"
                            class="item"/>
                    </box-grid>
                </el-tab-pane>
            </el-tabs>
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
                    @keyup.enter.native="onSubmit">
                </el-input>
                <span slot="footer">
                <el-button @click="onSubmit">
                    {{ $t('global.ok') }}
                </el-button>
            </span>
            </el-dialog>
        </div>
    </k-page>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';
    import Bignumber, {BigNumber} from 'bignumber.js';
    import numeral from 'numeral';
    import {get, isEmpty} from 'lodash';
    import {DEFAULT_DENOM} from '../constants';

    export default {
        name: 'Staking',
        data() {
            return {
                filter: 'tokens',
                dialogVisible: false,
                withdrawLoading: false,
                pass: '',
                status: 'bonded',
                action: 'distribution/withdrawAll',
            };
        },
        computed: {
            ...mapState('account', ['userName', 'userMap']),
            ...mapState('distribution', [
                'rewards',
                'outstandingRewards',
                'vRewards',
                'distribution',
                'distributionMap',
            ]),
            ...mapState('staking', [
                'loading',
                'validators',
                'operatorAddress',
                'validatorMap',
                'delegations',
                'unbondings',
            ]),
            ...mapGetters('account', {
                address: 'currentAddress',
            }),
            totalDelegation() {
                let res = BigNumber(0);
                this.viewDelegations.forEach(i => {
                    const tokens = Bignumber(i.validator.tokens)
                        .div(i.validator.delegator_shares)
                        .times(i.delegation.shares);
                    res = tokens.plus(res);
                });
                return {
                    denom: DEFAULT_DENOM,
                    amount: res.toFixed(),
                };
            },
            totalRewards() {
                return {
                    amount: this.rewards.map(r => r.reward).flat()
                        .reduce((a, b) => Number(a) + (b ? Number(b.amount) : 0), 0),
                    denom: DEFAULT_DENOM,
                };
            },
            viewDelegations() {
                if (!Object.keys(this.validatorMap).length) return [];

                const unb = this.delegations.filter(i => !this.validatorMap[i.validator_address]);
                if (!isEmpty(unb)) {
                    unb.forEach(v => {
                        this.$store.dispatch('staking/fetchValidator', v.validator_address);
                    });

                    return [];
                }

                return this.delegations.map(i => ({
                    delegation: i,
                    validator: this.validatorMap[i.validator_address],
                }));
            },
            ownValidator() {
                return this.validators.find(v => v.operator_address === this.operatorAddress);
            },
            vOutstandingRewards() {
                return Object.values(this.outstandingRewards).length > 0 ? this.outstandingRewards[0] : {
                    amount: 0,
                    denom: DEFAULT_DENOM,
                };
            },
            validatorRewards() {
                return Object.values(this.vRewards).length > 0 ? this.vRewards[0] : {
                    amount: 0,
                    denom: DEFAULT_DENOM,
                };
            },
            vDistribution() {
                let t = this.distribution;
                if (t) {
                    if (!t.self_bond_rewards) {
                        t = {
                            ...t,
                            self_bond_rewards: [{
                                amount: 0,
                                denom: DEFAULT_DENOM,
                            }],
                        };
                    }
                    if (!t.val_commission) {
                        t = {
                            ...t,
                            val_commission: [{
                                amount: 0,
                                denom: DEFAULT_DENOM,
                            }],
                        };
                    }
                }

                return t;
            },
            viewValidators() {
                if (this.filter === 'tokens') {
                    return this.validators;
                }
                return [...this.validators].sort(
                    (a, b) => get(a, 'commission.rate') - get(b, 'commission.rate'),
                );
            },
        },
        mounted() {
            this.fetchData();
        },
        beforeDestroy() {
            this.$store.dispatch('staking/setToValidator', {});
            this.$store.dispatch('staking/setFromValidator', {});
            this.$store.dispatch('staking/setForm', {});
        },
        methods: {
            get,
            numeral,
            async onStatusChange() {
                await this.$store.dispatch('staking/fetchValidators', this.status);
            },
            isValidator(valAddr) {
                return valAddr === this.operatorAddress;
                // return context.validators.find(v => v.operator_address === context.operatorAddress);
            },
            async fetchData() {
                this.$store.dispatch('staking/fetchValidatorOperatorAddress', this.address);
                this.$store.dispatch('distribution/fetchValidatorOutstandingRewards');
                this.$store.dispatch('distribution/fetchValidatorRewards');
                this.$store.dispatch('distribution/fetchValidatorDistribution');
                await this.$store.dispatch('staking/fetchValidators', this.status);
                await this.$store.dispatch('staking/fetchValidatorsAll');
                await this.$store.dispatch('staking/fetchDelegations');
                await this.$store.dispatch('staking/fetchDelegatorUnbondings');
                this.$store.dispatch('distribution/fetchDelegatorRewards');
            },
            onTabChange(tab) {
                this.$router.push(`/staking?tab=${tab}`);
            },
            confirmWithdraw() {
                if (isEmpty(this.rewards)) {
                    return false;
                }
                this.pass = '';
                this.dialogVisible = true;
                this.action = 'distribution/withdrawAll';

                return true;
            },
            confirmValidatorWithdraw() {
                if (isEmpty(this.rewards)) {
                    return false;
                }
                this.pass = '';
                this.dialogVisible = true;
                this.action = 'distribution/withdrawValidator';

                return true;
            },
            confirmUnjail() {
                if (isEmpty(this.rewards)) {
                    return false;
                }
                this.pass = '';
                this.dialogVisible = true;
                this.action = 'slashing/unjail';

                return true;
            },
            async onSubmit() {
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
                    } = await this.$store.dispatch(this.action, {
                        validatorAddr: this.operatorAddress,
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
                            this.fetchData();
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
    .container {
        .top {
            &__validator {
                margin: 20px 0;

                &__title {

                }

                &__body {
                    display: flex;
                    align-items: center;

                    &__name {
                        font-style: italic;
                        margin-right: 10px;
                    }

                    &__operator {
                        margin-right: 10px;
                    }
                }
            }

            &__account {
                display: flex;
                margin: 0 16px 0 0;

                &__logo-none {
                    width: 80px;
                    height: 80px;
                    background: $color-background;
                    border-radius: 24px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    > img {
                        width: 50px;
                    }
                }

                &__info {
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-content: center;
                    min-width: 115px;

                    > p {
                        color: #fff;
                    }

                    > h3 {
                        font-size: 14px;
                        color: rgba(255, 255, 255, 0.6);
                        height: 30px;
                        line-height: 30px;
                    }
                }
            }
        }

        .top {
            &__delegation {
                &__total {
                    flex-basis: 50%;
                    display: flex;
                }

                &__reward {
                    flex-basis: 50%;
                    display: flex;

                    @include responsive($xxs) {
                        padding-top: 16px;
                    }
                }
            }

            &__asset {
                &__img {
                    > img {
                        width: 80px;
                    }
                }

                &__logo-none {
                    width: 80px;
                    height: 80px;
                    background: $color-background;
                    border-radius: 24px;
                }

                &__title {
                    font-size: 12px;
                }

                &__amount {
                    font-size: 20px;
                    font-weight: bolder;
                }

                &__denom {
                    font-size: 16px;
                }

                &__info {
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-content: center;
                    min-width: 115px;

                    > p {
                        color: #fff;
                    }

                    > h3 {
                        font-size: 14px;
                        color: rgba(255, 255, 255, 0.6);
                        height: 30px;
                        line-height: 30px;
                    }
                }
            }
        }

        .empty {
            width: 100%;
            margin: $padding-large;
            text-align: center;
            color: rgba(255, 255, 255, 0.5);
        }
    }

    @include responsive($sm) {
        .container {
            .staking-top {
                flex-direction: column;
            }

            .delegations {
                flex-direction: column;
                align-items: stretch;
            }
        }
    }
</style>
