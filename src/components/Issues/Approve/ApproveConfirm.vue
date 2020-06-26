<script>
    import FormConfirm from '../FormConfirm';
    import ApproveDetail from './ApproveDetail';

    export default {
        name: 'ApproveConfirm',
        extends: FormConfirm,
        data() {
            return {
                detail: ApproveDetail,
                action: 'issue/approveIssue',
                actionTitle: 'issues.approve_confirm',
                mod: 'issue',
            };
        },
        beforeMount() {
            if (!this.form.denom) {
                this.$router.push('/issues/approve');
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>
