import Vue from 'vue';
import Router from 'vue-router';
import NotFound from './views/NotFound';
import Main from './views/Main';
import PageWrapper from './views/PageWrapper';

import Login from './views/Login';
import Agree from './views/Agree';
import Passport from './views/Passport';

import Create from './views/Create';
import CreatePass from './views/Create/password';
import CreateMnem from './views/Create/mnemonic';
import CreateConfirm from './views/Create/confirm';

import Recover from './views/Recover';
import RecoverKeyText from './components/Recover/KeyText/KeyInput';
import RecoverKeyFile from './components/Recover/KeyFile/KeyUpload';
import RecoverKeySubmit from './components/Recover/KeyText/KeySubmit';
import RecoverPhraseText from './components/Recover/Phrase/PhraseInput';
import RecoverPhraseSubmit from './components/Recover/Phrase/PhraseSubmit';

import Txs from './components/Txs';
import TxInfo from './components/TransactionInfo';

import Send from './views/Send.vue';
import SendForm from './components/Send/SendForm';
import SendConfirm from './components/Send/SendConfirm';
import SendFinish from './components/Send/SendFinish';
import Receive from './views/Receive';

import Staking from './views/Staking';
import Validator from './views/Validator';
import ValidatorList from './components/Staking/ValidatorList';
import CreateValidatorForm from './components/Staking/CreateValidatorForm';
import EditValidatorForm from './components/Staking/EditValidatorForm';
import ValidatorConfirm from './components/Staking/ValidatorConfirm';
import DelegateForm from './components/Staking/DelegateForm';
import DelegateConfirm from './components/Staking/DelegateConfirm';
import DelegateDetail from './components/Staking/DelegateDetail';
import UnbondForm from './components/Staking/UndelegateForm';
import RedelegateForm from './components/Staking/RedelegateForm';

import GovMain from './views/GovMain';
import Gov from './views/Gov';
import ProposalCreate from './components/Gov/ProposalCreate';
import ProposalDetail from './components/Gov/ProposalDetail';

import Asset from './views/Asset';
import Assets from './views/Assets';
import Issue from './views/Issue';
import Issues from './views/Issues';
import IssueForm from './components/Issues/Issue/IssueForm';
import IssueConfirm from './components/Issues/Issue/IssueConfirm';
import ApproveForm from './components/Issues/Approve/ApproveForm';
import ApproveConfirm from './components/Issues/Approve/ApproveConfirm';
import TransferForm from './components/Issues/Transfer/TransferForm';
import TransferConfirm from './components/Issues/Transfer/TransferConfirm';
import TransferFromForm from './components/Issues/TransferFrom/TransferFromForm';
import TransferFromConfirm from './components/Issues/TransferFrom/TransferFromConfirm';
import MintForm from './components/Issues/Mint/MintForm';
import MintConfirm from './components/Issues/Mint/MintConfirm';
import BurnForm from './components/Issues/Burn/BurnForm';
import BurnConfirm from './components/Issues/Burn/BurnConfirm';
import BurnFromConfirm from './components/Issues/Burn/BurnFromConfirm';
import FreezeForm from './components/Issues/Freeze/FreezeForm';
import FreezeConfirm from './components/Issues/Freeze/FreezeConfirm';
import UnfreezeForm from './components/Issues/Unfreeze/UnfreezeForm';
import UnfreezeConfirm from './components/Issues/Unfreeze/UnfreezeConfirm';
import ChangeFeaturesConfirm from './components/Issues/ChangeFeatures/ChangeFeaturesConfirm';
import ChangeDescriptionConfirm
    from './components/Issues/ChangeDescription/ChangeDescriptionConfirm';
import TransferOwnershipConfirm
    from './components/Issues/TransferOwnership/TransferOwnershipConfirm';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            redirect: '/main',
        },
        {
            path: '/agree',
            name: 'agree',
            component: Agree,
        },
        {
            path: '/passport',
            name: 'passport',
            component: Passport,
            meta: {
                guest: true,
                auth: false,
            },
        },
        {
            path: '/passport/login',
            name: 'login',
            component: Login,
            meta: {
                guest: true,
            },
        },
        {
            path: '/create',
            name: 'create',
            component: Create,
            children: [
                {
                    path: 'pass',
                    component: CreatePass,
                },
                {
                    path: 'mnemonic',
                    component: CreateMnem,
                },
                {
                    path: 'confirm',
                    component: CreateConfirm,
                },
            ],
        },
        {
            path: '/recover',
            name: 'recover',
            component: Recover,
            children: [
                {
                    path: 'key/text',
                    component: RecoverKeyText,
                },
                {
                    path: 'key/submit',
                    component: RecoverKeySubmit,
                },
                {
                    path: 'key/file',
                    component: RecoverKeyFile,
                },
                {
                    path: 'phrase/input',
                    component: RecoverPhraseText,
                },
                {
                    path: 'phrase/submit',
                    component: RecoverPhraseSubmit,
                },
            ],
        },
        {
            path: '/main',
            name: 'main',
            component: Main,
            meta: {
                auth: true,
            },
        },
        {
            path: '/assets',
            component: Assets,
        },
        {
            path: '/assets',
            name: 'assets',
            component: PageWrapper,
            children: [
                {
                    path: '/assets/:denom',
                    name: 'assets.asset',
                    component: Asset,
                },
            ],
        },
        {
            path: '/issues',
            component: Issues,
        },
        {
            path: '/issues',
            name: 'issues',
            component: PageWrapper,
            children: [
                {
                    path: '/issue/:denom',
                    name: 'issues.token',
                    component: Issue,
                },
                {
                    path: '/issues/issue',
                    name: 'issues.issue',
                    component: IssueForm,
                },
                {
                    path: '/issues/issue/confirm',
                    name: 'issues.issue_confirm',
                    component: IssueConfirm,
                },
                {
                    path: '/issues/approve',
                    name: 'issues.approve',
                    component: ApproveForm,
                },
                {
                    path: '/issues/approve/confirm',
                    name: 'issues.approve_confirm',
                    component: ApproveConfirm,
                },
                {
                    path: '/issues/transfer',
                    name: 'issues.transfer',
                    component: TransferForm,
                },
                {
                    path: '/issues/transfer/confirm',
                    name: 'issues.transfer_confirm',
                    component: TransferConfirm,
                },
                {
                    path: '/issues/transfer-from',
                    name: 'issues.transfer_from',
                    component: TransferFromForm,
                },
                {
                    path: '/issues/transfer-from/confirm',
                    name: 'issues.transfer_from_confirm',
                    component: TransferFromConfirm,
                },
                {
                    path: '/issues/mint',
                    name: 'issues.mint',
                    component: MintForm,
                },
                {
                    path: '/issues/mint/confirm',
                    name: 'issues.mint_confirm',
                    component: MintConfirm,
                },
                {
                    path: '/issues/burn',
                    name: 'issues.burn',
                    component: BurnForm,
                },
                {
                    path: '/issues/burn/confirm',
                    name: 'issues.burn_confirm',
                    component: BurnConfirm,
                },
                {
                    path: '/issues/burn_from/confirm',
                    name: 'issues.burn_from_confirm',
                    component: BurnFromConfirm,
                },
                {
                    path: '/issues/freeze',
                    name: 'issues.freeze',
                    component: FreezeForm,
                },
                {
                    path: '/issues/freeze/confirm',
                    name: 'issues.freeze_confirm',
                    component: FreezeConfirm,
                },
                {
                    path: '/issues/unfreeze',
                    name: 'issues.unfreeze',
                    component: UnfreezeForm,
                },
                {
                    path: '/issues/unfreeze/confirm',
                    name: 'issues.unfreeze_confirm',
                    component: UnfreezeConfirm,
                },
                {
                    path: '/issues/change_features/confirm',
                    name: 'issues.change_features',
                    component: ChangeFeaturesConfirm,
                },
                {
                    path: '/issues/change_description/confirm',
                    name: 'issues.change_description',
                    component: ChangeDescriptionConfirm,
                },
                {
                    path: '/issues/transfer_ownership/confirm',
                    name: 'issues.transfer_ownership',
                    component: TransferOwnershipConfirm,
                },
            ],
        },
        {
            path: '/txs',
            name: 'txs',
            component: Txs,
        },
        {
            path: '/tx/:hash',
            component: TxInfo,
        },
        {
            path: '/send',
            name: 'send',
            component: Send,
            children: [
                {
                    path: 'form',
                    component: SendForm,
                    name: 'send.form',
                },
                {
                    path: 'confirm',
                    name: 'send.confirm',
                    component: SendConfirm,
                },
                {
                    path: 'finish/:hash',
                    name: 'send.finish',
                    component: SendFinish,
                },
            ],
        },
        {
            path: '/receive',
            name: 'receive',
            component: Receive,
        },
        {
            path: '/staking',
            component: Staking,
        },
        {
            path: '/staking',
            name: 'staking',
            component: PageWrapper,
            children: [
                {
                    path: 'delegate',
                    name: 'staking.delegate',
                    component: DelegateForm,
                },
                {
                    path: 'validator',
                    component: Validator,
                    children: [
                        {
                            path: 'list',
                            name: 'staking.validator_list',
                            component: ValidatorList,
                        },
                        {
                            path: 'edit/:validator',
                            name: 'staking.edit_validator',
                            component: EditValidatorForm,
                        },
                        {
                            path: 'create',
                            name: 'staking.create_validator',
                            component: CreateValidatorForm,
                        },
                        {
                            path: 'confirm',
                            name: 'staking.confirm_validator',
                            component: ValidatorConfirm,
                        },
                    ],
                },
                {
                    path: 'confirm',
                    name: 'staking.confirm',
                    component: DelegateConfirm,
                },
                {
                    path: 'detail/:validator',
                    component: DelegateDetail,
                },
                {
                    path: 'unbond',
                    name: 'staking.unbond',
                    component: UnbondForm,
                },
                {
                    path: 'redelegate',
                    name: 'staking.redelegate',
                    component: RedelegateForm,
                },
            ],
        },
        {
            path: '/gov',
            component: GovMain,
        },
        {
            path: '/gov',
            name: 'gov',
            component: Gov,
            children: [
                {
                    path: 'proposal/create',
                    name: 'gov.create',
                    component: ProposalCreate,
                },
                {
                    path: 'proposal/:id',
                    name: 'gov.detail',
                    component: ProposalDetail,
                },
            ],
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound,
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        if (!localStorage.getItem('wallet_username')) {
            // if (!localStorage.getItem('wallet_agree'))
            //     next({
            //         path: '/agree',
            //         params: {nextUrl: to.fullPath},
            //     }); else {
            next({
                path: '/passport',
                params: {nextUrl: to.fullPath},
            });
        }

        next();
    } else {
        next();
    }
});

export default router;
