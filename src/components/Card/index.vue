<template>
    <div class="card">
        <div class="card__header">
            <p
                v-if="title"
                class="card__header__title">
                {{ title }}
            </p>
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
