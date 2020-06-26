<script>
    import FormConfirm from '../FormConfirm';
    import BurnDetail from './BurnDetail';

    export default {
        name: 'BurnFromConfirm',
        extends: FormConfirm,
        data() {
            return {
                detail: BurnDetail,
                action: 'issue/burnFrom',
                actionTitle: 'issues.burn_from_confirm',
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
