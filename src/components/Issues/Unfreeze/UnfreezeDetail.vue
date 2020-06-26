<template>
    <div v-if="detail">
        <div class="item-details__data">
            <div class="item-details__data approval__spender">
                <div class="item-details__label">
                    {{ $t('issues.holder') }}
                </div>
                <k-address
                    class="item-details__value"
                    :address="get(detail, 'holder')"/>
            </div>
            <div class="item-details__data transfer__amount">
                <div class="item-details__label">
                    {{ $t('issues.denom') }}
                </div>
                <div class="item-details__value">
                    <template v-if="get(detail, 'denom')">
                        {{ get(detail, 'denom') || '' | upper }}
                    </template>
                    <template v-else>
                        {{ get(detail, 'string') || '' | upper }}
                    </template>
                </div>
            </div>
            <template v-if="get(detail, 'op')">
                <div class="item-details__data transfer__amount">
                    <div class="item-details__label">
                        {{ $t('issues.direction') }}
                    </div>
                    <template v-if="formatDirection.find(d => d === 'in')">
                        <div class="item-details__value">
                            <font-awesome-icon icon="arrow-up"/>
                            {{ $t('issues.in') }}
                        </div>
                    </template>
                    <template v-if="formatDirection.find(d => d === 'out')">
                        <div class="item-details__value">
                            <font-awesome-icon icon="arrow-down"/>
                            {{ $t('issues.out') }}
                        </div>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import {get} from 'lodash';
    import moment from 'dayjs';
    import View from '../../../views/View';

    export default {
        name: 'UnfreezeDetail',
        extends: View,
        props: {
            detail: Object,
        },
        computed: {
            formatDirection() {
                return !Array.isArray(this.detail.op) ? this.detail.op.split('-') : this.detail.op;
            },
        },
        methods: {
            get,
            moment,
        },
    };
</script>

<style lang="scss" scoped>
    .transfer__amount {
        font-size: 30px;
    }
</style>
