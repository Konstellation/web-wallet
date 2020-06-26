<script>
    import FormConfirm from '../FormConfirm';
    import TransferOwnershipDetail from './TransferOwnershipDetail';

    export default {
        name: 'TransferOwnershipConfirm',
        extends: FormConfirm,
        data() {
            return {
                detail: TransferOwnershipDetail,
                action: 'issue/transferOwnership',
                actionTitle: 'issues.transfer_ownership',
                mod: 'issue',
            };
        },
        beforeMount() {
            if (!this.form.denom) {
                this.$router.back();
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>
