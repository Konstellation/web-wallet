<template>
    <div
        v-clipboard:copy="address"
        v-clipboard:success="onCopy"
        class="content">
        <div v-if="ellipsis">
            {{ address | addr }}
        </div>
        <span
            v-else
            class="ellipsis">
            {{ address }}
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            address: {type: String},
            ellipsis: {type: Boolean, default: false},
            brightBackground: Boolean,
        },
        methods: {
            onCopy () {
                this.$message({
                    type: 'success',
                    message: this.$t('main.copy'),
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .content {
        display: flex;
        align-items: center;
        color: $color-subtitle;
        cursor: pointer;
        img {
            margin-left: 8px;
            width: 28px;
            cursor: pointer;

            &.invert {
                filter: invert(10);
            }
        }
    }
</style>
