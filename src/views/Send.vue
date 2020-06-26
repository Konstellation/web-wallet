<template>
    <k-page
        class="send-container"
        :link="link">
        <router-view/>
    </k-page>
</template>

<script>
    export default {
        name: 'Send',
        computed: {
            link () {
                return this.$route.path.match('/send/finish') ? '/main?tab=txs' : null;
            },
        },
        beforeDestroy () {
            this.$store.dispatch('transactions/input', {denom: 'darc', fee: 0});
        },
    };
</script>

<style lang="scss" scoped>
</style>
