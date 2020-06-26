<script>
    import FormConfirm from '../FormConfirm';
    import ChangeDescriptionDetail from './ChangeDescriptionDetail';

    export default {
        name: 'ChangeDescriptionConfirm',
        extends: FormConfirm,
        data() {
            return {
                detail: ChangeDescriptionDetail,
                action: 'issue/changeDescription',
                actionTitle: 'issues.change_description',
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
