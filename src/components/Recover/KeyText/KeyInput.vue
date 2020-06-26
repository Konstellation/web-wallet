<template>
    <div class="recover__choice">
        <div class="recover__choice__input">
            <el-form
                ref="form"
                label-position="top"
                :model="form"
                :rules="rules">
                <el-form-item
                    prop="keyStore"
                    required>
                    <el-input
                        v-model="form.keyStore"
                        class="input"
                        type="textarea"
                        :placeholder="$t('recover.key')"
                        :autosize="{ minRows: 8, maxRows: 12}">
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <el-button
            class="btn__primary"
            @click="onSubmit">
            {{ $t('global.next') | upper }}
        </el-button>
    </div>
</template>

<script>
    import AccountKeyPair from 'cosmosjs/src/types/AccountKeyPair';

    export default {
        name: 'KeyInput',
        data() {
            const validateKeyStore = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('global.required', {name: 'KeyStore'})));
                } else {
                    try {
                        const key = JSON.parse(value);
                        if (!key.address || !AccountKeyPair.isValidAddress(key.address)) {
                            callback(new Error(this.$t('recover.keyError')));
                            return;
                        }
                        callback();
                    } catch (e) {
                        callback(new Error(this.$t('recover.keyError')));
                    }
                }
            };
            return {
                form: {
                    keyStore: '',
                },
                rules: {
                    keyStore: [{validator: validateKeyStore, trigger: 'blur'}],
                },
            };
        },
        methods: {
            onSubmit() {
                const {form, $router, $store} = this;
                this.$refs.form.validate(async (valid) => {
                    if (!valid) return false;

                    $store.dispatch('recover/inputKey', form);
                    $router.push('/recover/key/submit');

                    return true;
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
</style>
