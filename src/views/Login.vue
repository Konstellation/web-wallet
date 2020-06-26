<template>
    <k-page
        :title="$t('passport.login')"
        class="passport-card">
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
            <el-button
                class="btn-next"
                native-type="“submit”"
                @click="onSubmit">
                {{ $t('global.next') }}
            </el-button>
        </el-form>
    </k-page>
</template>

<script>
    import {mapState} from 'vuex';
    import {isEmpty} from 'lodash';

    import icon1 from '../assets/icon-create.svg';
    import icon2 from '../assets/icon-import.svg';

    export default {
        name: 'Login',
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
                    checkPass: '',
                },
                rules: {
                    name: [{validator: validateName, trigger: 'blur'}],
                    pass: [{validator: validatePass, trigger: 'blur'}],
                },
                loading: false,
                icon1,
                icon2,
            };
        },
        computed: {
            ...mapState('account', ['userMap', 'userName']),
            nameList () {
                return Object.keys(this.userMap).sort(a => a === this.userName ? -1 : 1);
            },
        },
        methods: {
            isEmpty,
            onSubmit (e) {
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

                    sessionStorage.setItem('login', true)
                    $router.push('/main');

                    // this.loading = true;
                    // const created = await dispatch('account/create', form);
                    // this.loading = false;
                    // if (!created) {
                    //     $message({
                    //         type: 'error',
                    //         message: $t('create.exist'),
                    //         center: true,
                    //     });
                    //     return false;
                    // }
                    //
                    // // next step
                    // $router.push('mnemonic');

                    return true;
                });
            },
            async changeAccount (e, name) {
                const successMsg = this.$t('global.success', {
                    name: this.$t('passport.switch'),
                });
                this.$prompt(
                    this.$t('create.pass'),
                    `${this.$t('passport.switch')} ${name}`,
                    {
                        confirmButtonText: this.$t('global.ok'),
                        cancelButtonText: this.$t('global.cancel'),
                        inputType: 'password',
                        inputValidator: v => v.trim().length > 0
                            ? true
                            : this.$t('global.required', {name: this.$t('create.pass')}),
                        beforeClose: (action, ins, done) => {
                            if (action !== 'confirm') {
                                return done();
                            }

                            this.$store
                                .dispatch('account/login', {
                                    name,
                                    pass: ins.inputValue,
                                })
                                .then(() => {
                                    this.$message({
                                        type: 'success',
                                        message: successMsg,
                                    });
                                    done();
                                })
                                .catch(ee => {
                                    console.log(ee);
                                    this.$message.error(
                                        `${this.$t('create.pass')}${this.$t('global.error')} ${ee}`,
                                    );
                                });

                            this.$router.push('main?tab=assets');

                            return true;
                        },
                    },
                )
                    .then(() => { })
                    .catch(() => { });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .passport-card {
        max-width: 700px !important;

        .create-warn {
            padding: 30px;
        }
    }
</style>
