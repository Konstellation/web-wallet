<template>
    <div class="list">
        <router-link
            v-for="p in flist"
            :key="p.id"
            :to="`/gov/proposal/${p.id}`"
            class="list__row">
            <div class="proposal">
                <div class="row">
                    <div class="proposal__type">
                        {{ get(p, "content.type") || "" }}
                    </div>
                    <div class="proposal__id">
                        ID {{ p.id }}
                    </div>
                </div>
                <div class="row">
                    <div class="proposal__title">
                        {{ get(p, "content.value.title") || "" }}
                    </div>
                    <div class="proposal__deposit">
                        <div class="label">
                            {{ $t("gov.proposal.fields.total_deposit") }}
                        </div>
                        {{ p.total_deposit | formatAmount }}
                    </div>
                </div>
                <div class="proposal__description">
                    {{ get(p, "content.value.description") || "" }}
                </div>
                <div class="proposal__submit-time">
                    {{ p.submit_time | formatTime }}
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
    import {get} from 'lodash';
    import {mapGetters, mapState} from 'vuex';

    export default {
        props: {
            list: Array,
            load: {type: Boolean, default: false},
        },
        data () {
            return {};
        },
        computed: {
            ...mapState('account', ['tokenMap']),
            ...mapGetters('account', {
                address: 'currentAddress',
            }),
            flist () {
                return this.list;
            },
        },
        methods: {
            get,
        },
    };
</script>

<style lang="scss" scoped>
    .list {
        max-height: 45vh;
        overflow-y: scroll;

        &__row {
            .proposal {
                display: flex;
                flex-direction: column;
                flex: 1;

                &__title {
                    color: $color-title;
                    font-size: 20px;
                }

                &__content {
                    align-items: start;
                }

                &__type, &__id {
                    color: $color-title;
                    font-size: 12px;
                }

                &__submit-time {
                    font-size: 12px;
                }
            }

            table {
                border-collapse: collapse;
            }

            table td {
                border: 1px solid $color-line;
                padding: 5px;
            }

            table tr:first-child td {
                border-top: 0;
            }

            table tr td:first-child {
                border-left: 0;
            }

            table tr:last-child td {
                border-bottom: 0;
            }

            table tr td:last-child {
                border-right: 0;
            }

            .amount {
                font-size: 20px;
                text-align: right;
            }
        }

        .tx-row:first-child {
            margin-top: 0;
        }
    }
</style>
