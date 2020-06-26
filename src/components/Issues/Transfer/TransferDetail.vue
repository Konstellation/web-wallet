<template>
    <div v-if="detail">
        <div class="item-details__data">
            <div class="item-details__data approval__spender">
                <div class="item-details__label">
                    {{ $t('issues.to_address') }}
                </div>
                <k-address
                    class="item-details__value"
                    :address="get(detail, 'to_address')"/>
            </div>
            <div class="item-details__data transfer__amount">
                <div class="item-details__label">
                    {{ $t('issues.amount') }}
                </div>
                <div class="item-details__value">
                    {{ get(detail, 'amount') }}
                    {{ get(detail, 'denom') || '' | upper }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { get } from 'lodash';
    import moment from 'dayjs';
    import View from '../../../views/View';

    export default {
        name: 'TransferDetail',
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
    .transfer__amount {
        font-size: 30px;
    }
</style>
