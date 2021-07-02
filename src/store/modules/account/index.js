import { get, isEmpty } from 'lodash';

import { Message } from 'element-ui';
import chain from '../../../utils/chain';
import { DEFAULT_DENOM } from '../../../constants';
import { Celestial, init } from '../../../utils/celestial';

const wallet_users = localStorage.getItem('wallet_users') || '{}';
const wallet_username = localStorage.getItem('wallet_username') || '';
const UserMap = JSON.parse(wallet_users) || {};
const KeyStore = UserMap[wallet_username] || {};

export default {
    namespaced: true,
    state: {
        loading: false,
        userName: wallet_username,
        keyStore: KeyStore,
        userMap: { ...UserMap },
        balance: [],
    },
    getters: {
        currentAddress(state) {
            return get(state.keyStore, 'address');
        },
        accountBalance(state) {
            const balance = state.balance.find(i => i.denom === DEFAULT_DENOM) || {
                amount: '0',
                denom: DEFAULT_DENOM,
            };
            const res = { ...balance };

            res.label = DEFAULT_DENOM.toUpperCase();

            return res;
        },
    },
    mutations: {
        setLoading(state, loading) {
            state.loading = loading;
        },
        setUserName(state, userName) {
            state.userName = userName;
        },
        setKeyStore(state, kStore) {
            state.keyStore = kStore;
        },
        setUserMap(state, uMap) {
            state.userMap = Object.assign({}, state.userMap, uMap);
        },
        resetUserMap(state, uMap) {
            state.userMap = uMap;
        },
        setBalance(state, balance) {
            state.balance = balance;
        },
        setTokenMap(state, data) {
            state.tokenMap = Object.assign({}, state.tokenMap, data);
        },
    },
    actions: {
        async create(context, { name, pass }) {
            // reject if name exist
            if (context.state.userMap[name]) {
                return Promise.resolve(false);
            }

            // create account
            const account = chain.generateAccount();
            context.commit('setUserName', name);

            // generate keyStore with password
            context.dispatch('generateKeyStore', { pass, account });

            return Promise.resolve(true);
        },
        generateKeyStore(context, { pass, account }) {
            const ks = chain.exportAccountToV3KeyStore(account, pass);

            context.commit('setKeyStore', ks);

            return Promise.resolve();
        },
        async finishCreate(context) {
            const name = context.state.userName;

            context.commit('setUserMap', { [name]: context.state.keyStore });

            // save keyStore to localStorage
            localStorage.setItem('wallet_username', name);
            localStorage.setItem('wallet_users', JSON.stringify(context.state.userMap));

            return Promise.resolve(true);
        },
        async importPhrase(context, { name, pass, phrase }) {
            // reject if name exist
            if (context.state.userMap[name]) {
                Message({
                    type: 'error',
                    message: 'Account exists!',
                    center: true,
                });
                return Promise.resolve();
            }

            try {
                const account = chain.recoverAccount(phrase);
                context.commit('setUserName', name);

                context.dispatch('generateKeyStore', { pass, account });
                await context.dispatch('finishCreate');

                return Promise.resolve(account);
            } catch (e) {
                Message({
                    type: 'error',
                    message: 'Wrong mnemonic!',
                    center: true,
                });
                return Promise.resolve();
            }
        },
        async importKeyStore(context, { name, pass, keyStore }) {
            console.log(keyStore);
            const key = JSON.parse(keyStore);
            let err = '';
            let account;
            try {
                account = await Celestial.account.importKeystore(key, pass);
                console.log(account);
                if (isEmpty(account)) {
                    err = 'keyStore or password is invalid!';
                }
            } catch (e) {
                console.log(e);
                err = 'keyStore or password is invalid!';
            }
            if (err) {
                Message({
                    type: 'error',
                    message: err,
                    center: true,
                });
                return Promise.resolve();
            }

            context.commit('setUserName', name);
            context.commit('setKeyStore', key);

            await context.dispatch('finishCreate');

            return Promise.resolve(account);
        },
        async login(context, { name, pass }) {
            const { userMap } = context.state;
            const ks = userMap[name];

            chain.importAccountFromV3KeyStore(ks, pass);

            context.commit('setUserName', name);
            context.commit('setKeyStore', ks || {});

            localStorage.setItem('wallet_username', name);

            return Promise.resolve(name);
        },
        async editName(context, { user, name }) {
            const { userMap, userName } = context.state;
            const userMapNew = { ...userMap };

            userMapNew[name] = userMapNew[user];
            delete userMapNew[user];

            context.commit('resetUserMap', userMapNew);

            // save change to localStorage
            localStorage.setItem('wallet_users', JSON.stringify(context.state.userMap));

            // change currentUser
            if (userName === user) {
                await context.dispatch('login', name);
            }

            return Promise.resolve(name);
        },
        async backup(context, { user, pass }) {
            const { userMap } = context.state;
            const keyStore = userMap[user];
            const account = chain.importAccountFromV3KeyStore(keyStore, pass);

            return Promise.resolve(account);
        },
        async delete(context, { user, pass }) {
            const { userMap, userName } = context.state;
            const keyStore = userMap[user];
            const account = chain.importAccountFromV3KeyStore(keyStore, pass);
            const userMapNew = { userMap };
            delete userMapNew[user];

            context.commit('resetUserMap', userMapNew);

            // save change to localStorage
            localStorage.setItem('wallet_users', JSON.stringify(context.state.userMap));

            // change currentUser if delete currentUser
            if (userName === user) {
                await context.dispatch('login', Object.keys(userMapNew)[0]);
            }

            return Promise.resolve(account);
        },
        async fetchBalance(context) {
            const response = await Celestial.bank.queries.AllBalances({
                address: 'darc1ejgxhtvj6c9n7d7g29jmsxhnn6wh2j8rll0vfc',
            });
            const result = response.balances;

            context.commit('setLoading', true);

            if (!isEmpty(result)) {
                result.sort(i => (i.denom === DEFAULT_DENOM ? -1 : 1));
                context.commit('setBalance', result);
            } else {
                context.commit('setBalance', []);
            }

            context.commit('setLoading', false);

            return Promise.resolve(result);
        },
    },
};
