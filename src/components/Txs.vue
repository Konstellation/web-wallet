<template>
    <box-list>
        <template slot="filters">
            <el-select
                v-model="action"
                class="filter"
                @change="change">
                <el-option
                    v-for="(a, i) in actionList"
                    :key="a.value+i"
                    :label="$t(a.title)"
                    :value="a.value">
                </el-option>
            </el-select>
            <el-input
                v-model="txhash"
                class="filter"
                placeholder="Txhash"
                @keyup.enter.native="search">
                <i
                    slot="suffix"
                    class="el-icon-search el-input__icon">
                </i>
            </el-input>
        </template>
        <div
            v-loading="loading"
            element-loading-background="rgba(0, 0, 0, 0)"
            class="txs">
            <div
                v-if="txsList.length === 0"
                class="empty">
                {{ $t('main.empty') }}
            </div>
            <transaction-list :list="txsList"/>
        </div>
    </box-list>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import BigNumber from 'bignumber.js';
    import {get, isEmpty} from 'lodash';
    import {actions} from '../constants';

    export default {
        name: 'Txs',
        data() {
            return {
                action: '',
                txhash: '',
                txsListCopy: [],
            };
        },
        computed: {
            ...mapState('account', ['keyStore']),
            ...mapState('transactions', [
                'loading',
                'txs',
            ]),
            ...mapGetters('account', {address: 'currentAddress'}),
            actionList() {
                return {
                    all: {
                        title: 'common.all',
                        value: 'all',
                    },
                    ...actions,
                };
            },
            txsList() {
                sessionStorage.setItem(
                    'txType',
                    sessionStorage.getItem('txType') || 'all',
                );

                if (!this.action)
                    this.action = 'all';

                switch (this.action) {
                    case 'all': {
                        return this.txs;
                    }
                    default: {
                        return this.txs.filter(t => t.events
                                .find(e => e.type === actions[this.action].type)
                            && t.events.find(e => e.type === 'message').attributes
                                .find(a => a.key === 'module').value === actions[this.action].module);
                    }
                }
            },
        },
        beforeMount() {
            this.$store.dispatch('transactions/fetchTxs', this.keyStore);
        },
        mounted() {
            this.action = sessionStorage.getItem('txType');
        },
        destroyed() {
        },
        methods: {
            get,
            isEmpty,
            BigNumber,
            search() {
                this.txhash = this.txhash.replace(/ /g, '');
                const txPattern = /^[0-9A-F]{64}$/;
                if (this.txhash === '') {
                    this.$message.error(this.$t('global.required', {name: 'txhash'}));
                    return;
                }
                if (!txPattern.test(this.txhash)) {
                    this.$message.error(this.$t('global.errorType', {name: 'txhash'}));
                    return;
                }
                this.$router.push({path: `/tx/${this.txhash}`});
            },
            change(val) {
                sessionStorage.setItem('txType', val);
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
