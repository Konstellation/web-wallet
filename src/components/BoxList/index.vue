<template>
    <div class="box-list">
        <div class="box-list__header">
            <div class="box-list__header__filters">
                <slot name="filters"></slot>
            </div>
        </div>
        <div class="box-list__content">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BoxList',
        props: {
            title: String,
        },
    };
</script>

<style lang="scss" scoped>
    .box-list {
        display: flex;
        flex-direction: column;
        flex: 1 0 100%;

        &__header {
            &__filters {
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                @include responsive($sm) {
                    flex-direction: column;
                }
            }
        }

        &__content {
            display: flex;
            flex-direction: column;
            min-height: 50px;
            padding: 16px 0;
            max-height: 44vh;
        }
    }
</style>
