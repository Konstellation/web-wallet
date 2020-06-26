<script>
    import FormConfirm from '../FormConfirm';
    import MintDetail from './MintDetail';

    export default {
        name: 'MintConfirm',
        extends: FormConfirm,
        data() {
            return {
                detail: MintDetail,
                action: 'issue/mintIssue',
                actionTitle: 'issues.mint_confirm',
                mod: 'issue',
            };
        },
        beforeMount() {
            if (!this.form.denom) {
                this.$router.push('/issues/mint');
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>
