<template>
    <k-page
        class="main-container">
        <div class="container">
            <div class="top">
                <div class="top__left">
                    <div class="top__left__box">
                        <div class="top__account">
                            <div class="top__account__img">
                                <div class="top__account__logo-none">
                                    <img
                                        :alt="userName"
                                        :src="icon">
                                </div>
                            </div>
                            <div class="top__account__info">
                                <p class="top__account__name">
                                    {{ userName }}
                                </p>
                                <p class="top__account__address">
                                    <k-address
                                        :address="address"
                                        :ellipsis="true"/>
                                </p>
                            </div>
                        </div>
                        <div class="top__balance">
                            <div class="top__balance__img">
                                <div class="top__balance__logo-none">
                                </div>
                            </div>
                            <div class="top__balance__info">
                                <p class="top__balance__title">
                                    {{ $t('main.balance') }}
                                </p>
                                <p class="top__balance__amount">
                                    {{ token.amount | formatNumber }}
                                </p>
                                <p class="top__balance__denom">
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
                            to="receive">
                            <img
                                alt="receive"
                                :src="icon2">
                            {{ $t('main.receive') }}
                        </router-link>
                        <div
                            class="top__btn"
                            @click="goSendForm">
                            <img
                                :src="icon1"
                                alt="send"/>
                            {{ $t('main.send') }}
                        </div>
                    </div>
                </div>
            </div>
            <el-tabs
                v-model="$route.query.tab"
                class="bottom"
                :before-leave="onTabChange"
                type="card">
                <el-tab-pane
                    :label="$t('main.assets')"
                    name="assets"
                    class="bottom__pane">
                    <assets/>
                </el-tab-pane>
                <el-tab-pane
                    :label="$t('main.txs')"
                    name="txs">
                    <txs/>
                </el-tab-pane>
            </el-tabs>
        </div>
    </k-page>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import {isEmpty} from 'lodash';
    import Base64 from 'crypto-js/enc-base64';
    import sha256 from 'crypto-js/sha256';
    import icon from '../assets/icon-wallet.svg';
    import icon1 from '../assets/icon-to.svg';
    import icon2 from '../assets/icon-from.svg';
    import icon3 from '../assets/icon-setting.svg';
    import {explorerDomain} from '../constants';
    import chain from '../utils/chain';

    export default {
        name: 'Main',
        data() {
            return {
                icon,
                icon1,
                icon2,
                icon3,
                domain: explorerDomain,
            };
        },
        computed: {
            ...mapState('account', [
                'userName',
                'account',
                'keyStore',
                'balance',
                'txs',
                'loading',
                'tokenMap',
            ]),
            ...mapState('transactions', {
                txLoading: 'loading',
                txs: 'txs',
            }),
            ...mapGetters('account', {
                address: 'currentAddress',
                accountBalance: 'accountBalance',
            }),
            token() {
                return this.accountBalance;
            },
        },
        beforeMount() {
            if (!this.userName) {
                this.$router.push('/passport');
            }
            if (this.$route.query.tab === '0' || this.$route.query.tab === undefined)
                this.$router.push('/main?tab=assets');
        },
        async mounted() {
            chain.subscribeNewTxToRecipient(({data: {value: {TxResult: {tx}}}}) => {
                const hash = sha256(Base64.parse(tx))
                    .toString();

                this.$message({
                    type: 'success',
                    message: `New incoming transaction. Tx ${hash}`,
                });

                this.$store.dispatch('account/fetchBalance');
            }, this.address);

            chain.connect();

            this.onTabChange(this.$route.query.tab);
        },
        methods: {
            isEmpty,
            onTabChange(tab) {
                if (this.$route.query.tab === '0') tab = 'assets';
                this.$router.push(`/main?tab=${tab}`);

                if (tab === 'assets') {
                    this.$store.dispatch('account/fetchBalance');
                }
                if (tab === 'txs') {
                    // this.$store.dispatch('transactions/fetchTxs', this.keyStore);
                }
            },
            onCopy() {
                this.$message({
                    type: 'success',
                    message: this.$t('home.copy'),
                });
            },
            goSendForm() {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('sendForm');

                this.$router.push({path: 'send/form'});
            },
        },
    };
</script>

<style lang="scss" scoped>
    .container {
        .top {
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

            &__balance {
                display: flex;
                /*justify-content: center;*/
                /*!*flex-direction: column;*!*/
                /*align-items: start;*/

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

                @include responsive($xxs) {
                    padding-top: 16px;
                }
            }
        }
    }
</style>
