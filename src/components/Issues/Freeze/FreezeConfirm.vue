<script>
    import FormConfirm from '../FormConfirm';
    import FreezeDetail from './FreezeDetail';

    export default {
        name: 'FreezeConfirm',
        extends: FormConfirm,
        data() {
            return {
                detail: FreezeDetail,
                action: 'issue/freezeConfirm',
                actionTitle: 'issues.freeze_confirm',
                mod: 'issue',
            };
        },
        beforeMount() {
            if (!this.form.denom) {
                this.$router.push('/issues/freeze');
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>
