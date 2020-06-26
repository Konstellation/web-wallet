<script>
    import FormConfirm from '../FormConfirm';
    import TransferFromDetail from './TransferFromDetail';

    export default {
        name: 'TransferFromConfirm',
        extends: FormConfirm,
        data() {
            return {
                detail: TransferFromDetail,
                action: 'issue/transferFromIssue',
                actionTitle: 'issues.transfer_from_confirm',
                mod: 'issue',
            };
        },
        beforeMount() {
            if (!this.form.denom) {
                this.$router.push('/issues/transfer-from');
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>
