<template>
    <k-page
        class="gov-container"
        :link="link">
        <router-view/>
    </k-page>
</template>

<script>
    export default {
        name: 'Gov',
        computed: {
            link () {
                return this.$route.path.match('/gov/proposal/finish') ? '/gov?tab=my' : null;
            },
        },
    };
</script>

<style lang="scss" scoped>
</style>
