<script>
    import FormConfirm from '../FormConfirm';
    import BurnDetail from './BurnDetail';

    export default {
        name: 'BurnConfirm',
        extends: FormConfirm,
        data() {
            return {
                detail: BurnDetail,
                action: 'issue/burn',
                actionTitle: 'issues.burn_confirm',
                mod: 'issue',
            };
        },
        beforeMount() {
            if (!this.form.denom) {
                this.$router.push('/issues/burn');
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>
