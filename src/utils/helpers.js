import {isEmpty} from 'lodash';

export const getViewToken = (coin) => {
    const token = {
        ...coin,
    };
    if (isEmpty(token)) {
        return {};
    }
    token.denom = token.denom.toUpperCase();

    return token;
};
