<template>
    <k-card
        v-if="!isEmpty(detailData)"
        class="proposal-detail">
        <div class="item-details proposal">
            <div class="item-details__row">
                <div class="proposal__info">
                    <div class="proposal__title">
                        {{ get(detailData, 'content.value.title') || '' }}
                    </div>
                    <div class="proposal__id">
                        <div class="item-details__label">
                            {{ $t('common.id') }}
                        </div>
                        <div class="proposal__id__val">
                            {{ detailData.id }}
                        </div>
                    </div>
                </div>
                <div class="proposal__status">
                    <div class="item-details__label">
                        {{ $t('common.status') }}
                    </div>
                    <div
                        class="item-details__value"
                        :class="getStatus.value">
                        {{ $t(getStatus.title) }}
                    </div>
                </div>
            </div>
            <div class="item-details__section">
                <div class="item-details__data">
                    <div class="item-details__label">
                        {{ $t('gov.proposal.dates.submit_time') }}
                    </div>
                    <div class="item-details__value">
                        {{ detailData.submit_time | formatTime }}
                    </div>
                </div>
            </div>
            <div class="item-details__section">
                <div class="item-details__section__title">
                    {{ $t('common.content') }}
                </div>
                <div class="item-details__section__content">
                    <div class="item-details__data">
                        <div class="item-details__label">
                            {{ $t('common.type') }}
                        </div>
                        <div class="item-details__value">
                            {{ get(detailData, "content.type") || "" }}
                        </div>
                    </div>
                    <div class="item-details__data">
                        <div class="item-details__label">
                            {{ $t('common.description') }}
                        </div>
                        <div class="item-details__value">
                            {{ get(detailData, "content.value.description") || "" }}
                        </div>
                    </div>
                    <template v-if="get(detailData, 'content.value.changes')">
                        <div class="item-details__data">
                            <div class="item-details__label">
                                {{ $t('gov.proposal.fields.changes') }}
                            </div>
                            <div class="item-details__value">
                                <div class="proposal__content__changes">
                                    <div class="table__scroll">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>
                                                    {{ $t('gov.proposal.changes.subspace') }}
                                                </th>
                                                <th>
                                                    {{ $t('gov.proposal.changes.key') }}
                                                </th>
                                                <th>
                                                    {{ $t('gov.proposal.changes.subkey') }}
                                                </th>
                                                <th>
                                                    {{ $t('gov.proposal.changes.value') }}
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <template
                                                v-for="(c, i) in get(detailData, 'content.value.changes')">
                                                <tr
                                                    :key="i+c.key">
                                                    <td>
                                                        {{ c.subspace }}
                                                    </td>
                                                    <td>
                                                        {{ c.key }}
                                                    </td>
                                                    <td>
                                                        {{ c.subkey || '-' }}
                                                    </td>
                                                    <td>
                                                        {{ c.value }}
                                                    </td>
                                                </tr>
                                            </template>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="item-details__section">
                <div class="item-details__section__title">
                    {{ $t('gov.deposit') }}
                </div>
                <div class="item-details__section__content">
                    <div class="item-details__data">
                        <div class="item-details__label">
                            {{ $t('gov.proposal.fields.total_deposit') }}
                        </div>
                        <div class="item-details__value">
                            {{ totalDeposit | formatAmount }}
                        </div>
                    </div>
                    <template v-if="detailData.proposal_status === 'DepositPeriod'">
                        <div class="item-details__row item-details__data">
                            <div>
                                <div class="item-details__label">
                                    {{ $t("gov.proposal.need_deposit") }}
                                </div>
                                <div class="item-details__value">
                                    {{ needDeposit | toToken | formatAmount }}
                                </div>
                            </div>
                            <div class="proposal__deposit">
                                <template v-if="openDeposit">
                                    <div class="proposal__deposit__amount">
                                        <el-form
                                            ref="form"
                                            :model="form"
                                            :rules="rules">
                                            <el-form-item prop="amount">
                                                <el-input
                                                    v-model.number.trim="form.amount"></el-input>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </template>
                                <div class="item-details__btns">
                                    <div
                                        class="el-button"
                                        @click="openDeposit ? onSubmit('form') : openDeposit = true">
                                        <font-awesome-icon icon="comment-dollar"/>
                                        <span>{{ $t('gov.deposit') | upper }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <el-progress
                            :percentage="depositPercent"
                            color="#369EFF">
                        </el-progress>
                    </template>
                </div>
            </div>
            <template v-if="detailData.proposal_status === 'DepositPeriod'"/>
            <template v-else-if="detailData.proposal_status === 'VotingPeriod'">
                <div class="item-details__section">
                    <div class="item-details__section__title">
                        {{ $t('gov.voting') }}
                    </div>
                    <div class="item-details__section__content">
                        <div class="item-details__data">
                            <div class="item-details__label">
                                {{ $t("gov.time_remains") }}
                            </div>
                            <div class="item-details__value">
                                {{ votingTime }}
                            </div>
                        </div>
                        <div class="item-details__row item-details__data">
                            <div>
                                <div class="item-details__label">
                                    {{ $t("gov.proposal.dates.voting_start_time") }}
                                </div>
                                <div class="item-details__value">
                                    {{ detailData.voting_start_time | formatTime }}
                                </div>
                            </div>
                            <el-progress
                                type="circle"
                                :percentage="timePercent"
                                :show-text="false"
                                color="#369EFF">
                            </el-progress>
                            <div>
                                <div class="item-details__label">
                                    {{ $t("gov.proposal.dates.voting_end_time") }}
                                </div>
                                <div class="item-details__value">
                                    {{ detailData.voting_end_time | formatTime }}
                                </div>
                            </div>
                        </div>
                        <div class="item-details__data">
                            <div class="item-details__label">
                                {{ $t('gov.vote') }}
                            </div>
                            <div class="item-details__value proposal__votes">
                                <template
                                    v-for="(item, key, index) in detailData.final_tally_result">
                                    <div
                                        :key="index"
                                        class="proposal__vote">
                                        <el-radio
                                            v-model="voted"
                                            :label="key">
                                            <div class="radio">
                                                <div>{{ $t(options[key].title) | upper }}</div>
                                            </div>
                                        </el-radio>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="item-details__section">
                    <div class="item-details__title">
                        {{ $t('gov.voting_result') }}
                    </div>
                    <div class="item-details__section__content">
                        <!--                        <graph-pie-->
                        <!--                            :width="150"-->
                        <!--                            :height="150"-->
                        <!--                            theme="dark"-->
                        <!--                            :styles="{background: 'transparent'}"-->
                        <!--                            :text-align="'right'"-->
                        <!--                            :text-vertical-align="'bottom'"-->
                        <!--                            :colors="[ '#369EFF', '#bdc2ca', '#e6a23c', '#E25759' ]"-->
                        <!--                            :values="Object.values(totalVotes)"-->
                        <!--                            :names="Object.keys(totalVotes)"-->
                        <!--                            :data-format="dataFormat">-->
                        <!--                            <legends :names="Object.keys(totalVotes)"></legends>-->
                        <!--                            <tooltip :names="Object.keys(totalVotes)" :position="'top'"></tooltip>-->
                        <!--                        </graph-pie>-->
                        <div
                            v-for="(item, key, index) in detailData.final_tally_result"
                            :key="index"
                            class="item-details__row item-details__data">
                            <div>
                                <div class="item-details__label">
                                    {{ $t("gov.option") }}
                                </div>
                                <div class="item-details__value">
                                    {{ $t(options[key].title) }}
                                </div>
                            </div>
                            <div>
                                <div class="item-details__label">
                                    {{ $t("gov.tally") }}
                                </div>
                                <div class="item-details__value">
                                    {{ detailData.final_tally_result[key] }}
                                </div>
                            </div>
                            <div>
                                <div class="item-details__label">
                                    {{ $t("gov.number_votes") }}
                                </div>
                                <div class="item-details__value">
                                    {{ voteCount(key) }}
                                </div>
                            </div>
                            <div>
                                <div class="item-details__label">
                                    {{ $t("gov.proportion") }}
                                </div>
                                <div class="item-details__value">
                                    {{ percent(detailData.final_tally_result[key]) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <el-dialog
            :title="$t('create.pass')"
            :visible.sync="dialogVisible"
            width="360px">
            <el-input
                v-model="form.pass"
                type="password"
                :placeholder="$t('create.pass')"
                @keyup.enter.native="handle(false)">
            </el-input>
            <span
                slot="footer"
                class="dialog-footer">
                <el-button
                    class="dia-ok-btn"
                    @click="handle(false)">
                    {{ $t('global.ok') }}
                </el-button>
              </span>
        </el-dialog>
    </k-card>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import {get, isEmpty} from 'lodash';
    import {DEFAULT_DENOM, status, options} from '../../constants';
    import View from '../../views/View';

    export default {
        name: 'ProposalDetail',
        extends: View,
        data () {
            return {
                options,
                openDeposit: false,
                type: null,
                dialogVisible: false,
                form: {
                    amount: null,
                    pass: null,
                },
                voted: '',
            };
        },
        computed: {
            ...mapState('gov', ['proposalMap', 'votes', 'depositParams']),
            ...mapState('account', ['balance', 'userName', 'userMap']),
            ...mapGetters('account', ['currentAddress']),
            rules () {
                const validatorNumber = (rule, value, callback) => {
                    if (!Number.isInteger(value) || value <= 0) {
                        callback(new Error(this.$t('gov.validations.positive_number')));
                        return;
                    }
                    // if (!Number.isInteger(value) || value > this.needDeposit) {
                    //     callback(new Error(this.$t('gov.validations.should_be_lower')));
                    //     return;
                    // }
                    callback();
                };
                return {
                    amount: [
                        {
                            validator: validatorNumber,
                            trigger: 'blur',
                        },
                    ],
                };
            },
            detailData () {
                return this.proposalMap[this.$route.params.id];
            },
            totalVotes () {
                return this.detailData.votes.reduce((obj, v) => {
                    obj[v.option] = (obj[v.option] || 0) + 1;
                    return obj;
                }, {});
            },
            currentBalance () {
                return this.balance.filter(i => i.denom === DEFAULT_DENOM);
            },
            totalVote () {
                if (this.detailData.proposal_status === 'VotingPeriod') {
                    if (!isEmpty(this.votes)) {
                        return this.votes.length;
                    }
                    return 0;
                }
                return (
                    Number(this.detailData.final_tally_result.yes)
                    + Number(this.detailData.final_tally_result.no)
                    + Number(this.detailData.final_tally_result.abstain)
                    + Number(this.detailData.final_tally_result.no_with_veto)
                );
            },
            percent () {
                return (value) => {
                    if (value === '0') {
                        return 0;
                    }
                    const result = (Number(value) / this.totalVote) * 100;
                    return `${result}%`;
                };
            },
            votingTime () {
                const m = this.surplusTime;
                if (m <= 60) {
                    return `${m} minutes`;
                }

                const h = Math.trunc(m / 60);

                return `${h} hours ${m - h * 60} minutes`;
            },
            surplusTime () {
                const time = Math.abs(
                    new Date(this.detailData.voting_end_time).getTime()
                    - new Date().getTime(),
                );

                return Math.ceil(time / 1000 / 60);
            },
            voteTime () {
                const time = Math.abs(
                    new Date(this.detailData.voting_end_time).getTime()
                    - new Date(this.detailData.voting_start_time).getTime(),
                );
                return Math.ceil(time / 1000 / 60);
            },
            timePercent () {
                return 100 - Number((this.surplusTime / this.voteTime) * 100);
            },
            voteYes () {
                if (!isEmpty(this.votes)) {
                    const filterArr = this.votes.filter(item => item.option === 'Yes');
                    return filterArr.length;
                }
                return 0;
            },
            voteNo () {
                if (!isEmpty(this.votes)) {
                    const filterArr = this.votes.filter(item => item.option === 'No');
                    return filterArr.length;
                }
                return 0;
            },
            voteAbstain () {
                if (!isEmpty(this.votes)) {
                    const filterArr = this.votes.filter(item => item.option === 'Abstain');
                    return filterArr.length;
                }
                return 0;
            },
            voteNoWithVeto () {
                if (!isEmpty(this.votes)) {
                    const filterArr = this.votes.filter(item => item.option === 'NoWithVeto');
                    return filterArr.length;
                }
                return 0;
            },
            voteCount () {
                return (option) => {
                    switch (option) {
                        case 'yes':
                            return this.voteYes;
                        case 'no':
                            return this.voteNo;
                        case 'abstain':
                            return this.voteAbstain;
                        case 'no_with_veto':
                            return this.voteNoWithVeto;
                        default:
                            return null;
                    }
                };
            },
            totalDeposit () {
                return get(this.detailData, 'total_deposit')[0] || {
                    amount: 0,
                    denom: DEFAULT_DENOM,
                };
            },
            minAmount () {
                if (!isEmpty(this.depositParams)) {
                    return get(this.depositParams, 'min_deposit')[0];
                }

                return {denom: DEFAULT_DENOM, amount: 0};
            },
            needDeposit () {
                if (!isEmpty(this.minAmount)) {
                    if (Number(this.totalDeposit.amount) >= Number(this.minAmount.amount)) {
                        return 0;
                    }

                    return (
                        Number(this.minAmount.amount) - Number(this.totalDeposit.amount)
                    );
                }

                return 0;
            },
            depositPercent () {
                if (!isEmpty(this.totalDeposit) && !isEmpty(this.minAmount)) {
                    return (
                        (Number(this.totalDeposit.amount)
                            / Number(this.minAmount.amount))
                        * 100
                    );
                }

                return 0;
            },
            getStatus () {
                return status[this.detailData.proposal_status];
            },
        },
        watch: {
            voted () {
                this.type = false;
                this.dialogVisible = true;
                this.form.pass = '';
            },
        },
        mounted () {
            this.$store.dispatch('gov/fetchAllProposals', {});
            this.$store.dispatch('account/fetchBalance');
            this.$store.dispatch('gov/fetchDepositParams');
            this.$store.dispatch('gov/fetchProposal', this.$route.params.id);
            this.$store.dispatch('gov/fetchProposalTally', this.$route.params.id);
            this.$store.dispatch('gov/fetchProposalVote', this.$route.params.id);
            this.$store.dispatch('gov/fetchProposalVotes', this.$route.params.id);
            this.$store.dispatch('gov/fetchProposalProposer', this.$route.params.id);
            this.$store.dispatch('gov/fetchProposalDeposit', this.$route.params.id);
            this.$store.dispatch('gov/fetchProposalDeposits', this.$route.params.id);
        },
        methods: {
            isEmpty,
            get,
            onSubmit (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.type = true;
                        this.form.pass = '';
                        this.dialogVisible = true;
                    } else {
                        return false;
                    }

                    return true;
                });
            },
            dataFormat (a, b) {
                return b ? `${b}%` : a;
            },
            async handle (useMathWallet) {
                if (!useMathWallet && !this.form.pass) {
                    this.$message({
                        type: 'error',
                        message: this.$t('global.required', {name: this.$t('create.pass')}),
                        center: true,
                    });
                    return false;
                }
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                });
                if (this.type) {
                    this.form.denom = get(this.detailData, 'total_deposit.0.denom');
                } else {
                    let option;
                    switch (this.voted) {
                        case 'yes':
                            option = 'Yes';
                            break;
                        case 'abstain':
                            option = 'Abstain';
                            break;
                        case 'no':
                            option = 'No';
                            break;
                        case 'no_with_veto':
                            option = 'NoWithVeto';
                            break;
                        default:
                            option = 'No';
                            break;
                    }
                    this.form.option = option;
                }
                const params = {
                    form: this.form,
                    keyStore: this.userMap[this.userName],
                    proposalId: this.$route.params.id,
                    pass: this.form.pass,
                };
                try {
                    const {
                        logs: [
                            {
                                success,
                            },
                        ],
                        error, raw_log: {
                            code,
                            message,
                        },
                    } = await this.$store.dispatch(this.type ? 'gov/deposit' : 'gov/vote', params);
                    if (error) {
                        this.$message({
                            type: 'error',
                            message: error,
                            center: true,
                        });
                    }
                    if (code) {
                        // const codeErrors = {
                        //     4: 'Signature verification error',
                        //     5: 'insufficient funds to pay for fees',
                        // };

                        this.$message({
                            type: 'error',
                            message,
                            center: true,
                        });
                    }

                    if (success) {
                        this.dialogVisible = false;
                        this.$message({
                            type: 'success',
                            message: this.$t('global.success', {
                                name: this.type ? this.$t('gov.deposit') : this.$t('gov.vote'),
                            }),
                            center: true,
                            duration: 2000,
                            onClose: () => {
                                this.$store.dispatch('account/fetchBalance');
                                this.$store.dispatch('gov/fetchProposalVotes', this.$route.params.id);
                            },
                        });
                        loading.close();
                    } else {
                        this.$message({
                            type: 'error',
                            message,
                            center: true,
                        });
                    }

                    loading.close();
                } catch (e) {
                    this.$message({
                        type: 'error',
                        message: `${this.$t('send.error')} ${e}`,
                        center: true,
                    });
                }

                return true;
            },
        },
    };
</script>
<style lang="scss" scoped>
    .proposal {

        &__info {
            margin: 0 0 20px 0;
        }

        &__title {
            font-size: 20px;
        }

        &__id {
            display: flex;
            font-size: 12px;

            &__val {
                margin: 0 0 0 5px;
            }
        }

        &__status {
            .DepositPeriod {
                color: $color-warning;
            }

            .Passed {
                color: $color-success;
            }

            .Rejected {
                color: $color-error;
            }

            .VotingPeriod {
                color: $color-active;
            }
        }

        &__content {
            &__changes {
                .table {
                    &__wrapper {
                        position: relative;
                    }

                    &__scroll {

                        @include responsive($xxs) {
                            overflow-x: auto;
                            width: 300px;
                        }

                        table {
                            tr {
                                th {
                                    font-size: 12px;
                                    text-align: left;
                                    padding: 0 50px 0 0;
                                }

                                td {
                                    font-size: 14px;
                                    padding: 0 20px 0 0;
                                }
                            }
                        }
                    }
                }
            }
        }

        &__deposit {
            display: flex;
            margin: 10px 0;

            &__amount {
                display: flex;
            }

            &__balance {
                display: flex;
                flex-direction: column;
                font-size: 12px;
                width: 200px;
            }
        }

        &__votes {
            padding: 16px 0;
            display: grid;
            grid-gap: 1rem;
            grid-template-rows: 100px 0 0;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

            @include responsive($sm) {
                grid-template-rows: 50px 50px 0;
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            }
        }

        &__vote {
            background: transparent;
            display: flex;

            &:hover {
                background: $color-hover;
            }

            .el-radio {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

    .proposal-detail {
        .div {
            background: $color-background-card;
            padding: 4px $padding-basic;
            margin-bottom: 16px;

            .item {
                margin: 16px 0;
            }
        }

        .voting-time {
            padding: $padding-basic;
            background: #fff;
            border-radius: 6px;
            color: #000;
            margin-bottom: 40px;

            .time {
                margin-top: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .el-progress {
                    flex-basis: 60%;
                }

                /deep/ .el-progress__text {
                    display: none;
                }

                /deep/ .el-progress-bar {
                    padding-right: 0;
                }
            }
        }

        .title {
            text-align: center;
            font-size: 24px;

            span {
                color: red;
            }
        }

        .content {
            padding: $padding-basic;
            background: #fff;
            border-radius: 6px;
            margin-top: 20px;

            > .content-top {
                margin-top: 15px;
            }

            > .status {
                margin-top: 20px;
            }

            > .deposit {
                margin-top: 20px;
            }

            > .des {
                margin-top: 20px;
                color: rgba(0, 0, 0, 0.7);
            }

            > .changes {
                margin-top: 20px;

                p {
                    margin-bottom: 15px;
                }

                .params {
                    color: rgba(0, 0, 0, 0.7);

                    span {
                        margin-right: 15px;
                    }
                }
            }

            > .submit-time {
                margin-top: 20px;
            }

            .detail-info {
                color: rgba(0, 0, 0, 0.7);
            }
        }

        .form-content {
            margin: 60px auto 0;
            border-radius: 4px;
            max-width: 470px;
            color: rgba(0, 0, 0, 0.8);

            /deep/ .el-progress__text {
                display: none;
            }

            /deep/ .el-progress-bar {
                padding-right: 0;
            }
        }

        .vote-content {
            margin-top: 60px;

            .table-header {
                background-color: rgba(245, 247, 250, 1);
                display: flex;
                justify-content: space-around;
                height: 50px;
                line-height: 50px;
                border-radius: 4px;
                margin-bottom: 10px;
                text-align: left;
                color: rgba(0, 0, 0, 0.7);

                &.nav {
                    font-weight: bolder;
                }

                &.hover {
                    &:hover {
                        cursor: pointer;
                        background-color: rgba(230, 230, 230, 1);
                    }
                }

                > div {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-indent: 1em;
                    flex-basis: 20%;
                }

                .radio {
                    flex-basis: 10%;
                }

                /deep/ .el-radio__label {
                    display: none !important;
                }
            }
        }

        .balance {
            display: flex;
            justify-content: space-between;
        }

        .ok-btn {
            width: 100%;
            height: 48px;
            margin-top: 10px;
        }
    }

    .dialog-footer {
        .dia-ok-btn {
            background-color: $main-btn;
            color: #fff;
        }
    }
</style>
