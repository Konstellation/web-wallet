<template>
    <k-page>
        <div class="asset-container">
            <div class="asset-top">
                <div class="top-left">
                    <div class="top-left-img">
                        {{ $t("main.receive") }}
                    </div>
                    <div class="top-left-info">
                        <p>
                            {{ viewToken.amount }} {{ viewToken.denom }}
                        </p>
                        <h3>
                            {{ token.denom }}
                        </h3>
                        <h3>
                            {{ detailData.name }}({{ detailData.id }})
                        </h3>
                        <h3>
                            {{ $t("lockInput.creatTime") }}:
                            {{ detailData.created_time | formatTime }}
                        </h3>
                        <h3>{{ $t("freeze.end") }}: {{ maturityTime | formatTime }}</h3>
                    </div>
                </div>
                <div
                    v-if="!isEmpty(detailData)"
                    class="top-right">
                    <el-button
                        :disabled="detailData.transfer_disabled"
                        type="primary"
                        @click="send">
                        {{ $t('main.send') }}
                    </el-button>
                    <el-button
                        :disabled="withdrawDisabled"
                        type="warning"
                        @click="onSubmit">
                        {{ $t('receiveVoucher.extract') }}
                    </el-button>
                </div>
            </div>
            <div class="TransactionList">
                <transaction-list :list="sendFilter"/>
            </div>
            <el-dialog
                :title="$t('create.pass')"
                :visible.sync="dialogVisible"
                width="360px"
                :close-on-click-modal="false">
                <el-input
                    v-model="pass"
                    type="password"
                    :placeholder="$t('create.pass')"
                    @keyup.enter.native="withdraw(false)">
                </el-input>
                <span
                    slot="footer"
                    class="dialog-footer">
                        <el-button @click="withdraw(false)">
                            {{ $t('global.ok') }}
                        </el-button>
                </span>
            </el-dialog>
        </div>
    </k-page>
</template>
<script>
    import {mapState, mapGetters} from 'vuex';
    import BigNumber from 'bignumber.js';
    import {getViewToken} from '@/utils/helpers';
    import {isEmpty, filter} from 'lodash';
    import {explorerDomain} from '../constants';

    export default {
        name: 'ReceiveVoucher',
        data () {
            return {
                domain: explorerDomain,
                dialogVisible: false,
                pass: '',
            };
        },
        computed: {
            ...mapState('account', ['keyStore', 'txs', 'tokenMap', 'mathAccount']),
            ...mapState('transactions', [
                {txLoading: 'loading', txs: 'txs'},
                'creatTxs',
                'sendTxs',
            ]),
            ...mapState('future', ['futureMap']),
            ...mapGetters('account', {address: 'currentAddress'}),
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
                return sessionStorage.getItem('maturityTime');
            },
            detailData () {
                return this.futureMap[this.$route.params.id.slice(0, 14)] || {};
            },
            token () {
                return JSON.parse(sessionStorage.getItem('token'));
            },
            viewToken () {
                if (this.token.denom === 'agard') {
                    return {
                        denom: 'GARD',
                        amount: BigNumber(this.token.amount)
                            .dividedBy(Math.pow(10, 1))
                            .toFixed(),
                    };
                }
                return getViewToken(this.token, this.tokenMap);
            },
            sendFilter () {
                const filterArr = filter(this.sendTxs, item => (
                    item.tx.value.msg[0].value.amount[0].denom
                    === this.$route.params.id && item.logs[0].success
                ));
                return filterArr;
            },
            boxTx () {
                const filterArr = filter(this.creatTxs, item => {
                    if (item.tags[2]) {
                        return item.tags[2].value == this.$route.params.id.slice(0, 14);
                    }
                });
                return filterArr[0] || {};
            },
        },
        mounted () {
            this.$store.dispatch(
                'future/fetchDetail',
                this.$route.params.id.slice(0, 14),
            );
            this.getCreateTxs();
            this.getSendTxs();
        },
        destroyed () {
            this.$store.commit('transactions/setCreatTxsEmpty');
            this.$store.commit('transactions/setSendTxsEmpty');
        },
        methods: {
            isEmpty,
            send () {
                sessionStorage.removeItem('sendForm');
                sessionStorage.setItem(
                    'boxAmount',
                    JSON.stringify({
                        denom: this.$route.params.id,
                        amount: this.viewToken.amount,
                        label: `${this.viewToken.denom}(${this.$route.params.id})`,
                        decimal:
                            this.detailData.total_amount.token.denom === 'agard'
                                ? 1
                                : this.tokenMap[this.detailData.total_amount.token.denom].decimals,
                    }),
                );
                this.$router.push({path: '/send/form'});
            },
            onSubmit () {
                // use math wallet
                if (!isEmpty(this.mathAccount)) {
                    this.withdraw(true);
                    return;
                }
                // else use local wallet
                this.pass = '';
                this.dialogVisible = true;
            },
            async withdraw (useMathWallet) {
                if (!useMathWallet && !this.pass) {
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
                const params = {
                    id: this.$route.params.id,
                    pass: this.pass,
                };
                let res = '';
                try {
                    res = await this.$store.dispatch('future/bankWithdraw', params);
                } catch (e) {
                    this.$message({
                        type: 'error',
                        message: this.$t('send.error'),
                        center: true,
                    });
                }
                if (res.txhash) {
                    this.dialogVisible = false;
                    this.$message({
                        type: 'success',
                        message: this.$t('global.success', {
                            name: this.$t('receiveVoucher.extract'),
                        }),
                        center: true,
                        duration: 1000,
                        onClose: () => {
                            this.$router.push({
                                path: '/main?tab=receiveVoucher',
                            });
                        },
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: this.$t(`send.${res}`),
                        center: true,
                    });
                }
                loading.close();
            },
            goDetail () {
                this.$router.push({
                    path: `/future/detail/${this.$route.params.id.slice(0, 14)}`,
                });
            },
            getCreateTxs () {
                const params = {action: 'create', limit: 100, page: 1};
                this.$store.dispatch('transactions/fetchTxsAll', params);
            },
            getSendTxs () {
                const params = {
                    action: 'send',
                    limit: 100,
                    page: 1,
                    sender: this.keyStore.address,
                };
                this.$store.dispatch('transactions/fetchTxsAll', params);
            },
        },
    };
</script>
<style lang="scss" scoped>
    .asset-container {
        max-width: $max-width;
        margin: 0 auto $padding-large;
        padding: $padding-large;

        > .asset-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: $color-primary-light;
            box-shadow: $shadow;
            padding: $padding-large;
            border-radius: 10px;

            > .top-left {
                display: flex;
                justify-content: space-between;
                align-items: center;

                > .top-left-img {
                    background: rgb(237, 106, 102);
                    height: 80px;
                    width: 80px;
                    text-align: center;
                    line-height: 80px;
                    border-radius: 40px;
                }

                > .top-left-info {
                    margin-left: 10px;

                    > p {
                        font-size: 16px;
                        color: #fff;
                        font-weight: bolder;
                        height: 30px;
                        line-height: 30px;
                    }

                    > h3 {
                        font-size: 14px;
                        color: rgba(255, 255, 255, 0.6);
                        height: 30px;
                        line-height: 30px;
                    }
                }
            }

            > .top-right {
                .el-button {
                    margin-left: 10px;
                }

                .el-button--primary {
                    background: rgb(74, 170, 248);
                    border-color: rgb(74, 170, 248);
                }
            }
        }

        > .TransactionList {
            margin-top: 10px;

            .tx-row {
                color: rgba(255, 255, 255, 0.6);
                display: flex;
                align-items: center;
                padding: 16px;
                margin: 8px 0;
                background: $color-primary-light;
                border-radius: 10px;
                cursor: pointer;

                &:hover {
                    box-shadow: $shadow;
                }

                .img-div {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    margin-right: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .img-div-receive {
                    background: rgb(55, 30, 255);
                }

                .img-div-send {
                    background: rgb(182, 56, 81);
                }

                .ellipsis {
                    color: rgb(255, 255, 255);
                }

                img {
                    width: 20px;
                }

                .txhash {
                    flex-grow: 1;
                }

                .amount {
                    font-size: 20px;
                    text-align: right;

                    &.send {
                        color: $color-error;
                    }

                    &.receive {
                        color: #fff;
                    }
                }
            }
        }
    }

    @include responsive($sm) {
        .asset-container {
            padding: 16px;

            .asset-top {
                flex-direction: column;

                .top-left {
                    flex-direction: column;
                    text-align: center;

                    > .top-left-info {
                        margin-left: 10px;

                        > p {
                            height: inherit;
                        }

                        > h3 {
                            height: inherit;
                        }
                    }
                }

                > .top-center {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0;

                    > p {
                        padding: 0 10px;
                    }
                }
            }

            .tx-row {
                flex-direction: column;
            }
        }
    }
</style>
