<template>
    <k-page
        :link="link"
        class="staking-container">
        <router-view/>
    </k-page>
</template>

<script>
    export default {
        name: 'Staking',
        computed: {
            link () {
                return this.$route.path.match('/staking/detail')
                    ? '/staking?tab=delegations'
                    : null;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .staking-container {
        margin: 0 auto;
    }
</style>
