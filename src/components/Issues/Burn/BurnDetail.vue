<template>
    <div v-if="detail">
        <div class="item-details__data">
            <div class="item-details__data approval__spender">
                <div class="item-details__label">
                    {{ $t('issues.burner') }}
                </div>
                <k-address
                    class="item-details__value"
                    :address="get(detail, 'burner')"/>
            </div>
            <div class="item-details__data approval__spender">
                <div class="item-details__label">
                    {{ $t('issues.from_address') }}
                </div>
                <k-address
                    class="item-details__value"
                    :address="fromAddress"/>
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
    import {get} from 'lodash';
    import moment from 'dayjs';
    import View from '../../../views/View';

    export default {
        name: 'BurnDetail',
        extends: View,
        props: {
            detail: Object,
        },
        computed: {
            fromAddress() {
                const fromAddr = get(this.detail, 'from_address');
                if (fromAddr)
                    return fromAddr;

                return get(this.detail, 'burner');
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
