<template>
    <k-card>
        <div class="container">
            <div class="top">
                <div class="top__left">
                    <div class="top__left__box">
                        <div class="top__asset">
                            <div class="top__asset__img">
                                <img
                                    v-if="token.img"
                                    :src="token.img"
                                    alt="">
                                <div
                                    v-else
                                    class="top__asset__logo-none">
                                </div>
                            </div>
                            <div class="top__asset__info">
                                <p class="top__asset__title">
                                    {{ $t('assets.balance') }}
                                </p>
                                <p class="top__asset__amount">
                                    {{ token.amount | formatNumber }}
                                </p>
                                <p class="top__asset__denom">
                                    {{ token.denom | formatDenom }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="top__right">
                    <div class="top__btns">
                        <router-link
                            class="top__btn"
                            :to="`/issues/approve?denom=${token.denom}`">
                            <img
                                alt="approve"
                                :src="icon2">
                            {{ $t('issues.approve') }}
                        </router-link>
                        <template v-if="owner">
                            <router-link
                                class="top__btn"
                                :to="`/issues/mint?denom=${token.denom}`">
                                <img
                                    alt="mint"
                                    :src="icon2">
                                {{ $t('issues.mint') }}
                            </router-link>
                        </template>
                        <router-link
                            class="top__btn"
                            :to="`/issues/burn?denom=${token.denom}`">
                            <img
                                alt="burn"
                                :src="icon2">
                            {{ $t('issues.burn') }}
                        </router-link>
                        <template v-if="owner">
                            <router-link
                                class="top__btn"
                                :to="`/issues/freeze?denom=${token.denom}`">
                                <img
                                    alt="freeze"
                                    :src="icon2">
                                {{ $t('issues.freeze') }}
                            </router-link>
                        </template>
                    </div>
                </div>
            </div>
            <template v-if="error">
                <div class="error">
                    {{ error.message }}
                </div>
            </template>
            <div class="item-details">
                <issue-detail
                    :detail="issues[denom]">
                    <template slot="ownership">
                        <div
                            class="item-details__btns"
                            @click="transferOwnership">
                            <div
                                class="el-button">
                                <font-awesome-icon
                                    icon="gavel"/>
                                <span>
                                    {{ $t('issues.transfer_ownership') | upper }}
                                </span>
                            </div>
                        </div>
                    </template>
                    <template slot="description">
                        <div
                            class="item-details__btns"
                            @click="changeDescription">
                            <div
                                class="el-button">
                                <font-awesome-icon
                                    icon="align-justify"/>
                                <span>
                                    {{ $t('issues.change_description') | upper }}
                                </span>
                            </div>
                        </div>
                    </template>
                    <template slot="features">
                        <div
                            class="item-details__btns"
                            @click="changeFeatures">
                            <div
                                class="el-button">
                                <font-awesome-icon
                                    icon="cog"/>
                                <span>
                                    {{ $t('issues.change_features') | upper }}
                                </span>
                            </div>
                        </div>
                    </template>
                </issue-detail>
                <div class="item-details__section">
                    <div class="item-details__section__content">
                        <el-tabs
                            v-model="tab"
                            type="card">
                            <template v-if="allowances && Object.values(allowances).length > 0">
                                <el-tab-pane
                                    :label="$t('issues.allowances')"
                                    name="allowances"
                                    class="bottom__pane">
                                    <div class="table__scroll">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>
                                                    {{ $t('issues.spender') }}
                                                </th>
                                                <th>
                                                    {{ $t('issues.allowance') }}
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <template
                                                v-for="(allowance, i) in allowances[denom]">
                                                <tr
                                                    :key="i+allowance.spender">
                                                    <td>
                                                        <k-address
                                                            class="item-details__value"
                                                            :address="allowance.spender"/>
                                                    </td>
                                                    <td>
                                                        {{ allowance.amount }}
                                                    </td>
                                                    <td class="issue__actions">
                                                        <div class="item-details__btns">
                                                            <router-link
                                                                class="el-button"
                                                                :to="`/issues/approve?denom=${token.denom}&spender=${allowance.spender}&amount=${allowance.amount}`">
                                                                <font-awesome-icon
                                                                    icon="shield-alt"/>
                                                                <span>
                                                            {{ $t('issues.approve') | upper }}
                                                        </span>
                                                            </router-link>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr
                                                    :key="i+allowance.spender+1"
                                                    class="issue__actions__row">
                                                    <td>
                                                        <div class="item-details__btns">
                                                            <router-link
                                                                class="el-button"
                                                                :to="`/issues/approve?denom=${token.denom}&spender=${allowance.spender}&amount=${allowance.amount}`">
                                                                <font-awesome-icon
                                                                    icon="shield-alt"/>
                                                            </router-link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </template>
                                            </tbody>
                                        </table>
                                    </div>
                                </el-tab-pane>
                            </template>
                            <template v-if="freezes && Object.values(freezes).length > 0">
                                <el-tab-pane
                                    :label="$t('issues.freezing')"
                                    name="freezing"
                                    class="bottom__pane">
                                    <div class="table__scroll">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>
                                                    {{ $t('issues.holder') }}
                                                </th>
                                                <th>
                                                    {{ $t('issues.direction') }}
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <template
                                                v-for="(freeze, i) in freezes[denom]">
                                                <tr
                                                    :key="i+freeze.address">
                                                    <td>
                                                        <k-address
                                                            class="item-details__value"
                                                            :address="freeze.address"
                                                            :ellipsis="true"/>
                                                    </td>
                                                    <td>
                                                        <template v-if="freeze.in">
                                                            <div class="item-details__value">
                                                                <font-awesome-icon icon="arrow-up"/>
                                                                {{ $t('issues.in') }}
                                                            </div>
                                                        </template>
                                                        <template v-if="freeze.out">
                                                            <div class="item-details__value">
                                                                <font-awesome-icon
                                                                    icon="arrow-down"/>
                                                                {{ $t('issues.out') }}
                                                            </div>
                                                        </template>
                                                    </td>
                                                    <template v-if="owner">
                                                        <td class="issue__actions">
                                                            <div class="item-details__btns">
                                                                <router-link
                                                                    class="el-button"
                                                                    :to="`/issues/unfreeze?denom=${token.denom}&holder=${freeze.address}&op=${[...(freeze.in ? ['in'] : []), ...(freeze.out ? ['out'] : [])].join('-') }`">
                                                                    <font-awesome-icon
                                                                        icon="sun"/>
                                                                    <span>
                                                            {{ $t('issues.unfreeze') | upper }}
                                                        </span>
                                                                </router-link>
                                                            </div>
                                                        </td>
                                                    </template>
                                                </tr>
                                                <template v-if="owner">
                                                    <tr
                                                        :key="i+freeze.address+1"
                                                        class="issue__actions__row">
                                                        <td>
                                                            <div class="item-details__btns">
                                                                <router-link
                                                                    class="el-button"
                                                                    :to="`/issues/unfreeze?denom=${token.denom}&holder=${freeze.address}&op=${[...(freeze.in ? ['in'] : []), ...(freeze.out ? ['out'] : [])].join('-') }`">
                                                                    <font-awesome-icon
                                                                        icon="sun"/>
                                                                </router-link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </template>
                                            </template>
                                            </tbody>
                                        </table>
                                    </div>
                                </el-tab-pane>
                            </template>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false">
            <component
                :is="dialog"
                :issue="issueToken"/>
        </el-dialog>
    </k-card>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import numeral from 'numeral';
    import {DEFAULT_DENOM, explorerDomain} from '../constants';
    import icon1 from '../assets/icon-to.svg';
    import icon2 from '../assets/icon-from.svg';
    import ChangeFeaturesForm from '../components/Issues/ChangeFeatures/ChangeFeaturesForm';
    import ChangeDescriptionForm
        from '../components/Issues/ChangeDescription/ChangeDescriptionForm';
    import TransferOwnershipForm
        from '../components/Issues/TransferOwnership/TransferOwnershipForm';

    export default {
        name: 'Issue',
        components: {ChangeFeaturesForm, ChangeDescriptionForm},
        data() {
            return {
                icon1,
                icon2,
                domain: explorerDomain,
                error: undefined,
                denom: this.$route.params.denom || DEFAULT_DENOM,
                dialogVisible: false,
                dialogTitle: '',
                dialog: null,
                issueToken: undefined,
                tab: 'allowances',
            };
        },
        computed: {
            ...mapState('account', ['balance', 'keyStore', 'txs', 'tokenMap']),
            ...mapState('issue', ['issues', 'allowances', 'freezes']),
            ...mapGetters('account', {address: 'currentAddress'}),
            owner() {
                return this.issueToken ? this.issueToken.owner === this.address : false;
            },
            token() {
                return this.balance.find(b => b.denom === this.denom) || {denom: ''};
            },
        },
        async mounted() {
            this.$store.dispatch('account/fetchBalance', this.address);
            this.$store.dispatch('issue/fetchIssues', this.address);
            this.$store.dispatch('issue/fetchAllowances', {
                ownerAddr: this.address,
                denom: this.denom,
            });

            this.$store.dispatch('issue/fetchFreezes', {
                denom: this.denom,
            });

            try {
                const {error, result: issue} = await this.$store.dispatch('issue/fetchIssue', this.denom);
                if (error) {
                    this.error = JSON.parse(error);
                }

                this.issueToken = {
                    ...this.issueToken,
                    ...issue.value,
                };
            } catch (e) {
                console.log(e);
            }
        },
        methods: {
            numeral,
            changeFeatures() {
                this.dialogVisible = true;
                this.dialogTitle = this.$t('issues.change_features');

                this.dialog = ChangeFeaturesForm;
            },
            changeDescription() {
                this.dialogVisible = true;
                this.dialogTitle = this.$t('issues.change_description');

                this.dialog = ChangeDescriptionForm;
            },
            transferOwnership() {
                this.dialogVisible = true;
                this.dialogTitle = this.$t('issues.transfer_ownership');

                this.dialog = TransferOwnershipForm;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .container {
        .top {
            &__asset {
                display: flex;

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
                    align-content: center;
                    justify-content: center;

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

        table {
            tr {
                th {
                    font-size: 12px;
                    text-align: left;
                    padding: 0 50px 0 0;
                }

                td {
                    font-size: 14px;
                    padding: 0 20px 0 0;
                }
            }
        }

        .issue {
            &__actions {
                span {
                    @media (max-width: $xs) {
                        display: none;
                    }
                }

                @media (max-width: $xxs) {
                    display: none;
                }

                &__row {
                    @media (min-width: $xxs) {
                        display: none;
                    }
                }
            }
        }

        > .TransactionList {
            margin-top: 10px;

            .empty {
                margin: $padding-large;
                text-align: center;
                color: rgba(255, 255, 255, 0.5);
            }

            p {
                margin-top: 16px;
                text-align: center;
            }
        }
    }

    @include responsive($sm) {
        .asset-container {
            padding: 16px;

            .asset-top {
                flex-direction: column;

                > .top-center {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0;

                    > p {
                        padding: 0 10px;
                    }
                }

                > .top-right {
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
