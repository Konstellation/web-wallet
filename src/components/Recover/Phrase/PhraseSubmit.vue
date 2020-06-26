<template>
    <el-form
        ref="form"
        class="recover-container"
        label-position="top"
        :model="form"
        :rules="rules"
        @submit="onSubmit">
        <el-form-item prop="name">
            <el-input
                v-model="form.name"
                :placeholder="$t('create.name')"/>
        </el-form-item>
        <el-form-item prop="pass">
            <el-input
                v-model="form.pass"
                type="password"
                :placeholder="$t('create.pass')"/>
        </el-form-item>
        <el-button
            class="btn__primary"
            native-type="“submit”"
            @click="onSubmit">
            {{ $t('passport.recover') }}
        </el-button>
    </el-form>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'PhraseSubmit',
        data () {
            const requireError = name => new Error(this.$t('global.required', {name}));
            const validateName = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(requireError(this.$t('create.name')));
                    return;
                }
                callback();
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(requireError(this.$t('create.pass')));
                } else {
                    if (!value.match('^(?=.*[a-zA-Z])(?=.*\\d)[^\\s]{8,18}$')) {
                        callback(new Error(this.$t('create.passWarn')));
                        return;
                    }
                    callback();
                }
            };

            return {
                form: {
                    name: '',
                    pass: '',
                },
                rules: {
                    name: [{validator: validateName, trigger: 'blur'}],
                    pass: [{validator: validatePass, trigger: 'blur'}],
                },
            };
        },
        computed: {
            ...mapState('recover', ['phrase']),
        },
        beforeDestroy () {
            // clear phrase
            this.$store.dispatch('recover/clearKey');
        },
        methods: {
            async onSubmit (e) {
                e.preventDefault();
                const {form, $router, $store, phrase} = this;
                this.$refs.form.validate(async (valid) => {
                    if (!valid) return false;

                    const params = {...form, phrase};
                    const account = await $store.dispatch('account/importPhrase', params);
                    if (account) {
                        $router.push('/main?tab=assets');

                        return true;
                    }

                    return false;
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .recover-container {
        margin: 16px auto;

        .btn {
            width: 100%;
            padding: $padding-basic;
            margin-top: 16px;
        }
    }
</style>
