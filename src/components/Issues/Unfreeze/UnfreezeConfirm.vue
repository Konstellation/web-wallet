<script>
    import FormConfirm from '../FormConfirm';
    import UnfreezeDetail from './UnfreezeDetail';

    export default {
        name: 'UnfreezeConfirm',
        extends: FormConfirm,
        data() {
            return {
                detail: UnfreezeDetail,
                action: 'issue/unfreezeConfirm',
                actionTitle: 'issues.unfreeze_confirm',
                mod: 'issue',
            };
        },
        beforeMount() {
            if (!this.form.denom) {
                this.$router.push('/issues/unfreeze');
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>
