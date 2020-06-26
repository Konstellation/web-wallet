<template>
    <k-page
        :title="`Tx ${$route.params.hash}`">
        <k-card>
            <template v-if="loading">
                <div class="loading">
                    <font-awesome-icon
                        icon="spinner"
                        class="fa-spin"/>
                </div>
            </template>
            <template v-else-if="loading === false && tx === undefined">
                <div class="error">
                    {{ $t('send.txNotExist') }}
                </div>
            </template>
            <template v-else>
                <div class="item-details tx">
                    <div class="tx__info">
                        <div class="tx__hash">
                            <k-hash-copy :text="get(tx, 'txhash')"/>
                        </div>
                        <div class="tx__block">
                            <div class="item-details__label">
                                {{ $t('send.block') }}
                            </div>
                            <div class="tx__block__height">
                                <k-text-copy :text="get(tx, 'height')"/>
                            </div>
                        </div>
                    </div>
                    <template v-if="tx.code">
                        <div class="error">
                            <template v-if="tx.log">
                                {{ JSON.parse(tx.log).message }}
                            </template>
                            <template v-else>
                                {{
                                JSON.parse(tx.raw_log).message.split('stack:')[0].split('recovered:')[1]
                                }}
                            </template>
                        </div>
                    </template>
                    <template v-if="!invalid">
                        <div class="tx__type">
                            {{ $t(type) }}
                        </div>
                        <template v-if="info">
                            <template v-if="action === 'send' || action === 'transfer'">
                                <div class="tx__content tx__transfer">
                                    <div class="tx__transfer__sender">
                                        <div class="item-details__label">
                                            {{ $t('send.from') }}
                                        </div>
                                        <k-address
                                            :address="get(tx, 'tx.value.msg.0.value.from_address')"/>
                                    </div>
                                    <div class="arrow">
                                        <div class="arrow__top"></div>
                                        <div class="arrow__bottom"></div>
                                    </div>
                                    <div class="tx__transfer__amount">
                                        <div class="item-details__label">
                                            {{ $t('send.amount') }}
                                        </div>
                                        {{ get(tx, 'tx.value.msg.0.value.amount') | formatAmount }}
                                    </div>
                                    <div class="arrow">
                                        <div class="arrow__top"></div>
                                        <div class="arrow__bottom"></div>
                                    </div>
                                    <div class="tx__transfer__recipient">
                                        <div class="item-details__label">
                                            {{ $t('send.to') }}
                                        </div>
                                        <k-address
                                            :address="get(tx, 'tx.value.msg.0.value.to_address')"/>
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="action === 'withdraw_delegator_reward'">
                                <div class="tx__content tx__withdraw">
                                    <div class="tx__withdraw__validator">
                                        <div class="item-details__label">
                                            {{ $t('distribution.validator') }}
                                        </div>
                                        <k-address
                                            class="tx__withdraw__validator__address"
                                            :address="info.attributes.find(e => e.key === 'validator').value"/>
                                    </div>
                                    <div class="tx__withdraw__reward">
                                        <div class="item-details__label">
                                            {{ $t('distribution.reward') }}
                                        </div>
                                        {{ info.attributes.find(e => e.key === 'amount').value
                                        | formatWithdraw | formatAmount }}
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="action === 'withdraw_validator_commission'">
                                <div class="tx__content tx__withdraw">
                                    <div>
                                        <div class="">
                                            {{ $t('distribution.withdraw_validator_commission') }}
                                        </div>
                                        <div class="tx__withdraw__validator">
                                            <div class="item-details__label">
                                                {{ $t('distribution.validator') }}
                                            </div>
                                            <k-address
                                                class="tx__delegate__validator__address"
                                                :address="get(tx, 'tx.value.msg.0.value.validator_address')"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="">
                                            {{ $t('distribution.withdraw_delegator_reward') }}
                                        </div>
                                        <div class="tx__withdraw__delegator">
                                            <div class="item-details__label">
                                                {{ $t('distribution.delegator') }}
                                            </div>
                                            <k-address
                                                class="tx__delegate__delegator__address"
                                                :address="get(tx, 'tx.value.msg.1.value.delegator_address')"/>
                                        </div>
                                        <div class="tx__withdraw__validator">
                                            <div class="item-details__label">
                                                {{ $t('distribution.validator') }}
                                            </div>
                                            <k-address
                                                class="tx__delegate__validator__address"
                                                :address="get(tx, 'tx.value.msg.1.value.validator_address')"/>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="action === 'delegate'">
                                <div class="tx__content tx__delegate">
                                    <div class="tx__delegate__validator">
                                        <div class="item-details__label">
                                            {{ $t('staking.operator') }}
                                        </div>
                                        <k-address
                                            class="tx__delegate__validator__address"
                                            :address="info.attributes.find(e => e.key === 'validator').value"/>
                                    </div>
                                    <div class="tx__delegate__reward">
                                        <div class="tx__label">
                                            {{ $t('staking.tokens') }}
                                        </div>
                                        {{ info.attributes.find(e => e.key === 'amount').value
                                        | toToken | formatAmount }}
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="action === 'begin_redelegate'">
                                <div class="tx__content tx__redelegate">
                                    <div class="tx__redelegate__sender">
                                        <div class="tx__label">
                                            {{ $t('staking.fromValidator') }}
                                        </div>
                                        <k-address
                                            :address="info.attributes.find(e => e.key === 'source_validator').value"/>
                                    </div>
                                    <div class="arrow">
                                        <div class="arrow__top"></div>
                                        <div class="arrow__bottom"></div>
                                    </div>
                                    <div class="tx__redelegate__amount">
                                        <div class="item-details__label">
                                            {{ $t('staking.tokens') }}
                                        </div>
                                        {{ info.attributes.find(e => e.key === 'amount').value
                                        | toToken | formatAmount }}
                                    </div>
                                    <div class="arrow">
                                        <div class="arrow__top"></div>
                                        <div class="arrow__bottom"></div>
                                    </div>
                                    <div class="tx__redelegate__recipient">
                                        <div class="item-details__label">
                                            {{ $t('staking.toValidator') }}
                                        </div>
                                        <k-address
                                            :address="info.attributes.find(e => e.key === 'destination_validator').value"/>
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="action === 'begin_unbonding'">
                                <div class="tx__content tx__unbonding">
                                    <div class="tx__unbonding__validator">
                                        <div class="item-details__label">
                                            {{ $t('staking.operator') }}
                                        </div>
                                        <k-address
                                            class="tx__unbonding__validator__address"
                                            :address="info.attributes.find(e => e.key === 'validator').value"/>
                                    </div>
                                    <div class="tx__unbonding__amount">
                                        <div class="item-details__label">
                                            {{ $t('staking.tokens') }}
                                        </div>
                                        {{ info.attributes.find(e => e.key === 'amount').value
                                        | toToken | formatAmount }}
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="action === 'unjail'">
                                <div class="tx__content tx__unjail">
                                    <div class="tx__unjail__validator">
                                        <div class="item-details__label">
                                            {{ $t('staking.operator') }}
                                        </div>
                                        <k-address
                                            class="tx__unbonding__validator__address"
                                            :address="get(tx, 'tx.value.msg.0.value.address')"/>
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="action === 'submit_proposal'">
                                <div class="tx__content tx__voting">
                                    <div class="tx__proposal">
                                        <div class="item-details__label">
                                            {{ $t('common.id') }}
                                        </div>
                                        {{ info.attributes.find(a => a.key === 'proposal_id').value
                                        }}
                                    </div>
                                    <div class="tx__deposit__amount">
                                        <div class="item-details__label">
                                            {{ $t('gov.proposal.fields.total_deposit') }}
                                        </div>
                                        {{ tx.events.find(e => e.type ===
                                        'proposal_deposit').attributes.find(a => a.key ===
                                        'amount').value
                                        ||
                                        "0darc" | formatWithdraw | formatAmount }}
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="action === 'deposit'">
                                <div class="tx__content tx__voting">
                                    <div class="tx__proposal">
                                        <div class="item-details__label">
                                            {{ $t('common.id') }}
                                        </div>
                                        {{ info.attributes.find(a => a.key === 'proposal_id').value
                                        }}
                                    </div>
                                    <div class="tx__deposit__amount">
                                        <div class="item-details__label">
                                            {{ $t('gov.proposal.fields.total_deposit') }}
                                        </div>
                                        {{ info.attributes.find(a => a.key === 'amount').value ||
                                        "0darc" | formatWithdraw | formatAmount }}
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="action === 'vote'">
                                <div class="tx__content tx__voting">
                                    <div class="tx__proposal">
                                        <div class="item-details__label">
                                            {{ $t('common.id') }}
                                        </div>
                                        {{ info.attributes.find(a => a.key === 'proposal_id').value
                                        }}
                                    </div>
                                    <div class="tx__deposit__amount">
                                        <div class="item-details__label">
                                            {{ $t('gov.proposal.option') }}
                                        </div>
                                        {{ info.attributes.find(a => a.key === 'option').value }}
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="action === 'issue_create'">
                                <issue-detail :detail="formatTx(tx.tx, action)"/>
                            </template>
                            <template v-else-if="action === 'approve'">
                                <approve-detail :detail="formatTx(tx.tx, action)"/>
                            </template>
                            <template v-else-if="action === 'transfer_from'">
                                <transfer-from-detail :detail="formatTx(tx.tx, action)"/>
                            </template>
                            <template v-else-if="action === 'mint'">
                                <mint-detail :detail="formatTx(tx.tx, action)"/>
                            </template>
                            <template v-else-if="action === 'burn' || action === 'burn_from'">
                                <burn-detail :detail="formatTx(tx.tx, action)"/>
                            </template>
                            <template v-else-if="action === 'freeze'">
                                <freeze-detail :detail="formatTx(tx.tx, action)"/>
                            </template>
                            <template v-else-if="action === 'unfreeze'">
                                <unfreeze-detail :detail="formatTx(tx.tx, action)"/>
                            </template>
                            <template v-else-if="action === 'transfer_ownership'">
                                <transfer-ownership-detail :detail="formatTx(tx.tx, action)"/>
                            </template>
                            <template v-else-if="action === 'features'">
                                <change-features-detail :detail="formatTx(tx.tx, action)"/>
                            </template>
                            <template v-else-if="action === 'description'">
                                <change-description-detail :detail="formatTx(tx.tx, action)"/>
                            </template>
                        </template>
                    </template>
                    <div class="tx__costs">
                        <div class="tx__gas">
                            <div class="item-details__label">
                                {{ $t('send.gas') }}
                            </div>
                            <div class="item-details__value">
                                {{ {used: get(tx, 'gas_used'), wanted: get(tx, 'gas_wanted')}
                                | formatGas }}
                            </div>
                        </div>
                        <div class="tx__fee">
                            <div class="item-details__label">
                                {{ $t('send.fee') }}
                            </div>
                            <div class="item-details__value">
                                {{ get(tx, 'tx.value.fee.amount') | formatFee }}
                            </div>
                        </div>
                    </div>
                    <div class="tx__memo">
                        {{ get(tx, 'tx.value.memo') || $t('global.nothing') }}
                    </div>
                    <div class="tx__timestamp">
                        {{ get(tx, `timestamp`) | formatTime }}
                    </div>
                </div>
            </template>
        </k-card>
    </k-page>
</template>

<script>
    import {get, isEmpty} from 'lodash';
    import moment from 'dayjs';
    import actions from '../../constants/actions';
    import FreezeDetail from '../Issues/Freeze/FreezeDetail';
    import ChangeFeaturesDetail from '../Issues/ChangeFeatures/ChangeFeaturesDetail';
    import ChangeDescriptionDetail from '../Issues/TransferOwnership/TransferOwnershipDetail';

    export default {
        name: 'TxInfo',
        components: {ChangeDescriptionDetail, ChangeFeaturesDetail, FreezeDetail},
        data() {
            return {
                loading: false,
                invalid: false,
                tx: undefined,
            };
        },
        computed: {
            action() {
                return get(this.tx, 'events').find(e => e.type === 'message').attributes
                    .find(a => a.key === 'action').value;
            },
            type() {
                return actions[this.action] ? actions[this.action].title : '';
            },
            info() {
                if (actions[this.action]) {
                    const info = get(this.tx, 'events')
                        .find(e => e.type === actions[this.action].type);
                    if (info) {
                        return info;
                    }
                }
                return '';
            },
        },
        async mounted() {
            const self = this;
            this.loading = true;
            let counter = 50;
            this.interval = setInterval(async () => {
                const {error} = await self.getTx();
                if (!error) {
                    const data = await self.getTx();
                    if (!data.events || !data.logs) {
                        self.invalid = true;
                        self.tx = data;
                    } else {
                        const {
                            logs: [
                                {
                                    success,
                                    log,
                                },
                            ],
                            ...tx
                        } = await self.getTx();

                        self.tx = {
                            ...tx,
                            log,
                            success,
                        };
                    }
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
            isEmpty,
            moment,
            getTx() {
                const {hash} = this.$route.params;
                return this.$store.dispatch('transactions/fetchTxInfo', hash);
            },
            formatTx(tx, action) {
                const {
                    value: {
                        msg: [
                            {
                                value,
                            },
                        ],
                    },
                } = tx;

                switch (action) {
                    case 'issue_create':
                        return {
                            ...value,
                            ...value.params,
                            ...value.params.features,
                        };
                    case 'freeze':
                    case 'unfreeze':
                    case 'transfer_ownership':
                    case 'description':
                    case 'withdraw_validator_commission':
                        return {
                            ...value,
                        };
                    case 'features':
                        return {
                            ...value,
                            ...value.features,
                        };
                    default:
                        const {amount: [{denom, amount}]} = value;

                        return {
                            ...value,
                            amount,
                            denom,
                        };
                }
            },
        },
    };
</script>

<style lang="scss">
    .tx {
        &__info {
            padding: 0 0 10px 0;
            margin: 0 0 10px 0;
        }

        &__block {
            font-size: 12px;
            display: flex;

            &__height {
                margin: 0 0 0 5px;
            }
        }

        &__type {
            font-size: 18px;
            color: $color-title;
        }

        &__content {
            display: flex;
            border-top: 1px solid $color-line;
            border-bottom: 1px solid $color-line;
            padding: 10px 0;
            justify-content: space-between;
            align-items: center;

            @include responsive($sm) {
                flex-direction: column;
                align-items: start;
            }
        }

        &__transfer, &__redelegate {
            &__sender, &__amount, &__recipient {
                display: flex;
                justify-content: center;
                align-items: start;
                height: 101px;
                flex-direction: column;
            }

            @include responsive($sm) {
                flex-direction: column;
                align-items: center;
            }
        }

        &__transfer, &__redelegate {
            &__sender, &__recipient {
                .ellipsis {
                    display: inline-block;
                    vertical-align: top;
                    max-width: 400px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;

                    @include responsive($smd) {
                        display: inline-block;
                        vertical-align: top;
                        max-width: 250px !important;;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    @include responsive($sm) {
                        display: inline-block;
                        vertical-align: top;
                        max-width: 400px !important;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    @include responsive($xxs) {
                        display: inline-block;
                        vertical-align: top;
                        max-width: 250px !important;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
            }
        }

        &__redelegate {
            &__sender, &__recipient {
                .ellipsis {
                    @include responsive($md) {
                        display: inline-block;
                        vertical-align: top;
                        max-width: 350px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
            }
        }

        &__delegate, &__unbonding, &__voting, &__withdraw {
            &__validator {
                &__address {
                    .ellipsis {
                        display: inline-block;
                        vertical-align: top;
                        max-width: 500px !important;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;

                        @include responsive($xxs) {
                            display: inline-block;
                            vertical-align: top;
                            max-width: 250px !important;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                    }
                }
            }
        }

        &__costs {
            display: flex;
            justify-content: space-between;
            height: 70px;
            align-items: center;
            border-bottom: 1px solid $color-line;
            margin: 0 0 10px 0;
        }

        &__gas {

        }

        &__fee {

        }

        &__memo {
            max-height: 200px;
            min-height: 100px;
            color: $color-text;
            font-size: 14px;
            margin: 0 0 10px 0;
        }

        &__timestamp {
            color: $color-text;
            font-size: 12px;
        }
    }

    .arrow {
        transform: translateX(-50%) translateY(-50%);
        width: 60px;
        margin: 0 0 -2px 0px;

        @include responsive($sm) {
            transform: none;
        }

        &__top,
        &__bottom {
            background-color: $color-line;
            height: 1px;
            left: -5px;
            top: 50%;
            width: 56px;

            @include responsive($sm) {
                width: 71px;
            }
        }

        &__top {
            transform: rotate(65deg);
            transform-origin: bottom right;

            @include responsive($sm) {
                -webkit-transform: rotate(20deg);
                transform: rotate(20deg);
                -webkit-transform-origin: 10px -110px;
                transform-origin: 10px -110px;
            }
        }

        &__bottom {
            transform: rotate(-65deg);
            transform-origin: top right;

            @include responsive($sm) {
                -webkit-transform: rotate(-20deg);
                transform: rotate(-20deg);
                -webkit-transform-origin: 50px -75px;
                transform-origin: 50px -75px;
            }
        }
    }

    .tx-container {
        margin: 0 auto;

        .card-container {
            max-width: 1000px;
        }

        .div {
            background: $color-background-card;
            padding: 4px $padding-basic;

            .item {
                margin: 16px 0;
            }
        }
    }
</style>
