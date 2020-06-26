<template>
    <k-page
        :title="$t('assets.title')">
        <div class="container">
            <div class="top">
                <div class="top__left">
                    <div class="top__left__box">
                        <div class="top__asset">
                            <div class="top__account__img">
                                <div class="top__account__logo-none">
                                    <img
                                        :alt="userName"
                                        :src="icon">
                                </div>
                            </div>
                            <div class="top__account__info">
                                <p class="top__account__title">
                                    {{ $t('assets.owner') }}
                                </p>
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
            <assets/>
        </div>
    </k-page>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
    import numeral from 'numeral';
    import { explorerDomain } from '../constants';
    import icon1 from '../assets/icon-to.svg';
    import icon2 from '../assets/icon-from.svg';
    import icon from '../assets/icon-wallet.svg';

    export default {
        name: 'AssetsMain',
        data() {
            return {
                icon,
                icon1,
                icon2,
                domain: explorerDomain,
            };
        },
        computed: {
            ...mapState('account', ['userName', 'balance', 'keyStore', 'txs']),
            ...mapState('issue', ['issues', 'loading']),
            ...mapGetters('account', { address: 'currentAddress' }),
        },
        mounted() {
            this.$store.dispatch('issue/fetchIssues', this.address);
        },
        methods: {
            numeral,
            goSendForm() {
                sessionStorage.removeItem('sendForm');

                this.$router.push({ path: 'send/form' });
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

                &__title {
                    font-size: 12px;
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
