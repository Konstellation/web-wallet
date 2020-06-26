<template>
    <div v-if="detail">
        <div class="item-details__data">
            <div class="item-details__data approval__spender">
                <div class="item-details__label">
                    {{ $t('issues.spender') }}
                </div>
                <k-address
                    class="item-details__value"
                    :address="get(detail, 'spender')"/>
            </div>
            <div class="item-details__data approval__allowance">
                <div class="item-details__label">
                    {{ $t('issues.allowance') }}
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
        name: 'ApproveDetail',
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
    .approval__allowance {
        font-size: 30px;
    }
</style>
