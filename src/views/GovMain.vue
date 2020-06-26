<template>
    <k-page
        :title="$t('gov.title')"
        class="gov-container">
        <div class="container">
            <div class="top">
                <div class="top__left">
                    <div class="top__left__box">
                    </div>
                </div>
                <div class="top__right">
                    <div class="top__btns">
                        <router-link
                            to="/gov/proposal/create"
                            class="top__btn">
                            <font-awesome-icon
                                icon="vote-yea"
                                size="2x"/>
                            {{ $t("gov.create") }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <el-tabs
            v-model="$route.query.tab"
            class="bottom"
            :before-leave="onTabChange"
            type="card">
            <el-tab-pane
                :label="$t('gov.my')"
                name="my"
                class="bottom__pane">
                <proposals :list="proposals"/>
            </el-tab-pane>
            <el-tab-pane
                :label="$t('gov.all')"
                name="all"
                class="bottom__pane">
                <proposals :list="proposalList"/>
            </el-tab-pane>
        </el-tabs>
    </k-page>
</template>
<script>
    import {get, isEmpty} from 'lodash';
    import {mapState, mapGetters} from 'vuex';

    export default {
        props: {},
        data () {
            return {};
        },
        computed: {
            ...mapState('gov', ['proposalList']),
            ...mapState('gov', ['proposals']),
            ...mapGetters('account', {address: 'currentAddress'}),
        },
        beforeMount () {
            if (!this.userName) {
                this.$router.push('/passport');
            }
            if (this.$route.query.tab === '0')
                this.$router.push('/gov?tab=my');
        },
        mounted () {
            this.onTabChange(this.$route.query.tab);
        },
        methods: {
            get,
            isEmpty,
            onTabChange (tab) {
                if (this.$route.query.tab === '0') tab = 'my';
                this.$router.push(`/gov?tab=${tab}`);

                if (tab === 'my') {
                    this.$store.dispatch('gov/fetchDepositorProposals', this.address);
                }
                if (tab === 'all') {
                    this.$store.dispatch('gov/fetchAllProposals');
                }
            },
            goDetail (id) {
                this.$router.push({path: `/gov/proposal/${id}`});
            },
        },
    };
</script>
<style lang="scss" scoped>
</style>
