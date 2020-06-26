<template>
    <box-grid
        v-loading="loading"
        element-loading-background="rgba(255, 255, 255, 0)"
        class="assets">
        <template v-for="token in tokens">
            <balance-panel
                :key="token.denom"
                class="asset-item"
                :token="token"/>
        </template>
    </box-grid>
</template>

<script>
    import { get } from 'lodash';
    import { mapGetters, mapState } from 'vuex';

    export default {
        name: 'Assets',
        props: {
            load: { type: Boolean, default: false },
        },
        data() {
            return {};
        },
        computed: {
            ...mapState('account', ['balance', 'loading']),
            ...mapGetters('account', {
                address: 'currentAddress',
                accountBalance: 'accountBalance',
            }),
            tokens() {
                return this.balance;
            },
        },
        watch: {},
        beforeMount() {
            this.$store.dispatch('account/fetchBalance');
        },
        methods: {
            get,
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
