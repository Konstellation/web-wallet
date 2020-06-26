<template>
    <div class="footer-container">
        {{ $t('footer.copyright') }}
    </div>
</template>

<script>
    export default {};
</script>

<style lang="scss" scoped>
    .footer-container {
        text-align: center;
        color: $color-font-light;
        height: 25px;
        padding-bottom: 48px;
        flex: 0 0 auto;
    }
</style>
