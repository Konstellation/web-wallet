import sdk from '@konstellation/cosmosjs';

const chain = sdk({
    apiUrl: 'http://node1.konstellation.tech:1317',
    nodeUrl: 'http://node1.konstellation.tech:26657',
    chainId: 'knstlhub-1',
});

export default chain;
