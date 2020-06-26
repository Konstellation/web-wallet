<template>
    <div
        class="balance-container"
        @click="goAssets">
        <div
            class="logo-none">
        </div>
        <div class="name">
            {{ token.denom | upper }}
        </div>
        <div class="amount">
            {{ token.amount }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BalancePanel',
        props: {
            token: { type: Object, required: true },
        },
        computed: {},
        methods: {
            goAssets() {
                this.$router.push({
                    name: 'assets.asset',
                    params: { denom: this.token.denom },
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .balance-container {
        flex-basis: 216px;
        height: 188px;
        text-align: center;
        background: $color-primary;
        color: $color-title;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: $padding-basic;
        cursor: pointer;

        &:hover {
            background: $color-hover;
        }

        img {
            width: 40px;
            height: 40px;
            margin-top: 8px;
            margin-bottom: 16px;
            position: relative;
            top: 2px;
        }

        .logo-none {
            width: 48px;
            height: 48px;
            margin-top: 4px;
            margin-bottom: 12px;
            position: relative;
            top: 2px;
            background: $color-active;
            border-radius: 24px;
        }

        .name {
            font-size: 18px;
            margin-bottom: 16px;
        }

        .amount {
            font-size: 20px;
        }
    }
</style>
