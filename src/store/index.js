import account from './modules/account';
import recover from './modules/recover';
import transactions from './modules/transactions';
import staking from './modules/staking';
import slashing from './modules/slashing';
import distribution from './modules/distribution';
import gov from './modules/gov';
import mint from './modules/mint';
import issue from './modules/issue';
import basic from './modules/basic';

export default {
    modules: {
        account,
        recover,
        transactions,
        staking,
        slashing,
        distribution,
        gov,
        mint,
        issue,
        basic,
    },
};
