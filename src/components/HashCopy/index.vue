<template>
    <div
        v-clipboard:copy="text"
        v-clipboard:success="onCopy"
        class="copy-content">
        <span
            :class="`${ellipsis ? 'ellipsis-hash' : ''}`">
            {{ text }}
        </span>
    </div>
</template>

<script>
    export default {
        name: 'HashCopy',
        props: {
            text: String,
            ellipsis: {type: Boolean, default: true},
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
    .copy-content {
        cursor: pointer;
        color: $color-subtitle;
    }
</style>
