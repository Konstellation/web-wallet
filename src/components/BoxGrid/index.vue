<template>
    <div class="box-grid">
        <div class="box-grid__header">
            <div class="box-grid__header__filters">
                <slot name="filters"></slot>
            </div>
        </div>
        <div class="box-grid__content">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BoxGrid',
        props: {
            title: String,
        },
    };
</script>

<style lang="scss" scoped>
    .box-grid {
        display: flex;
        flex-direction: column;
        flex: 1 0 100%;

        &__header {
            &__filters {
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                @include responsive($xs) {
                    flex-direction: column;
                }
            }
        }

        &__content {
            padding: 16px 0;
            display: grid;
            grid-template-rows: auto;
            grid-gap: 1rem;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

            @include responsive($sm) {
                flex-direction: column;
            }
        }
    }
</style>
