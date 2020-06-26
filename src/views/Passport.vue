<template>
    <k-page
        class="passport-container"
        :title="$t('passport.title')">
        <k-card>
            <template v-if="nameList && nameList.length > 0">
                <div class="user-select">
                    <div
                        v-for="user in nameList"
                        :key="user"
                        :class="`user-select__item ${user === userName &&'is-checked'}`"
                        @click="e => changeAccount(e, user)">
                        <account-select
                            :user-map="userMap"
                            :user="user"
                            :show-delete="user !== userName"/>
                    </div>
                </div>
            </template>
            <k-card
                class="passport-card">
                <k-btn-card
                    :title="$t('passport.create')"
                    :src="icon1"
                    :breif="$t('passport.createBreif')"
                    link="/create/pass"/>
                <k-btn-card
                    :title="$t('passport.recover')"
                    :src="icon2"
                    :breif="$t('passport.recoverBreif')"
                    link="/recover/key/text"/>
            </k-card>
        </k-card>
    </k-page>
</template>

<script>
    import {mapState} from 'vuex';
    import {isEmpty} from 'lodash';

    import icon1 from '../assets/icon-create.svg';
    import icon2 from '../assets/icon-import.svg';

    export default {
        name: 'Passport',
        data() {
            return {
                icon1,
                icon2,
            };
        },
        computed: {
            ...mapState('account', ['userMap', 'userName']),
            nameList() {
                return Object.keys(this.userMap).sort(a => a === this.userName ? -1 : 1);
            },
        },
        mounted() {

        },
        methods: {
            isEmpty,
            async changeAccount(e, name) {
                const successMsg = this.$t('global.success', {
                    name: this.$t('passport.login'),
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

                                    this.$router.push('main?tab=assets');
                                })
                                .catch(ee => {
                                    console.log(ee);
                                    this.$message.error(
                                        `${this.$t('create.pass')}${this.$t('global.error')} ${ee}`,
                                    );
                                });

                            return true;
                        },
                    },
                )
                    .then(() => {
                    })
                    .catch(() => {
                    });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .passport-container {
        .user-select {
            margin: 0 0 $padding-xsmall;

            &__item {
                margin: 0 0 $padding-xsmall;
                padding: $padding-basic;
                background: $color-primary;
                display: flex;
                align-items: center;
                cursor: pointer;
                transition: background-color $trans;

                &.is-checked,
                &:hover {
                    background: $color-hover;
                }

                &.math {
                    display: block;

                    .math-top {
                        display: flex;
                        align-items: center;
                        font-size: 20px;

                        span {
                            margin-bottom: 4px;
                        }
                    }

                    .math-logo {
                        width: 36px;
                        overflow: hidden;
                    }

                    p {
                        margin-top: 2px;
                    }
                }

                &.math1 {
                    display: flex;
                    justify-content: space-between;
                }
            }
        }

        .passport-card {
        }
    }
</style>
