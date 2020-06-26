<template>
    <div
        class="issue"
        @click="goAssets">
        <template v-if="owner">
            <div class="issue__owner">
                <el-tooltip
                    :content="$t('issues.owner')"
                    placement="top">
                    <font-awesome-icon
                        icon="star"/>
                </el-tooltip>
            </div>
        </template>
        <div
            class="issue__logo logo-none">
        </div>
        <div class="issue__symbol">
            {{ token.symbol | upper }}
        </div>
        <div class="issue__total-supply">
            {{ token.total_supply }}
        </div>
        <div class="issue__features">
            <template v-for="feature in features">
                <el-tooltip
                    :key="feature.title"
                    class="item"
                    :content="$t(feature.title)"
                    placement="top">
                    <font-awesome-icon
                        :class="feature.class"
                        :icon="feature.icon"/>
                </el-tooltip>
            </template>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'IssuePanel',
        props: {
            token: {type: Object, required: true},
        },
        computed: {
            ...mapGetters('account', {address: 'currentAddress'}),
            owner() {
                return this.token.owner === this.address;
            },
            features() {
                return [
                    {
                        title: `issues.burn_owner_${this.token.burn_owner_disabled ? 'disabled' : 'enabled'}`,
                        icon: 'burn',
                        class: this.token.burn_owner_disabled ? 'disabled' : 'enabled',
                    },
                    {
                        title: `issues.burn_holder_${this.token.burn_holder_disabled ? 'disabled' : 'enabled'}`,
                        icon: 'fire',
                        class: this.token.burn_holder_disabled ? 'disabled' : 'enabled',
                    },
                    {
                        title: `issues.burn_from_${this.token.burn_from_disabled ? 'disabled' : 'enabled'}`,
                        icon: 'fire-alt',
                        class: this.token.burn_from_disabled ? 'disabled' : 'enabled',
                    },
                    {
                        title: `issues.mint_${this.token.mint_disabled ? 'disabled' : 'enabled'}`,
                        icon: 'hammer',
                        class: this.token.mint_disabled ? 'disabled' : 'enabled',
                    },
                    {
                        title: `issues.freeze_${this.token.freeze_disabled ? 'disabled' : 'enabled'}`,
                        icon: 'snowflake',
                        class: this.token.freeze_disabled ? 'disabled' : 'enabled',
                    },
                ];
            },
        },
        methods: {
            goAssets() {
                this.$router.push({
                    name: 'issues.token',
                    params: {denom: this.token.denom},
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .issue {
        flex-basis: 216px;
        height: 188px;
        text-align: center;
        background: $color-primary;
        color: $color-title;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px $padding-basic $padding-basic $padding-basic;
        cursor: pointer;

        &:hover {
            background: $color-hover;
        }

        img {
            width: 40px;
            height: 40px;
            margin-top: 8px;
            margin-bottom: 16px;
            position: relative;
            top: 2px;
        }

        .logo-none {
            width: 48px;
            height: 48px;
            margin-top: 4px;
            margin-bottom: 12px;
            position: relative;
            top: 2px;
            background: $color-active;
            border-radius: 24px;
        }

        &__denom {
            font-size: 18px;
        }

        &__owner {
            display: flex;
            align-items: center;
            justify-content: right;
            font-size: 8px;
            width: 100%;
            flex-direction: row;
        }

        &__total-supply {
            font-size: 20px;
        }

        .enabled {
            color: $color-subtitle;
            margin: 0 10px 0 0;
        }

        .disabled {
            color: $color-warning;
            margin: 0 10px 0 0;
        }
    }
</style>
