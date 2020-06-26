<template>
    <k-card :title="$t('create.confirm')">
        <div class="label">
            <a
                class="btn-reset"
                @click="reset">
                {{ $t('create.reset') }}
            </a>
        </div>
        <el-form
            ref="form"
            :model="form"
            label-position="top"
            class="phrase-container">
            <div class="phrase">
                <el-form-item
                    v-for="i in Object.keys(form)"
                    :key="i"
                    :prop="i"
                    class="word-input">
                    <el-input
                        :ref="`input_${i}`"
                        :value="form[i]"
                        :placeholder="i"
                        clearable
                        @focus="() => handleFocus(i)"
                        @clear="() => handleClear(i)">
                    </el-input>
                </el-form-item>
            </div>
        </el-form>
        <el-row :gutter="8">
            <el-col
                v-for="i in buttonList"
                :key="i"
                :xs="6"
                :sm="6"
                class="item">
                <el-button
                    class="btn__primary"
                    @click="() => onClick(i)">
                    {{ i }}
                </el-button>
            </el-col>
        </el-row>
    </k-card>
</template>

<script>
    import {mapState} from 'vuex';
    import {sortBy} from 'lodash';

    const phrase = {};
    for (let i = 1; i < 25; i++) {
        phrase[`${i}`] = '';
    }

    export default {
        name: 'Confirm',
        data() {
            return {
                form: {...phrase},
                focusInput: '1',
            };
        },
        computed: {
            ...mapState('account', ['account']),
            buttonList() {
                if (!this.account.getMnemonic()) return [];

                const origin = this.account.getMnemonic().split(' ');
                const phraseList = Object.values(this.form);
                if (phraseList.length) {
                    return sortBy(origin.filter(i => !phraseList.find(j => i === j)));
                }

                return sortBy(origin);
            },
        },
        mounted() {
            this.focus('1');
        },
        methods: {
            onClick(v) {
                this.form[this.focusInput] = v;
                if (this.focusInput < 24) {
                    this.focus(`${this.focusInput - 0 + 1}`);
                }

                // submit after all buttons clicked
                if (this.buttonList.length === 0) {
                    if (Object.values(this.form).join(' ') !== this.account.getMnemonic()) {
                        this.$message({
                            type: 'error',
                            message: this.$t('create.mnemonicWarn'),
                        });
                        return;
                    }

                    this.$store.dispatch('account/finishCreate');
                    this.onFinish();
                }
            },
            reset() {
                this.form = {...phrase};
                this.focus('1');
            },
            handleFocus(i) {
                this.focusInput = i;
            },
            focus(i) {
                this.focusInput = i;
                this.$refs[`input_${i}`][0].focus();
            },
            handleClear(i) {
                this.form[i] = '';
                this.focus(i);
            },
            onFinish() {
                this.$alert(this.$t('create.backup'), this.$t('create.success'), {
                    confirmButtonText: this.$t('global.ok'),
                    callback: () => {
                        this.$router.push('/main?tab=assets');
                    },
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .label {
        margin-bottom: 12px;
        text-align: right;

        a {
            cursor: pointer;
        }
    }

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

    .item {
        margin-bottom: 8px;
    }

    @include responsive($sm) {
        .phrase-container {
            .word-input {
                flex-basis: 80px;
            }
        }
    }
</style>
