import moment from 'dayjs';
import _ from 'lodash';
import Big from 'big.js';
import numeral from 'numeral';
import {explorerDomain, DEFAULT_DENOM, DEFAULT_FEE, DEFAULT_GAS} from '../constants';

export const upper = s => s.toUpperCase();

export const addr = s => s && `${s.slice(0, 8)}......${s.slice(s.length - 8)}`;

export const toToken = amount => (_.isObject(amount) ? amount : {
    amount,
    denom: DEFAULT_DENOM,
});

export const formatNumber = v => {
    if (!v) {
        return 0;
    }

    let format = '0,0.[000]';

    if (v < 1) {
        format = '0.[000]';
    }

    if (v > 1e3) {
        format = '0,0';
    }

    return numeral(v.toString()).format(format);
};

export const formatAmount = coins => {
    let token;

    if (coins && _.isArray(coins)) {
        [token] = coins;
    } else if (coins && _.isObject(coins)) {
        token = coins;
    }

    !token || !token.amount ? token = {
        denom: DEFAULT_DENOM,
        amount: 0,
    } : '';

    return `${formatNumber(token.amount)} ${token.denom.toUpperCase()}`;
};

export const formatFee = fee => {
    if (_.isEmpty(fee)) {
        return `${DEFAULT_FEE} ${DEFAULT_DENOM.toUpperCase()}`;
    }

    const [{amount, denom}] = !_.isArray(fee) ? [fee] : fee;

    return `${amount} ${denom.toUpperCase()}`;
};

export const formatGas = gas => {
    if (_.isEmpty(gas)) {
        return `0 | ${DEFAULT_GAS}`;
    }

    const {used, wanted} = gas;

    return `${used} | ${wanted}`;
};

export const formatDenom = denom => denom.toUpperCase();

export const formatDARC = (darc) => {
    const n = Big(darc).div(Math.pow(10, 6));
    return numeral(n.toString()).format('0,0.[0000]');
};

export const explorerUrl = s => `${explorerDomain}${s}`;

export const formatTime = time => time && time.match(/\d{10}/) ? moment.unix(time).format('YYYY-MM-DD HH:mm:ss') : moment(time).format('YYYY-MM-DD HH:mm:ss');

export const formatPercents = p => (p ? numeral(p.toString()).format('(0.[00]%)') : 0);

export const formatWithdraw = w => [{
    amount: w.match(/\d+/)[0],
    denom: w.match(/\D+/)[0],
}];
