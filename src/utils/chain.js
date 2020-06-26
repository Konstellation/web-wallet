import sdk from 'cosmosjs';

const chain = sdk.network({
    // apiUrl: 'http://localhost:1317',
    apiUrl: 'http://95.216.215.127:1317',
    // nodeUrl: 'http://localhost:26657',
    nodeUrl: 'http://95.216.215.127:26657',
    chainId: 'darchub',
});

export default chain;
