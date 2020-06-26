<template>
    <div class="page">
        <div class="page__header">
            <div class="page__header__title">
                <k-text
                    v-if="pTitle"
                    :content="pTitle"
                />
            </div>
            <div
                v-if="$route.name !== 'main'"
                class="page__header__back">
                <a
                    href="javascript:"
                    @click="link ? $router.push(link) : $router.back()">
                    <i class="el-icon-back"></i>
                </a>
            </div>
        </div>
        <div class="page__content">
            <slot/>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'Page',
        props: {
            link: String,
            title: String,
        },
        computed: {
            ...mapState('basic', ['pageTitle']),
            pTitle () {
                return this.pageTitle || this.title;
            },
        },
        beforeDestroy () {
            this.$store.dispatch('basic/clearPageTitle');
        },
    };
</script>

<style lang="scss" scoped>
    .page {
        max-width: $max-width;
        margin: 0 auto $padding-large;
        flex-basis: 100%;

        &__header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: 60px;

            &__title {
                color: $color-title;
                font-size: 22px;
            }

            &__back {
                display: inline-block;
                height: 3em;
                text-align: center;

                a {
                    color: $color-link;
                    font-size: 28px;
                    margin: auto;
                    text-align: center;
                    vertical-align: middle;
                    transition: color $trans;
                }
            }
        }

        &__content {
            /*display: flex;*/
            /*justify-content: center;*/
        }
    }
</style>
