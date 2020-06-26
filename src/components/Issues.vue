<template>
    <box-grid
        v-loading="loading"
        element-loading-background="rgba(255, 255, 255, 0)"
        class="issues">
        <template v-for="(issue) in Object.values(issues)">
            <issue-panel
                :key="`issue-${issue.denom}`"
                class="issue-item"
                :token="issue"/>
        </template>
    </box-grid>
</template>

<script>
    import { get } from 'lodash';
    import { mapState } from 'vuex';

    export default {
        name: 'Issues',
        computed: {
            ...mapState('issue', ['issues', 'loading']),
        },
        beforeMount() {
            this.$store.dispatch('account/fetchBalance');
            this.$store.dispatch('issue/fetchIssues');
        },
        methods: {
            get,
        },
    };
</script>

<style lang="scss" scoped>
    .list {
        max-height: 45vh;
        overflow-y: scroll;

        &__row {
            .tx {
                &__info {
                    display: flex;
                    flex-direction: column;
                }

                &__hash {
                    color: white;
                }
            }

            .amount {
                font-size: 20px;
                text-align: right;
            }
        }

        .tx-row:first-child {
            margin-top: 0;
        }
    }
</style>
