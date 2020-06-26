<template>
    <k-card :title="$t('create.mnemonic')">
        <div class="create-warn">
            {{ $t('create.mnemonicBreif') }}
        </div>
        <el-input
            class="mnemonic"
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 8}"
            :value="account.getMnemonic()">
        </el-input>
        <el-button
            class="btn__primary"
            @click="onSubmit">
            {{ $t('global.next') | upper }}
        </el-button>
    </k-card>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'Mnemonic',
        computed: {
            ...mapState('account', ['account']),
        },
        methods: {
            onSubmit() {
                this.$router.push('confirm');
            },
        },
    };
</script>

<style lang="scss" scoped>
    .create-warn {
        padding: $padding-basic;
        padding-left: $padding-large;
        background: rgba(255, 255, 255, 0.2);
        margin-bottom: $padding-basic;
    }

    .mnemonic {
        margin-bottom: $padding-basic;
    }

    .btn-next {
        width: 100%;
        padding: $padding-basic;
    }
</style>
