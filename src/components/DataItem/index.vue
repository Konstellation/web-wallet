<template>
    <div class="data-item">
        {{ label }}
        <span>
      <slot/>
    </span>
    </div>
</template>

<script>
    export default {
        name: 'DataItem',
        props: {
            label: String,
        },
    };
</script>

<style lang="scss" scoped>
    .data-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: $padding-large 0;

        span {
            max-width: 70%;
            word-break: break-all;
            text-align: right;
        }

        &:first-child, &:last-child {
            margin: 0;
        }
    }
</style>
