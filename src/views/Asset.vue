<template>
    <k-card>
        <template v-if="loading">
            <div class="loading">
                <font-awesome-icon
                    icon="spinner"
                    class="fa-spin"/>
            </div>
        </template>
        <template v-else-if="loading === false && token === undefined">
            <div class="error">
                {{ $t('send.tokenNotExist') }}
            </div>
        </template>
        <template v-else>
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
                                to="/receive">
                                <img
                                    alt="receive"
                                    :src="icon2">
                                {{ $t('main.receive') }}
                            </router-link>
                            <template v-if="isIssue">
                                <router-link
                                    class="top__btn"
                                    :to="`/issues/transfer?denom=${token.denom}`">
                                    <img
                                        alt="transfer"
                                        :src="icon2">
                                    {{ $t('issues.transfer') }}
                                </router-link>
                                <router-link
                                    class="top__btn"
                                    :to="`/issues/transfer-from?denom=${token.denom}`">
                                    <img
                                        alt="transferFrom"
                                        :src="icon2">
                                    {{ $t('issues.transfer_from') }}
                                </router-link>
                            </template>
                            <template v-else>
                                <div
                                    class="top__btn"
                                    @click="goSendForm">
                                    <img
                                        :src="icon1"
                                        alt="send"/>
                                    {{ $t('main.send') }}
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="TransactionList">
                    <div
                        v-if="transaction.length === 0"
                        class="empty">
                        {{ $t('main.empty') }}
                    </div>
                    <transaction-list :list="transaction"/>
                </div>
            </div>
        </template>
    </k-card>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
    import numeral from 'numeral';
    import { map } from 'lodash';
    import { explorerDomain } from '../constants';
    import icon1 from '../assets/icon-to.svg';
    import icon2 from '../assets/icon-from.svg';

    export default {
        name: 'Asset',
        data() {
            return {
                icon1,
                icon2,
                denom: '',
                isIssue: false,
                domain: explorerDomain,
            };
        },
        computed: {
            ...mapState('account', ['balance', 'keyStore', 'txs', 'loading']),
            ...mapState('transactions', { txLoading: 'loading', txs: 'txs' }),
            ...mapGetters('account', { address: 'currentAddress' }),
            token() {
                return this.balance.find(b => b.denom === this.denom);
            },
            transaction() {
                return this.txs.filter(item => map(item.tx.value.msg[0].value.amount, 'denom')
                    .indexOf(this.denom) > -1);
            },
        },
        beforeMount() {
            const { denom } = this.$route.params;
            this.denom = denom;
        },
        async mounted() {
            this.$store.dispatch('account/fetchBalance');
            this.$store.dispatch('transactions/fetchTxs', this.keyStore);
            const { result: issue } = await this.$store.dispatch('issue/fetchIssue', this.denom);
            if (issue) {
                this.isIssue = true;
            }
        },
        methods: {
            numeral,
            goSendForm() {
                sessionStorage.removeItem('sendForm');
                this.$router.push({ path: '/send/form' });
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
