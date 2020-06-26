<template>
    <div
        v-if="!isEmpty(detailData)"
        class="balance-container"
        @click="goAssets">
        <div class="logo-none">
            {{ $t("main.receive") }}
        </div>
        <div class="name">
            {{ viewToken.amount | formatNumber }} {{ viewToken.denom }}
        </div>
        <div
            v-if="detailData.name.length > 4"
            class="boxName">
            {{ `${detailData.name.slice(0,4)}...` }}({{ detailData.id }})
        </div>
        <div
            v-else
            class="boxName">
            {{ detailData.name }}({{ detailData.id }})
        </div>
        <div class="time">
                <span v-if="withdrawDisabled">
                    {{ $t("freeze.end") }}: {{ maturityTime | formatTime }}
                </span>
            <span
                v-else
                class="endTime">
                    {{ $t("future.expire") }}
                </span>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {getViewToken} from '@/utils/helpers';
    import {isEmpty} from 'lodash';
    import BigNumber from 'bignumber.js';

    export default {
        name: 'ReceivePanel',
        props: {
            token: {type: Object, required: true},
        },
        computed: {
            ...mapState('account', ['tokenMap']),
            detailData () {
                return this.futureMap[this.token.denom.slice(0, 14)] || {};
            },
            withdrawDisabled () {
                if (parseInt(this.maturityTime) > parseInt(this.nowTime)) {
                    return true;
                }
                return false;
            },
            nowTime () {
                return Date.parse(new Date())
                    .toString()
                    .substring(0, 10);
            },
            maturityTime () {
                const period = parseInt(
                    this.token.denom.slice(
                        this.token.denom.length - 2,
                        this.token.denom.length,
                    ),
                );
                return this.detailData.future.time[period - 1];
            },
            viewToken () {
                if (this.detailData.total_amount.token.denom === 'agard') {
                    return {
                        denom: 'GARD',
                        amount: BigNumber(this.token.amount)
                            .dividedBy(Math.pow(10, 1))
                            .toFixed(),
                    };
                }
                const token = {
                    denom: this.detailData.total_amount.token.denom,
                    amount: this.token.amount,
                };
                return getViewToken(token, this.tokenMap);
            },
        },
        mounted () {
            this.$store.dispatch('future/fetchDetail', this.token.denom.slice(0, 14));
        },
        methods: {
            isEmpty,
            goAssets () {
                sessionStorage.setItem('maturityTime', this.maturityTime);
                sessionStorage.setItem(
                    'token',
                    JSON.stringify({
                        denom: this.detailData.total_amount.token.denom,
                        amount: this.token.amount,
                    }),
                );
                this.$router.push({
                    path: `receiveVoucher/${this.token.denom}`,
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .balance-container {
        flex-basis: 216px;
        height: 230px;
        text-align: center;
        background: white;
        color: rgba(0, 0, 0, 0.75);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: $padding-basic;
        border-radius: 4px;
        cursor: pointer;

        img {
            width: 40px;
            height: 40px;
            margin-top: 8px;
            margin-bottom: 16px;
            position: relative;
            top: 2px;
        }

        .logo-none {
            width: 48px;
            height: 48px;
            margin-top: 4px;
            margin-bottom: 12px;
            position: relative;
            top: 2px;
            background: rgb(237, 106, 102);
            border-radius: 24px;
            text-align: center;
            line-height: 48px;
            color: #fff;
            font-size: 12px;
        }

        .name {
            font-size: 18px;
            margin-bottom: 16px;
        }

        .time {
            font-size: 14px;
            color: gray;
        }

        .endTime {
            color: $color-error;
        }
    }
</style>
