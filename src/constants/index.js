import {
    DEFAULT_KEY_PATH,
    DEFAULT_FEE,
    DEFAULT_GAS,
    DEFAULT_BECH32_PREFIX,
} from '@konstellation/cosmosjs/src/constants';
import {en} from './lang';
import {txFieldsMap} from './txFieldsMap';
import {paramScheme} from './paramScheme';
import actions from './actions';
import status from './status';
import options from './options';

const apiDomain = 'http://127.0.0.1:1317/';
const baseURL = `${apiDomain}`;
const explorerDomain = 'http://127.0.0.1:8080/';
const DEFAULT_DENOM = 'udarc';

export {
    en,
    explorerDomain,
    baseURL,
    actions,
    status,
    options,
    txFieldsMap,
    paramScheme,
    DEFAULT_DENOM,
    DEFAULT_BECH32_PREFIX,
    DEFAULT_KEY_PATH,
    DEFAULT_GAS,
    DEFAULT_FEE,
};
