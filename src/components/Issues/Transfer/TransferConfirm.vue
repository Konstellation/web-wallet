<script>
    import FormConfirm from '../FormConfirm';
    import TransferDetail from './TransferDetail';

    export default {
        name: 'TransferConfirm',
        extends: FormConfirm,
        data() {
            return {
                detail: TransferDetail,
                action: 'issue/transferIssue',
                actionTitle: 'issues.transfer_confirm',
                mod: 'issue',
            };
        },
        beforeMount() {
            if (!this.form.denom) {
                this.$router.push('/issues/transfer');
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>
