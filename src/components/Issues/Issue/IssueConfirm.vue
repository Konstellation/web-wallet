<script>
    import FormConfirm from '../FormConfirm';
    import IssueDetail from './IssueDetail';

    export default {
        name: 'IssueConfirm',
        extends: FormConfirm,
        data() {
            return {
                detail: IssueDetail,
                action: 'issue/createIssue',
                actionTitle: 'issues.issue_confirm',
                mod: 'issue',
            };
        },
        beforeMount() {
            if (!this.form.denom) {
                this.$router.push('/issues/issue');
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>
