<template>
    <div class="filter-list">
        <div class="filter-list__header">
            <slot name="filters"></slot>
        </div>
        <div class="card__content">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Card',
        props: {
            title: String,
        },
    };
</script>

<style lang="scss" scoped>
    .card {
        display: flex;
        flex-direction: column;

        &__header {
            width: 100%;
            font-size: 24px;
            text-align: center;
        }

        &__content {
            display: flex;
            flex-direction: column;
            min-height: 50px;
        }
    }
</style>
