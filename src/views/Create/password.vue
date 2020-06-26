<template>
    <k-card :title="$t('passport.create')">
        <el-form
            ref="form"
            v-loading="loading"
            :model="form"
            :rules="rules"
            label-position="top"
            @submit="onSubmit">
            <div class="create-warn">
                <ul>
                    <li>{{ $t('create.warn1') }}</li>
                    <li>{{ $t('create.warn2') }}</li>
                </ul>
            </div>
            <el-form-item prop="name">
                <el-input
                    v-model="form.name"
                    :placeholder="$t('create.name')">
                </el-input>
            </el-form-item>
            <el-form-item prop="pass">
                <el-input
                    v-model="form.pass"
                    :placeholder="$t('create.pass')"
                    type="password">
                </el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input
                    v-model="form.checkPass"
                    :placeholder="$t('create.passCheck')"
                    type="password">
                </el-input>
            </el-form-item>
            <el-button
                class="btn__primary"
                native-type="“submit”"
                @click="onSubmit">
                {{ $t('global.next') | upper }}
            </el-button>
        </el-form>
    </k-card>
</template>

<script>
    export default {
        name: 'Password',
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
                if (value === '') {
                    callback(requireError(this.$t('create.pass')));
                } else {
                    if (!value.match('^(?=.*[a-zA-Z])(?=.*\\d)[^\\s]{8,18}$')) {
                        callback(new Error(this.$t('create.passWarn')));
                        return;
                    }
                    if (this.form.checkPass !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(requireError(this.$t('create.pass')));
                } else if (value !== this.form.pass) {
                    callback(new Error(this.$t('create.passCheckWarn')));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    name: '',
                    pass: '',
                    checkPass: '',
                },
                rules: {
                    name: [{validator: validateName, trigger: 'blur'}],
                    pass: [{validator: validatePass, trigger: 'blur'}],
                    checkPass: [{validator: validatePass2, trigger: 'blur'}],
                },
                loading: false,
            };
        },
        methods: {
            onSubmit(e) {
                e.preventDefault();
                const {
                    form,
                    $store: {dispatch},
                    $router,
                    $message,
                    $t,
                } = this;
                this.$refs.form.validate(async valid => {
                    if (!valid) return false;

                    this.loading = true;
                    const created = await dispatch('account/create', form);
                    this.loading = false;
                    if (!created) {
                        $message({
                            type: 'error',
                            message: $t('create.exist'),
                            center: true,
                        });
                        return false;
                    }

                    // next step
                    $router.push('mnemonic');

                    return true;
                });
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

        ul,
        li {
            list-style: inherit;
        }
    }

    .btn-next {
        width: 100%;
        padding: $padding-basic;
    }
</style>
