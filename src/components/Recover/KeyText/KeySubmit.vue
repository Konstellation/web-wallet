<template>
    <div class="recover__choice">
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
                    :placeholder="$t('create.name')">
                </el-input>
            </el-form-item>
            <el-form-item prop="pass">
                <el-input
                    v-model="form.pass"
                    type="password"
                    :placeholder="$t('create.pass')">
                </el-input>
            </el-form-item>
        </el-form>
        <el-button
            class="btn__primary"
            native-type="“submit”"
            @click="onSubmit">
            {{ $t('passport.recover') | upper }}
        </el-button>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'KeySubmit',
        data() {
            const requireError = name => new Error(this.$t('global.required', {name}));
            const validateName = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(requireError(this.$t('create.name')));
                    return;
                }
                callback();
            };
            const validatePass = (rule, value, callback) => {
                // callback();
                // return;
                if (value === '') {
                    callback(requireError(this.$t('create.pass')));
                    return;
                }
                callback();
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
            ...mapState('recover', ['keyText']),
        },
        methods: {
            async onSubmit(e) {
                e.preventDefault();
                const {form, $router, $store, keyText} = this;
                this.$refs.form.validate(async (valid) => {
                    if (!valid) return false;
                    const params = {...form, keyStore: keyText};
                    const account = await $store.dispatch('account/importKeyStore', params);
                    if (account) {
                        // clear Key after import
                        $store.dispatch('recover/clearKey');

                        $router.push('/main?tab=assets');
                    }

                    return true;
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
