<template>
    <k-page class="agree-container">
        <k-card :title="$t('agree.title')">
            <el-checkbox
                v-model="checkList0"
                class="term"
                :label="$t('agree.term1')"
                :change="handleCheck"/>
            <el-checkbox
                v-model="checkList1"
                class="term"
                :label="$t('agree.term2')"
                :change="handleCheck"/>
            <el-checkbox
                v-model="checkList2"
                class="term"
                label=""
                :change="handleCheck"/>
            <div class="links">
                {{ $t('agree.term3') }}
                <a
                    target="_blank"
                    :href="$t('agree.termUrl')">
                    {{ $t('agree.use') }}
                </a>
                {{ $t('agree.and') }}
                <a
                    target="_blank"
                    :href="$t('agree.privacyUrl')">
                    {{ $t('agree.privacy') }}
                </a>
            </div>
            <el-button
                :disabled="!agreed"
                class="btn__primary"
                @click="onSubmit">
                {{ $t('agree.confirm') }}
            </el-button>
        </k-card>
    </k-page>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'Agree',
        data() {
            return {
                checkList0: false,
                checkList1: false,
                checkList2: false,
            };
        },
        computed: {
            ...mapState('account', ['userMap']),
            agreed() {
                return this.checkList0 && this.checkList1 && this.checkList2;
            },
        },
        methods: {
            async handleCheck() {
                return true;
            },
            async onSubmit() {
                localStorage.setItem('wallet_agree', true);
                this.$router.push('passport');
            },
        },
    };
</script>

<style lang="scss" scoped>
    .agree-container {
        margin: 0 auto;

        .term {
            display: flex;
            align-items: flex-start;
            margin: $padding-basic 0;
        }

        .links {
            position: relative;
            left: 30px;
            top: -46px;
            color: rgba(255, 255, 255, 0.65);
            font-size: 14px;
            width: calc(100% - 30px);
        }

        .el-button {
            width: 100%;
        }
    }
</style>
