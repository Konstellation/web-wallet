<script>
    export default {
        name: 'BaseView',
        computed: {
        },
        mounted () {
            this.$store.dispatch('basic/setPageTitle', this.$t(this.$route.name));
        },
    };
</script>
