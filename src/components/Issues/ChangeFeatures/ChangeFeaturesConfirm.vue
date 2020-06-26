<script>
    import FormConfirm from '../FormConfirm';
    import ChangeFeaturesDetail from './ChangeFeaturesDetail';

    export default {
        name: 'ChangeFeaturesConfirm',
        extends: FormConfirm,
        data() {
            return {
                detail: ChangeFeaturesDetail,
                action: 'issue/changeFeatures',
                actionTitle: 'issues.change_features',
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
