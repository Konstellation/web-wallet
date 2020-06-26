    <template>
    <k-card>
        <template v-if="loading">
            <div class="loading">
                <font-awesome-icon
                    icon="spinner"
                    class="fa-spin"/>
            </div>
        </template>
        <template v-else-if="err">
            <div class="not-exist">
                {{ $t('send.txNotExist') }}
            </div>
        </template>
        <template v-else>
            <div class="item-details">
                <data-item :label="$t('send.amount')">
                    {{ get(tx, 'amount') | formatAmount }}
                </data-item>
                <data-item :label="$t('send.sender')">
                    <k-address
                        :address="get(tx, 'from_address')"/>
                </data-item>
                <data-item :label="$t('send.address')">
                    <k-address
                        :address="get(tx, 'to_address')"/>
                </data-item>
                <data-item :label="$t('send.fee')">
                    {{ get(tx, 'fee') | formatFee }}
                </data-item>
                <data-item :label="$t('send.gas')">
                    {{ get(tx, 'gas') | formatGas }}
                </data-item>
                <data-item :label="$t('send.txHash')">
                    {{ get(tx, 'txhash') }}
                </data-item>
                <data-item :label="$t('send.block')">
                    {{ get(tx, 'height') }}
                </data-item>
                <data-item :label="$t('send.time')">
                    {{ get(tx, 'timestamp') | formatTime }}
                </data-item>
            </div>
            <div class="btns">
                <el-button
                    class="btns__btn"
                    @click="goSendForm">
                    {{ $t('send.again') | upper }}
                </el-button>
                <router-link
                    class="btns__btn__a"
                    to="/main?tab=assets">
                    <el-button
                        class="btns__btn">
                        {{ $t('send.back') | upper }}
                    </el-button>
                </router-link>
            </div>
        </template>
    </k-card>
</template>

<script>
    import {mapState} from 'vuex';
    import {get} from 'lodash';
    import moment from 'dayjs';
    import {DEFAULT_DENOM, DEFAULT_FEE, DEFAULT_GAS} from '../../constants';
    import View from '../../views/View';

    export default {
        name: 'Send',
        extends: View,
        data () {
            return {
                err: true,
                loading: false,
                interval: null,
                tx: {
                    amount: [
                        {
                            amount: 0,
                            denom: DEFAULT_DENOM,
                        },
                    ],
                    gas: {
                        used: 0,
                        wanted: DEFAULT_GAS,
                    },
                    fee: {
                        amount: DEFAULT_FEE,
                        denom: DEFAULT_DENOM,
                    },
                    txhash: '',
                    height: '',
                    timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
                    from_address: '',
                    to_address: '',
                },
            };
        },
        computed: {
            ...mapState('account', []),
            ...mapState('transactions', ['form', 'result']),

        },
        async mounted () {
            const self = this;
            this.loading = true;
            let counter = 50;
            this.interval = setInterval(async () => {
                const {error} = await self.getTx();
                if (!error) {
                    const {
                        tx: {
                            value: {
                                msg: [
                                    {
                                        value: {
                                            amount,
                                            to_address,
                                            from_address,
                                        },
                                    },
                                ],
                                fee: {
                                    amount: fee,
                                },
                            },
                        },
                        gas_used: used,
                        gas_wanted: wanted,
                        height,
                        txhash,
                        timestamp,
                    } = await self.getTx();
                    self.tx = {
                        amount,
                        gas: {
                            used,
                            wanted,
                        },
                        height,
                        timestamp,
                        txhash,
                        fee,
                        from_address,
                        to_address,
                    };
                    self.loading = false;
                    self.err = false;
                    clearInterval(self.interval);
                }
                counter--;

                if (counter === 0) {
                    self.loading = false;
                    clearInterval(self.interval);
                }
            }, 1000);
        },
        methods: {
            get,
            moment,
            getTx () {
                const {hash} = this.$route.params;
                return this.$store.dispatch('transactions/fetchTxInfo', hash);
            },
            goSendForm () {
                sessionStorage.removeItem('sendForm');
                this.$router.push({path: '/send/form'});
            },
        },
    };
</script>

<style lang="scss" scoped>
    .loading {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-basis: 100%;
        min-height: 500px;
        font-size: 34px;
        color: $color-active;
    }

    .not-exist {
        display: flex;
        flex-direction: column;
        color: $color-error;
        background: $color-primary;
        padding: 16px;
        min-height: 100px;
        justify-content: center;
    }
</style>
