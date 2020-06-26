export const paramScheme = {
    'mint/InflationRateChange': {
        title: 'mint/InflationRateChange',
        name: 'inflation_rate_change',
        type: 'number',
        json: {
            int: '$value',
        },
    },
    'mint/InflationMin': {
        title: 'mint/InflationMin',
        name: 'inflation_min',
        type: 'number',
        json: {
            int: '$value',
        },
    },
    'mint/InflationMax': {
        title: 'mint/InflationMax',
        name: 'inflation_max',
        type: 'number',
        json: {
            int: '$value',
        },
    },
    'issue/IssueFee': {
        title: 'issue/IssueFee',
        name: 'issue_fee',
        type: 'amount',
        json: '$value',
    },
    'issue/MintFee': {
        title: 'issue/MintFee',
        name: 'mint_fee',
        type: 'amount',
        json: {
            int: '$value',
        },
    },
    // {
    //     name: 'gov/min_deposit',
    //     type: 'string',
    // },
    // {
    //     name: 'staking/max_validators',
    //     type: 'number',
    // },
    // {
    //     name: 'staking/unbonding_time',
    //     type: 'time.Duration',
    // },
};
