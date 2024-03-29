const en = {
    global: {
        app: 'Konstellation wallet',
        next: 'Next',
        back: 'Back',
        search: 'Search',
        confirm: 'Confirm',
        finish: 'Finish',
        ok: 'Ok',
        cancel: 'Cancel',
        error: 'Error',
        required: '{name} is required',
        success: '{name} Success!',
        noData: 'No data available for the time being',
        no: 'No',
        nothing: '-',
        yes: 'Yes',
        errorType: 'Wrong {name}',
    },
    common: {
        all: 'All',
        id: 'ID',
        title: 'Title',
        status: 'Status',
        content: 'Content',
        type: 'Type',
        description: 'Description',
    },
    home: {
        title: 'Welcome to Konstebox',
        itemTitle1: 'Anywhere, anytime',
        itemText1: 'Konstebox is mobile friendly, so you can access it everywhere you go. The web-version works on desktop and mobile browsers.',
        itemTitle2: 'The power of privacy',
        itemText2: 'All user data, including imported or generated private keys are stored locally and private.',
        itemTitle3: 'Easy to use, Reliable',
        itemText3: 'Made by Konstellation official team. We’ve done the complicated stuff so you won’t have to.',
        account: 'Wallet Account',
        staking: 'Staking Delegation',
        issue: 'Token Issuances',
        voting: 'Voting',
        deposit: 'DepositBox',
        future: 'FutureBox',
    },
    agree: {
        title: 'Terms & Conditions',
        term1: 'I understand that my funds are stored securely on my personal computer. No private data is sent to Konstellation servers. All encryption is done locally in browser.',
        term2: 'I consent that Konstellation does not have access to my private information and could not participate in resolution of issues concerning money loss of any kind.',
        term3: 'I have read and accepted the ',
        use: 'Terms of Use',
        and: 'and',
        privacy: 'Privacy Policy',
        termUrl: 'http://hashgard-io.oss-cn-hongkong.aliyuncs.com/terms/HashgardTermsofService.pdf',
        privacyUrl: 'http://hashgard-io.oss-cn-hongkong.aliyuncs.com/terms/GardBoxPrivacyPolicy.pdf',
        confirm: 'Confirm and Continue',
    },
    passport: {
        title: 'Passport',
        desc: 'Create a new key pair or import an existing wallet to get started',
        banner: 'Konstellation is a free, open source web wallet. Users can use gard wallet to create or import wallet, and use gard token to complete a series of operations on Konstellation Blockchain.',
        create: 'Create New Wallet',
        createBreif: "Create a new wallet in this browser if you don't have one.",
        login: 'Login to Account',
        loginBreif: 'Use wallet with your password if you already have one in this browser.',
        logout: 'Log Out',
        backup: 'Export KeyStore',
        privateKey: 'Export PrivateKey',
        backupCopy: 'Copy KeyStore to clipboard',
        backupFile: 'download KeyStore file',
        edit: 'Edit Name',
        delete: 'Delete Wallet',
        deleteWarn: 'All user data, including imported or generated private keys, will be deleted. The only way to restore a deleted wallet is to use your backup phrase.',
        recover: 'Import Wallet',
        recoverBreif: 'Recover your wallet in this browser if you already have one from other place.',
        math: 'Math Wallet',
        useMath: 'Use Math Wallet',
        switchWallet: 'Switch Wallet',
        switch: 'Login as',
    },
    create: {
        warn1: 'Your password allows you to access and transfer your funds. Keep it safe!!!',
        warn2: 'Konstellation does not store your password and cannot retrieve it for you!',
        name: 'Wallet Name',
        pass: 'Password',
        passCheck: 'Confirm Password',
        passWarn: 'Password must contain numbers and letters and at least 8 characters!',
        passCheckWarn: 'Inconsistent password!',
        exist: 'Account Name Exist!',
        mnemonic: 'Your Mnemonic',
        mnemonicWarn: 'Wrong Mnemonic!',
        safety: 'Backup Your Mnemonic',
        mnemonicBreif: 'This is your secret recovery text. It is the only way to restore access to your funds. Keep it safe and never share it with anyone you don’t trust!',
        reset: 'Reset',
        confirm: 'Confirm your Mnemonic',
        backup: 'Create wallet success! you can backup your keyStore anytime in the settings menu.',
        success: 'Wallet Created Successfully!',
    },
    recover: {
        key: 'KeyStore Text',
        keyFile: 'KeyStore File',
        drag: 'Drag KeyStore file here, or ',
        click: 'click to upload',
        phrase: 'Mnemonic',
        keyError: 'Wrong KeyStore!',
    },
    main: {
        all: 'All',
        receive: 'Receive',
        send: 'Send',
        deposit: 'Deposit',
        qrcode: 'QRCode',
        manage: 'Manage',
        copy: 'Copied to ClipBoard',
        assets: 'My Assets',
        balance: 'Balance',
        txs: 'My transactions',
        governance: 'My proposals',
        txInfo: 'Transaction Detail',
        allTxs: 'Explore All Txs',
        empty: 'No Data',
        keyWarn: 'KeyStore is an encrypted JSON file with your privateKey and password, you can get your privateKey with your password from it.',
        receiveVoucher: 'Receive Voucher',
        takeBack: 'Please take it back',
        transaction: 'Send',
        draw: 'Draw',
        AdequateBalance: 'Adequate Balance',
        seconds: '30 seconds later',
        box: 'Box',
        logout: 'Logout',
    },
    send: {
        form: 'Send',
        confirm: 'Confirm Transaction',
        passError: 'Wrong Password!',
        reject: 'Signature Rejected',
        netError: 'Network Error',
        finish: 'Transaction Result',
        denom: 'Currency',
        amount: 'Amount',
        amountWarn: 'Insufficient Quantity',
        amountWarnPositive: 'A Positive Number is required',
        amountWarnInvalid: 'Invalid Amount',
        address: 'Address',
        addressWarn: 'Invalid Address!',
        addressSelf: 'Sender\'s address!',
        sender: 'Sender',
        memo: 'Memo',
        txHash: 'TxHash',
        tx: 'Tx',
        all: 'Send All',
        balance: 'Balance',
        fee: 'Fee',
        gas: 'Gas',
        error: 'Transaction Error!',
        again: 'Continue Transfer',
        from: 'From',
        to: 'To',
        back: 'Back to Wallet',
        block: 'Block',
        time: 'Time',
        txNotExist: 'Transaction does not exist',
        txInvalid: 'Transaction invalid',
        tokenNotExist: 'Token does not exist',
        waitTxConfirmation: 'Wait for tx confirmation',
    },
    staking: {
        // general
        title: 'Staking',
        // validations
        validatorDup: 'Target Validator Invalid',
        // description
        description: 'Description',
        website: 'Website',
        details: 'Details',
        identity: 'Identity',
        moniker: 'Moniker',
        name: 'Validator Name',
        detail: 'Delegation Detail',
        // commission
        commission: 'Commission',
        commission_rate: 'Commission rate',
        commission_max: 'Commission Max Rate',
        commission_change: 'Commission Max Rate Change',
        commissionMin: 'Lowest Commission',
        // staking
        operator: 'Validator address',
        consensus_pubkey: 'Consensus pubkey',
        address: 'Address',
        candidate: 'Candidate',
        validators: 'All Validators',
        fromValidator: 'From Validator Node',
        toValidator: 'To Validator Node',
        validator: 'Validator Node',
        // delegations
        delegationTotal: 'Delegations',
        delegations: 'My Delegations',
        shares: 'Shares',
        tokens: 'Tokens',
        total_shares: 'Total shares',
        minSelf: 'Min Self Delegation',
        tokensMax: 'Max Tokens',
        validatorNotExist: 'Validator does not exits',
        // unbonding
        unbondings: 'Unbondings',
        unbonding_height: 'Unbonding height',
        completion_time: 'Completion time',
        unbonding_amount: 'Unbonding amount',
        // status
        status: 'Status',
        active: 'Active',
        jailed: 'Jailed',
        bonded: 'Bonded',
        unbonded: 'Unbonded',
        unbonding: 'Unbonding',
        delegated: 'Delegated',
        // actions
        confirm: 'Confirm delegation',
        all: 'Delegate All',
        unbond: 'Unbond',
        unbondAll: 'Unbond All',
        redelegate: 'Redelegate',
        redelegateAll: 'Redelegate All',
        delegate: 'Delegate',
        unjail: 'Unjail',
        edit_validator: 'Edit validator',
        create_validator: 'Create validator',
    },
    slashing: {
        unjail: 'Unjail',
    },
    distribution: {
        // general
        validator: 'Validator address',
        delegator: 'Delegator address',
        // rewards
        reward: 'Reward',
        rewards: 'Rewards',
        outstanding_rewards: 'Outstanding Rewards',
        validator_rewards: 'Validator Rewards',
        validator_distribution: 'Validator Distribution',
        self_bond_rewards: 'Self bond rewards',
        val_commission: 'Commission',
        distribution_description: 'Validator distribution information',
        outstanding_rewards_description: 'Fee distribution outstanding rewards',
        rewards_description: 'Commission and self-delegation rewards',
        unpaidReward: 'Unpaid Reward',
        // actions
        withdraw: 'Withdraw',
        withdraw_validator_rewards: 'Withdraw validator rewards',
        withdraw_validator_commission: 'Withdraw validator commission',
        withdraw_delegator_reward: 'Withdraw delegator rewards',
    },
    assets: {
        my: 'My assets',
        title: 'Assets',
        asset: 'Asset',
        back: 'Bask to assets',
        owner: 'Owner',
        balance: 'Balance',
    },
    issues: {
        available: 'Available',
        title: 'Issues',
        features: 'Features',
        allowances: 'Allowances',
        freezing: 'Freezing',
        my: 'My issues',
        back: 'Bask to issues',
        // issue
        issue: 'Issue',
        owner: 'Owner',
        holder: 'Holder',
        denom: 'Denom',
        token: 'Token',
        amount: 'Amount',
        spender: 'Spender',
        burner: 'Burner',
        to_address: 'To address',
        from_address: 'From address',
        allowance: 'Allowance',
        symbol: 'Symbol',
        total_supply: 'Total supply',
        decimals: 'Decimals',
        description: 'Description',
        out: 'Out',
        in: 'In',
        direction: 'Direction',
        burn_owner_disabled: 'Burn owner disabled',
        burn_owner_enabled: 'Burn owner enabled',
        burn_holder_disabled: 'Burn holder disabled',
        burn_holder_enabled: 'Burn holder enabled',
        burn_from_disabled: 'Burn from disabled',
        burn_from_enabled: 'Burn from enabled',
        mint_disabled: 'Mint disabled',
        mint_enabled: 'Mint enabled',
        freeze_disabled: 'Freeze disabled',
        freeze_enabled: 'Freeze enabled',
        // validations,
        emptyDenom: 'Denom is required',
        emptySymbol: 'Symbol is required',
        totalSupplyRequired: 'Total supply is required',
        decimalsRequired: 'Decimals is required',
        decimalsMax: 'Decimals must be lower then 18',
        amountLowerZero: 'Amount must be greater or equal zero',
        emptySpender: 'Spender is required',
        setMyAddress: 'Set my address',
        directionWarn: 'Choose direction',
        // actions
        issue_confirm: 'Confirm issue',
        approve: 'Approve',
        approve_confirm: 'Confirm approval',
        burn: 'Burn',
        burn_owner: 'Burn owner',
        burn_holder: 'Burn holder',
        burn_from: 'Burn from',
        burn_confirm: 'Confirm burn',
        burn_from_confirm: 'Confirm burn from',
        mint: 'Mint',
        mint_confirm: 'Confirm mint',
        freeze: 'Freeze',
        freeze_confirm: 'Confirm freeze',
        unfreeze: 'Unfreeze',
        unfreeze_confirm: 'Confirm unfreeze',
        transfer: 'Transfer',
        transfer_confirm: 'Confirm transfer',
        transfer_from: 'Transfer from',
        transfer_from_confirm: 'Confirm transfer from',
        change_features: 'Change features',
        change_description: 'Change description',
        transfer_ownership: 'Transfer ownership',
        transfer_ownership_confirm: 'Confirm transfer ownership',
    },
    receiveVoucher: {
        extract: 'Extract',
    },
    lockInput: {
        name: 'Name',
        title: 'Lock FilterList',
        boxName: 'Box Name',
        currency: 'Currency',
        lockTime: 'Unlocking Time',
        creatTime: 'Creat Time',
        allOut: 'All Locks',
        currentBalance: 'Current Balance',
        lock: 'Lock',
        lockInfo: 'Lock Info',
        lockCurrency: 'Lock Currency',
        lockAddress: 'Lock Address',
        lockNumber: 'Lock Number',
        status: 'Status',
        all: 'All',
        locked: 'Locked',
        unlocked: 'Unlocked',
    },
    deposit: {
        deposit: 'Deposit',
        allDeposits: 'All',
        myIssue: 'My Boxes',
        myInvolved: 'My Deposits',
        creatDeposit: 'Creat Deposit Box',
        creatDepositBox: 'Creat Deposit Box',
        AdsorptionPeriod: 'Adsorption Period',
        DepositPeriod: 'Deposit Lock Period',
        over: 'Closed',
        completed: 'Completed',
        searchPlaceholder: 'Originator address',
        name: 'Name',
        type: 'Type',
        status: 'Status',
        Deadline: 'Deadline',
        startTime: 'Start Time',
        AnnualInterestRate: 'Annual Interest Rate (%)',
        target: 'Target',
        depositNumber: 'Total Amount',
        depositCurrency: 'Currency',
        depositCap: 'Total Amount',
        depositLimit: 'Minimum Deposit Amount',
        MinimumFraction: 'Minimum Fraction',
        InterestCurrency: 'Interest Currency',
        TotalInterest: 'Total Interest',
        IntakeDepositStartTime: 'Interest Injection End Time',
        IntakeDepositEndTime: 'Adsorption End Time',
        DepositAndInterestDeliveryTime: 'Deposit End And Interest Delivery Time',
        DepositItemDescription: 'Deposit Item Description',
        Allow: 'Allow trading of deposit certificates',
        creat: 'Creat',
        default: 'If not, default is 1',
        TotalPayment: 'Total Payment',
        depositBoxDetail: 'Deposit Box Detail',
        Deposited: 'Deposited',
        Injected: 'Injected',
        noReached: 'No Reached',
        Achieved: 'Achieved',
        see: 'See',
        Retrieve: 'Withdraw',
        CreateAddress: 'Creat Address',
        inject: 'Inject',
        injectToken: 'Inject Token',
        retrieveToken: 'Withdraw Token',
        NeedInjected: 'Need to be injected',
        MaximumReturn: 'Maximum Return',
        cancelDeposit: 'Cancel Deposit',
        depositQuantity: 'Deposit Quantity',
        expectedInterest: 'Expected Interest',
        depositDetail: 'Deposit Detail',
        time: 'Time',
        order: 'Order',
        totalInjection: 'Total Injection',
        timeError: 'Time Error',
        enterQuantity: 'Please enter quantity',
        notLessTime: 'Not less than the current time',
        PositiveNumber: 'Must be a number greater than 0',
        depositTime: 'Deposit Time',
        multiple: 'Must be a multiple of {price}',
    },
    gov: {
        title: 'Chain Governance',
        detail: 'Proposal detail',
        my: 'My Proposals',
        all: 'All Proposals',
        // deposit
        deposit: 'Deposit',
        activation: 'Activation proposal',
        time_remains: 'Time remains',
        // voting
        vote: 'Vote',
        voting: 'Voting',
        option: 'Option',
        voting_result: 'Voting result',
        number_votes: 'Number of votes',
        proportion: 'Proportion',
        tally: 'Tally',
        // actions
        create: 'Create Proposal',
        submit: 'Submit proposal',
        select_param_change: 'Select parameters to change',
        // status
        proposal: {
            need_deposit: 'Deposit needed',
            distanceTime: 'Distance from the end of the vote',
            option: 'Option',
            fields: {
                changes: 'Changes',
                total_deposit: 'Total deposit',
            },
            changes: {
                subspace: 'Subspace',
                key: 'Key',
                subkey: 'Subkey',
                value: 'Value',
            },
            dates: {
                submit_time: 'Submit time',
                deposit_end_time: 'Deposit end time',
                voting_start_time: 'Voting start time',
                voting_end_time: 'Voting end time',
            },
            status: {
                passed: 'Passed',
                rejected: 'Rejected',
                voting: 'Voting',
                deposit_period: 'DepositPeriod',
            },
            options: {
                yes: 'Yes',
                no: 'No',
                abstain: 'Abstain',
                no_with_veto: 'NoWithVeto',
            },
        },
        validations: {
            positive_number: 'Must be a number greater than 0',
            should_be_lower: 'Should be lower',
        },

        // old

        myVote: 'My Vote',
        activationCost: 'Proposal activation costs',
        info: 'Proposal info',
        adjusted: 'Adjusted to',
    },
    owner: {
        brif: 'Transfer ownership to other address is DANGEROUS！You will see no more this Token in your Token Issuance FilterList once transfered!',
        from: 'Token Owner',
    },
    footer: {
        copyright: '© 2019 Konstellation.tech',
        copyright_copy: '© 2019 Konstellation.tech All Rights Reserved.',
    },
};
export default en;
