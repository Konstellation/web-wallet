<template>
    <div v-if="detail">
        <div class="item-details__data item-details__row">
            <div class="item-details__data issue__general">
                <div class="item-details__data">
                    <div class="item-details__row item-details__row__short">
                        <div class="issue__denom">
                            <div class="item-details__label">
                                {{ $t('issues.denom') }}
                            </div>
                            <div class="item-details__value">
                                {{ get(detail, 'denom') }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item-details__data">
                    <div class="item-details__row item-details__row__short">
                        <div class="issue__description">
                            <div class="item-details__label">
                                {{ $t('issues.to_address') }}
                            </div>
                            <k-address
                                class="item-details__value"
                                :address="get(detail, 'to_address')"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {get} from 'lodash';
    import moment from 'dayjs';
    import View from '../../../views/View';

    export default {
        name: 'ChangeDescriptionDetail',
        extends: View,
        props: {
            detail: Object,
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
        }

        &__features {
            flex-basis: 50%;

            @media (max-width: $sm) {
                flex-basis: 30%;
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
