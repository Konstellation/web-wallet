<template>
    <div v-if="detail">
        <div class="item-details__data item-details__row">
            <div class="item-details__data issue__general">
                <div class="item-details__data">
                    <div class="item-details__row item-details__row__short">
                        <div class="item-details__data issue__symbol">
                            <div class="item-details__label">
                                {{ $t('issues.symbol') }}
                            </div>
                            <div class="item-details__value">
                                {{ get(detail, 'symbol') || '' | upper }}
                            </div>
                        </div>
                        <div class="issue__denom">
                            <div class="item-details__label">
                                {{ $t('issues.denom') }}
                            </div>
                            <div class="item-details__value">
                                {{ get(detail, 'denom') }}
                            </div>
                        </div>
                    </div>
                    <div class="item-details__row item-details__row__short">
                        <div class="item-details__data issue__total-supply">
                            <div class="item-details__label">
                                {{ $t('issues.total_supply') }}
                            </div>
                            <div class="item-details__value">
                                {{ get(detail, 'total_supply') }}
                            </div>
                        </div>
                        <div class="issue__decimals">
                            <div class="item-details__label">
                                {{ $t('issues.decimals') }}
                            </div>
                            <div class="item-details__value">
                                {{ get(detail, 'decimals') }}
                            </div>
                        </div>
                    </div>
                    <div class="item-details__row item-details__row__short">
                        <div class="item-details__data issue__symbol">
                            <div class="item-details__label">
                                {{ $t('issues.owner') }}
                            </div>
                            <div class="item-details__value">
                                <k-address
                                    class="item-details__value"
                                    :address="get(detail, 'owner')"/>
                            </div>
                            <template v-if="owner">
                                <slot name="ownership"/>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-details__data issue__features">
                <div class="item-details__section">
                    <div class="item-details__section__title">
                        {{ $t('issues.description') }}
                    </div>
                    <div class="item-details__section__content">
                        <span>{{ detail.description }}</span>
                    </div>
                    <template v-if="owner">
                        <slot name="description"/>
                    </template>
                </div>
                <div class="item-details__section">
                    <div class="item-details__section__title">
                        {{ $t('issues.features') }}
                    </div>
                    <div class="item-details__section__content">
                        <div
                            v-for="feature in features"
                            :key="feature.title">
                            <font-awesome-icon
                                :class="feature.class"
                                :icon="feature.icon"/>
                            <span>{{ $t(feature.title) }}</span>
                        </div>
                    </div>
                    <template v-if="owner">
                        <slot name="features"/>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {get} from 'lodash';
    import moment from 'dayjs';
    import {mapGetters} from 'vuex';
    import View from '../../../views/View';

    export default {
        name: 'IssueDetail',
        extends: View,
        props: {
            detail: Object,
        },
        computed: {
            ...mapGetters('account', {address: 'currentAddress'}),
            owner() {
                return this.detail.owner === this.address;
            },
            features() {
                return [
                    {
                        title: 'issues.burn_owner',
                        icon: this.detail.burn_owner_disabled ? 'minus' : 'plus',
                        class: this.detail.burn_owner_disabled ? 'disabled' : 'enabled',
                    },
                    {
                        title: 'issues.burn_holder',
                        icon: this.detail.burn_holder_disabled ? 'minus' : 'plus',
                        class: this.detail.burn_holder_disabled ? 'disabled' : 'enabled',
                    },
                    {
                        title: 'issues.burn_from',
                        icon: this.detail.burn_from_disabled ? 'minus' : 'plus',
                        class: this.detail.burn_from_disabled ? 'disabled' : 'enabled',
                    },
                    {
                        title: 'issues.mint',
                        icon: this.detail.mint_disabled ? 'minus' : 'plus',
                        class: this.detail.mint_disabled ? 'disabled' : 'enabled',
                    },
                    {
                        title: 'issues.freeze',
                        icon: this.detail.freeze_disabled ? 'minus' : 'plus',
                        class: this.detail.freeze_disabled ? 'disabled' : 'enabled',
                    },
                ];
            },
        },
        methods: {
            get,
            moment,
        },
    };
</script>

<style lang="scss" scoped>
    .totalSupply {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;

        @media (max-width: $sm) {
            font-size: 16px;
        }
    }

    .issue {
        &__general {
            flex-basis: 50%;
            padding-right: 16px;
        }

        &__features {
            flex-basis: 50%;

            @media (max-width: $sm) {
                /*flex-basis: 30%;*/
            }
        }

        &__total-supply {
            flex-basis: 30%;
            padding: 0 20px 0 0;
        }

        &__symbol {
            flex-basis: 30%;
        }
    }

    .enabled {
        color: $color-subtitle;
        margin: 0 10px 0 0;
    }

    .disabled {
        color: $color-warning;
        margin: 0 10px 0 0;
    }
</style>
