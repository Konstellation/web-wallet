<template>
        <router-view/>
</template>

<script>
    export default {
        name: 'Send',
        computed: {
            link () {
                // return this.$route.path.match('/send/finish') ? '/staking?tab=txs' : null;
            },
        },
        beforeDestroy () {
        },
    };
</script>

<style lang="scss" scoped>
</style>
