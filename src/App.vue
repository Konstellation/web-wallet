<template>
    <div id="app">
        <k-header/>
        <div class="app-container">
            <router-view/>
        </div>
        <k-footer/>
    </div>
</template>

<script>
    export default {
        name: 'App',
    };
</script>

<style lang="scss">
    @import "~@/styles/_reset.scss";
    @import "~@/styles/_common.scss";

    html {
        height: 100%;
    }

    body {
        font-size: 16px;
        line-height: 1.5;
        height: 100%;
        font-family: "PingFangSC", Microsoft YaHei, "Helvetica Neue", Helvetica, Arial,
        STHeiTi, sans-serif;
        background: $color-background;
        color: $color-font;
        margin: 0;
        box-sizing: border-box;
    }

    #app {
        display: flex;
        flex-direction: column;
        height: 100%;

        /*@media (min-width: 1032px) {*/
        /*    margin-left: calc(100vw - 100%);*/
        /*    margin-right: 0;*/
        /*}*/

        .app-container {
            flex: 1 1 auto;
            position: relative;
            flex-direction: row;
            justify-content: space-around;
            display: flex;

            @include responsive($md) {
                padding: 0 12px;
            }
        }
    }
</style>
