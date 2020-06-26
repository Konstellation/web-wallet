<template>
    <div class="list">
        <router-link
            v-for="tx in flist"
            :key="tx.txhash"
            :to="`/tx/${tx.txhash}`"
            class="list__row">
            <div class="txinfo">
                <div class="txhash">
                    <k-link
                        type="tx"
                        :content="tx.txhash"
                    />
                </div>
                <div class="action">
                    {{ actions[tx.action] ? $t(actions[tx.action].title) : tx.action }}
                </div>
                <div class="tx__timestamp">
                    {{ tx.timestamp | formatTime }}
                </div>
            </div>

            <div class="tx__amount">
                <div class="tx__amount">
                    <font-awesome-icon
                        v-if="tx.icon"
                        :icon="tx.icon"
                        :class="tx.class"/>
                    {{ tx.amount | formatAmount }}
                </div>
                <div class="tx__fee">
                    <font-awesome-icon icon="coins"/>
                    {{ get(tx, 'tx.value.fee.amount') | formatAmount }}
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
    import { get } from 'lodash';
    import { mapGetters, mapState } from 'vuex';
    import actions from '../../constants/actions';
    import { formatWithdraw } from '../../utils/filters';
    import { DEFAULT_DENOM } from '../../constants';

    export default {
        props: {
            list: Array,
            load: { type: Boolean, default: false },
        },
        data() {
            return {
                actions,
            };
        },
        computed: {
            ...mapState('account', ['tokenMap']),
            ...mapGetters('account', {
                address: 'currentAddress',
            }),
            flist() {
                return this.list.map(tx => this.formatTx(tx));
            },
        },
        watch: {},
        beforeMount() {
            this.$store.dispatch('transactions/fetchTxs');
        },
        methods: {
            get,
            formatTx(tx) {
                const action = get(tx, 'events').find(e => e.type === 'message').attributes.find(a => a.key === 'action').value;
                const info = actions[action] ? get(tx, 'events').find(e => e.type === actions[action].type) : '';

                tx.action = action;
                switch (action) {
                    case 'transfer':
                    case 'transfer_from':
                    case 'send':
                        const fromAddr = get(tx, 'tx.value.msg.0.value.from_address');
                        const toAddr = get(tx, 'tx.value.msg.0.value.to_address');

                        if (this.address === fromAddr && this.address === toAddr) {
                            return {
                                icon: 'equals',
                                class: 'img-eq',
                                amount: get(tx, 'tx.value.msg.0.value.amount'),
                                ...tx,
                            };
                        }

                        if (this.address === fromAddr) {
                            return {
                                icon: 'arrow-up',
                                class: 'img-send',
                                amount: get(tx, 'tx.value.msg.0.value.amount'),
                                ...tx,
                            };
                        }

                        if (this.address === toAddr) {
                            return {
                                icon: 'arrow-down',
                                class: 'img-receive',
                                amount: get(tx, 'tx.value.msg.0.value.amount'),
                                ...tx,
                            };
                        }
                        break;
                    case 'withdraw_delegator_reward':
                        return {
                            icon: 'percent',
                            class: 'img-reward',
                            amount: formatWithdraw(info.attributes.find(a => a.key === 'amount').value || '0darc'),
                            ...tx,
                        };
                    case 'delegate':
                        return {
                            icon: 'angle-double-up',
                            class: 'img-delegate',
                            amount: get(tx, 'tx.value.msg.0.value.amount'),
                            ...tx,
                        };
                    case 'begin_redelegate':
                        return {
                            icon: 'angle-double-right',
                            class: 'img-redelegate',
                            amount: get(tx, 'tx.value.msg.0.value.amount'),
                            ...tx,
                        };
                    case 'begin_unbonding':
                        return {
                            icon: 'angle-double-down',
                            class: 'img-unbond',
                            amount: {
                                amount: get(info, 'attributes').find(a => a.key === 'amount').value,
                                denom: DEFAULT_DENOM,
                            },
                            ...tx,
                        };
                    case 'submit_proposal':
                        return {
                            icon: 'poll',
                            class: 'img-vote',
                            amount: formatWithdraw(get(tx, 'events').find(e => e.type === 'proposal_deposit').attributes.find(a => a.key === 'amount').value || '0darc'),
                            ...tx,
                        };
                    case 'deposit':
                        return {
                            icon: 'comment-dollar',
                            class: 'img-vote',
                            amount: formatWithdraw(get(tx, 'events').find(e => e.type === 'proposal_deposit').attributes.find(a => a.key === 'amount').value || '0darc'),
                            ...tx,
                        };
                    case 'vote':
                        return {
                            icon: 'vote-yea',
                            class: 'img-vote',
                            amount: '0darc',
                            ...tx,
                        };
                    case 'issue_create':
                        const { value: issuance } = get(info, 'attributes').find(a => a.key === 'amount');

                        return {
                            icon: 'seedling',
                            class: 'img-seedling',
                            amount: {
                                amount: issuance.match(/[0-9]+/)[0],
                                denom: issuance.split(/[0-9]+/)[1],
                            },
                            ...tx,
                        };
                    case 'approve':
                        const { value: approval } = get(info, 'attributes').find(a => a.key === 'amount');

                        return {
                            icon: 'shield',
                            amount: {
                                amount: approval.match(/[0-9]+/)[0],
                                denom: approval.split(/[0-9]+/)[1],
                            },
                            ...tx,
                        };
                    case 'mint':
                        const { value: mint } = get(info, 'attributes').find(a => a.key === 'amount');

                        return {
                            icon: 'hammer',
                            amount: {
                                amount: mint.match(/[0-9]+/)[0],
                                denom: mint.split(/[0-9]+/)[1],
                            },
                            ...tx,
                        };
                    default:
                        return {
                            ...tx,
                        };
                }
                return tx;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .list {
        max-height: 45vh;
        overflow-y: scroll;

        &__row {
            .tx {
                &__info {
                    display: flex;
                    flex-direction: column;
                }

                &__hash {
                    color: white;
                }
            }

            .amount {
                font-size: 20px;
                text-align: right;
            }
        }

        .tx-row:first-child {
            margin-top: 0;
        }
    }
</style>
