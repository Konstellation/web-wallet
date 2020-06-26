<template>
    <box-list>
        <template slot="filters">
            <el-select
                v-model="status"
                class="filter"
                @change="change">
                <el-option
                    v-for="i in statusList"
                    :key="i.value"
                    :label="$t(i.title)"
                    :value="i.value">
                </el-option>
            </el-select>
        </template>
        <div
            v-loading="loading"
            element-loading-background="rgba(0, 0, 0, 0)"
            class="proposals">
            <proposal-list :list="plist"/>
        </div>
    </box-list>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import BigNumber from 'bignumber.js';
    import {get, isEmpty} from 'lodash';
    import {explorerDomain, status} from '../constants';

    export default {
        name: 'Proposals',
        props: {
            list: Array,
        },
        data () {
            return {
                domain: explorerDomain,
                status: 'all',
                title: '',
            };
        },
        computed: {
            ...mapState('account', ['keyStore']),
            ...mapState('gov', ['loading']),
            ...mapGetters('account', {address: 'currentAddress'}),
            statusList () {
                return {
                    all: {
                        title: 'common.all',
                        value: 'all',
                    },
                    ...status,
                };
            },
            plist () {
                sessionStorage.setItem(
                    'pType',
                    sessionStorage.getItem('pType') || 'all',
                );
                return this.list.filter(item => {
                    const title = get(item, 'content.value.title') || '';
                    if (isEmpty(this.title)) {
                        return this.status === 'all'
                            ? item
                            : this.status === item.proposal_status;
                    }
                    return this.status === 'all'
                        ? title.indexOf(this.title) > -1
                        : this.status === item.proposal_status
                        && title.indexOf(this.title) > -1;
                });
            },
        },
        beforeMount () {
            this.$store.dispatch('transactions/fetchTxs', this.keyStore);
        },
        mounted () {
            this.status = sessionStorage.getItem('pType');
        },
        methods: {
            get,
            isEmpty,
            BigNumber,
            change (val) {
                this.status = val;
                sessionStorage.setItem('pType', val);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .txs {
        max-height: 45vh;

        .empty {
            margin: $padding-large;
            text-align: center;
            color: rgba(255, 255, 255, 0.5);
        }

        p {
            margin-top: 16px;
            text-align: center;
        }
    }
</style>
