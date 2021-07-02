import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import VueClipboard from 'vue-clipboard2';
import '@/styles/element-variables.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faArrowUp,
    faArrowDown,
    faEquals,
    faChevronDown,
    faCircle,
    faPercent,
    faSpinner,
    faVoteYea,
    faAngleDoubleUp,
    faAngleDoubleRight,
    faAngleDoubleDown,
    faCommentDollar,
    faPoll,
    faCoins,
    faHashtag,
    faEdit,
    faPlus,
    faMinus,
    faSeedling,
    faSnowflake,
    faBurn,
    faFireAlt,
    faFire,
    faHammer,
    faShieldAlt,
    faNetworkWired,
    faSun,
    faCog,
    faAlignJustify,
    faStar,
    faGavel,
    faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import {
    faTelegramPlane,
    faTwitter,
    faMedium,
    faRedditAlien,
    faLinkedin,
    faFacebook,
    faWeibo,
    faWeixin,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import GraphLine3D from 'vue-graph/src/components/line3d.js';
import GraphTreeMap from 'vue-graph/src/components/treemap';
import pie from 'vue-graph/src/components/pie';
import NoteWidget from 'vue-graph/src/widgets/note.js';
import LegendWidget from 'vue-graph/src/widgets/legends.js';
import tooltip from 'vue-graph/src/widgets/tooltip';
import App from './App.vue';
import router from './router';

import { en } from './constants';
import * as filters from './utils/filters.js';
import rootStore from './store/index.js';

import Link from './components/Link';
import Text from './components/Text';
import Form from './components/Form';
import BoxGrid from './components/BoxGrid';
import BoxList from './components/BoxList';
import Header from './components/Header';
import Footer from './components/Footer';
import Page from './components/Page';
import Card from './components/Card';
import DataItem from './components/DataItem';
import BtnPanel from './components/Panel/BtnPanel';
import IssuePanel from './components/Issues/Issue/IssuePanel';
import AddressCopy from './components/AddressCopy';
import TextCopy from './components/TextCopy';
import HashCopy from './components/HashCopy';

import AccountSelect from './components/AccountSelect';
import BalancePanel from './components/Panel/BalancePanel';
import TransactionList from './components/TransactionList';
import ProposalList from './components/ProposalList';
import Txs from './components/Txs';
import Assets from './components/Assets';
import Proposals from './components/Proposals';
import ValidatorPanel from './components/Panel/ValidatorPanel';
import Staking from './views/Staking';
import GovMain from './views/GovMain';
import Issues from './components/Issues';
import IssueDetail from './components/Issues/Issue/IssueDetail';
import ApproveDetail from './components/Issues/Approve/ApproveDetail';
import TransferDetail from './components/Issues/Transfer/TransferDetail';
import TransferFromDetail from './components/Issues/TransferFrom/TransferFromDetail';
import TransferOwnershipDetail from './components/Issues/TransferOwnership/TransferOwnershipDetail';
import MintDetail from './components/Issues/Mint/MintDetail';
import BurnDetail from './components/Issues/Burn/BurnDetail';
import FreezeDetail from './components/Issues/Freeze/FreezeDetail';
import UnfreezeDetail from './components/Issues/Unfreeze/UnfreezeDetail';
import ChangeFeaturesDetail from './components/Issues/ChangeFeatures/ChangeFeaturesDetail';
import ChangeDescriptionDetail from './components/Issues/ChangeDescription/ChangeDescriptionDetail';

import { init } from './utils/celestial';

Vue.config.productionTip = false;

Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'en',
    messages: {
        en,
    },
    // silentTranslationWarn: true,
});

Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(VueClipboard);
Vue.use(VueRouter);
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

const store = new Vuex.Store(rootStore);

// get blockchain basic info
store.dispatch('basic/fetchInfo');

library.add(
    faTelegramPlane,
    faTwitter,
    faMedium,
    faRedditAlien,
    faLinkedin,
    faFacebook,
    faWeibo,
    faWeixin,
    faArrowDown,
    faArrowUp,
    faEquals,
    faChevronDown,
    faCircle,
    faPercent,
    faSpinner,
    faVoteYea,
    faAngleDoubleUp,
    faAngleDoubleRight,
    faAngleDoubleDown,
    faCommentDollar,
    faPoll,
    faCoins,
    faHashtag,
    faEdit,
    faPlus,
    faMinus,
    faSeedling,
    faFireAlt,
    faBurn,
    faFire,
    faHammer,
    faSnowflake,
    faShieldAlt,
    faNetworkWired,
    faSun,
    faCog,
    faAlignJustify,
    faStar,
    faGavel,
    faQuestion,
);

Vue.component(GraphLine3D.name, GraphLine3D);
Vue.component(GraphTreeMap.name, GraphTreeMap);
Vue.component(pie.name, pie);
Vue.component(NoteWidget.name, NoteWidget);
Vue.component(LegendWidget.name, LegendWidget);
Vue.component(tooltip.name, tooltip);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('k-header', Header);
Vue.component('k-footer', Footer);
Vue.component('k-page', Page);
Vue.component('k-form', Form);
Vue.component('k-card', Card);
Vue.component('k-link', Link);
Vue.component('k-text', Text);
Vue.component('k-btn-card', BtnPanel);
Vue.component('k-address', AddressCopy);
Vue.component('k-text-copy', TextCopy);
Vue.component('k-hash-copy', HashCopy);
Vue.component('data-item', DataItem);
Vue.component('box-grid', BoxGrid);
Vue.component('box-list', BoxList);

Vue.component('txs', Txs);
Vue.component('assets', Assets);
Vue.component('issues', Issues);
Vue.component('proposals', Proposals);
Vue.component('delegate-page', Staking);
Vue.component('gov-page', GovMain);
Vue.component('issue-panel', IssuePanel);
Vue.component('issue-detail', IssueDetail);
Vue.component('mint-detail', MintDetail);
Vue.component('burn-detail', BurnDetail);
Vue.component('approve-detail', ApproveDetail);
Vue.component('transfer-detail', TransferDetail);
Vue.component('freeze-detail', FreezeDetail);
Vue.component('unfreeze-detail', UnfreezeDetail);
Vue.component('transfer-from-detail', TransferFromDetail);
Vue.component('transfer-ownership-detail', TransferOwnershipDetail);
Vue.component('change-description-detail', ChangeDescriptionDetail);
Vue.component('change-features-detail', ChangeFeaturesDetail);
Vue.component('balance-panel', BalancePanel);
Vue.component('validator-panel', ValidatorPanel);
Vue.component('account-select', AccountSelect);
Vue.component('transaction-list', TransactionList);
Vue.component('proposal-list', ProposalList);

(async () => {
    await init();
    return new Vue({
        i18n,
        router,
        store,
        render: h => h(App),
    }).$mount('#app');
})();
