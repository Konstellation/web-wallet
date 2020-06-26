<template>
    <div class="recover__choice">
        <div class="recover__choice__input">
            <el-form
                ref="form"
                :model="phrase"
                :rules="rules"
                label-position="top"
                @submit="onSubmit">
                <div class="phrase">
                    <el-form-item
                        v-for="i in Object.keys(phrase)"
                        :key="i"
                        :prop="i"
                        class="word-input">
                        <el-autocomplete
                            v-model="phrase[i]"
                            :fetch-suggestions="(query, callback) => querySearch(i, query, callback)"
                            :placeholder="i"
                            :trigger-on-focus="false"
                            clearable
                            @change="v => handleChange(i, v)"
                            @select="v => handleSelect(i, v)"/>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <el-button
            class="btn__primary"
            native-type="“submit”"
            @click="onSubmit">
            {{ $t('global.next') | upper }}
        </el-button>
    </div>
</template>

<script>
    import {wordList} from '@/constants/wordList';

    export default {
        name: 'PhraseInput',
        data() {
            const validator = (rule, value, callback) => {
                if (value.trim().split(' ').length > 1) {
                    callback();
                    return;
                }
                if (!wordList.find(i => i === value)) {
                    callback(new Error(this.$t('create.mnemonicWarn')));
                    return;
                }
                callback();
            };

            const phrase = {};
            for (let i = 1; i < 25; i++) {
                phrase[`${i}`] = '';
            }

            const rules = {};
            Object.keys(phrase).forEach(k => {
                rules[k] = [{validator, trigger: 'change'}];
            });

            return {
                wordList,
                phrase,
                rules,
            };
        },
        methods: {
            handleChange(i, v) {
                const ls = v.trim().split(' ');
                if (ls.length > 1) {
                    this.splitInput(i, ls);
                }
            },
            querySearch(i, query, callback) {
                this.handleChange(i, query);

                const words = query
                    ? this.wordList.filter(w => w.indexOf(query) === 0)
                    : this.wordList;
                callback(words.map(w => ({value: w})));
            },
            handleSelect(i, e) {
                this.handleChange(i, e.value);
            },
            splitInput(i, ls) {
                ls.forEach((word, index) => {
                    this.phrase[`${i - 0 + index}`] = word;
                });
            },
            onSubmit(e) {
                e.preventDefault();
                const {phrase, $router, $store} = this;

                this.$refs.form.validate(async (valid) => {
                    if (!valid) return false;

                    $store.dispatch('recover/inputPhrase', {
                        phrase: Object.values(phrase).join(' '),
                    });

                    $router.push('/recover/phrase/submit');

                    return true;
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .phrase {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .word-input {
            flex-basis: 100px;
            flex-grow: 1;
            margin: 4px 4px 16px;

            input.el-input__inner {
                padding-left: 8px;
            }
        }
    }
</style>
