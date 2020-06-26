<template>
    <k-page
        class="recover"
        :title="$t('passport.recover')">
        <k-card>
            <div class="el-tabs--card">
                <div class="el-tabs__header">
                    <div class="el-tabs__nav tabs">
                        <router-link
                            :to="routes[0]"
                            :class="$route.path === routes[0] && 'is-active'"
                            class="el-tabs__item">
                            {{ $t('recover.key') }}
                        </router-link>
                        <router-link
                            :to="routes[1]"
                            :class="$route.path === routes[1] && 'is-active'"
                            class="el-tabs__item">
                            {{ $t('recover.keyFile') }}
                        </router-link>
                        <router-link
                            :to="routes[2]"
                            :class="$route.path === routes[2] && 'is-active'"
                            class="el-tabs__item">
                            {{ $t('recover.phrase') }}
                        </router-link>
                    </div>
                </div>
            </div>
            <router-view/>
        </k-card>
    </k-page>
</template>

<script>
    const routes = [
        '/recover/key/text',
        '/recover/key/file',
        '/recover/phrase/input',
    ];

    export default {
        data() {
            return {
                routes,
            };
        },
    };
</script>

<style lang="scss">
    .recover {
        margin: 16px 0;

        &__choice {
            display: flex;
            flex-direction: column;

            &__input {
                margin: 16px 0;
                /*display: flex;*/
                /*justify-content: center;*/
            }
        }

        .el-tabs__nav {
            width: 100%;
            display: flex;
            justify-content: space-between;
            text-align: center;
        }

        .el-tabs--card {
            & > .el-tabs__header {
                .el-tabs__nav {
                }

                .el-tabs__item {
                    padding: 0;
                    width: 100%;
                }
            }
        }
        .btn__primary {
            margin: 24px 0;
        }
    }
</style>
