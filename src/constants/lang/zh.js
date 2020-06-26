const zh = {
  global: {
    app: 'GardBox',
    next: '下一步',
    back: '返 回',
    search: '搜 索',
    confirm: '确 认',
    finish: '完 成',
    ok: '确 认',
    cancel: '取 消',
    error: '错误',
    required: '请输入{name}',
    success: '{name}成功!',
    noData: '暂无数据',
    no: '否',
    nothing: '-',
    yes: '是',
    errorType: '{name}格式错误',
  },
  home: {
    title: '欢迎使用 GARDBOX',
    banner: 'GARDBOX 是新一代数字金融公有链 Hashgard 的网页钱包',
    itemTitle1: '随时 随地',
    itemText1: 'GARDBOX钱包是移动端友好的，因此您可以随处访问您的钱包。网页版适用于桌面和移动浏览器。',
    itemTitle2: '安全 高效',
    itemText2: '所有的数据(包括导入生成助记词)都存储在本地，采用行业最高级24助记词进行账户加密。',
    itemTitle3: '可靠 权威',
    itemText3: '由Hashgard官方团队打造，为您提供专业的可靠的资产管理工具。',
    account: '钱包账户',
    staking: '委托抵押',
    issue: 'Token发行',
    deposit: '存款盒子',
    future: '远期支付盒子',
  },
  agree: {
    title: '服务条款',
    term1: '我知道我的钱包信息存放在我的个人电脑上，不会发送至 Hashgard 服务器，所有的加密都在浏览器本地完成。',
    term2: '我知道 Hashgard 无法访问我的私人信息，也无法参与解决任何的资金损失问题。',
    term3: '我已经阅读并同意 ',
    use: '使用条款',
    and: '和',
    privacy: '隐私条款',
    confirm: '同意并继续',
    termUrl: 'http://hashgard-io.oss-cn-hongkong.aliyuncs.com/terms/HashgardTermsofService_CN.pdf',
    privacyUrl: 'http://hashgard-io.oss-cn-hongkong.aliyuncs.com/terms/GardBoxPrivacyPolicy_CN.pdf',
  },
  passport: {
    title: '创建一个新钱包或导入钱包',
    banner: 'gard钱包是一个免费的、开源的网页钱包，用户可以使用gard钱包创建或导入钱包，使用gard代币完成例如转账等一系列操作.',
    create: '创建新钱包',
    createBreif: '在本地创建一个新的 GARD 钱包。',
    login: '钱包切换',
    loginBreif: '直接输入密码使用本地已经存在的 GARD 钱包。',
    logout: '注 销',
    backup: '导出 KeyStore',
    privateKey: '导出私钥',
    backupCopy: '复制 KeyStore 到剪贴板',
    backupFile: '下载 KeyStore 文件',
    edit: '编辑名称',
    delete: '删除钱包',
    deleteWarn: '钱包的所有信息都会被删除，只能用该钱包的助记词或 KeyStore 恢复钱包，请确保您已做好备份。',
    recover: '导入钱包',
    recoverBreif: '使用私钥或助记词恢复来恢复 GARD 钱包。',
  },
  create: {
    warn1: '请认真保存当前账户密码，该密码用于操作您钱包的资产，如转账等。',
    warn2: 'GARDBOX 钱包不存储密码，也无法帮您找回，请务必牢记!!',
    name: '钱包名称',
    pass: '密码',
    passCheck: '确认密码',
    passWarn: '密码至少8位，且包含数字和字母!',
    passCheckWarn: '密码不一致!',
    exist: '钱包名称已存在!',
    mnemonic: '您的助记词',
    mnemonicWarn: '助记词错误',
    safety: '请妥善保管',
    mnemonicBreif: '钱包不会存储您的助记词，请立即备份！如果丢失助记词，将无法找回钱包内的资产',
    reset: '重 置',
    confirm: '确认您的助记词',
    backup: '您的钱包已经成功创建！您可以在设置菜单中随时【备份 KeyStore】.',
    success: '钱包创建成功!',
  },
  recover: {
    key: 'KeyStore 文本',
    keyFile: 'KeyStore 文件',
    drag: '将文件拖到此处，或',
    click: '点击上传',
    phrase: '助记词',
    keyError: 'KeyStore 格式错误!',
  },
  main: {
    receive: '收 款',
    deposit: '存 款',
    qrcode: '二维码',
    send: '转 账',
    manage: '管 理',
    copy: '已复制到剪切板',
    assets: '我的资产',
    txs: '交易记录',
    txInfo: '交易详情',
    allTxs: '查看全部',
    empty: '暂无交易记录',
    keyWarn: 'KeyStore 是用你的私钥和密码加密后的 JSON 文件, 您可以用密码从 KeyStore 中取回私钥，请妥善保管。',
    receiveVoucher: '收款凭证',
    depositVoucher: '存款凭证',
    takeBack: '请取回',
    transaction: '交易',
    draw: '领 币',
    AdequateBalance: '余额充足',
    seconds: '30秒后再领取',
    box: '盒子',
  },
  send: {
    form: '转 账',
    confirm: '确认交易信息',
    passError: '密码错误',
    reject: '交易签名被拒绝',
    netError: '网络错误',
    finish: '转账结果',
    denom: '转账币种',
    amount: '数量',
    amountWarn: '数量不足',
    amountWarnPositive: '数量必须大于零',
    amountWarnInvalid: '小数位数不支持',
    address: '收款地址',
    addressWarn: '地址不可用',
    sender: '转出地址',
    memo: '备注',
    txHash: 'TxHash',
    all: '全部转出',
    balance: '账户余额',
    fee: '手续费',
    error: '交易发送失败',
    again: '继续转账',
    back: '回到钱包',
    block: '区块高度',
    time: '交易时间',
  },
  staking: {
    delegationTotal: '所有委托',
    reward: '委托收益',
    withdraw: '取回收益',
    delegate: '委托 GARD',
    delegations: '我的委托',
    validators: '全部验证人节点',
    tokensMax: '抵押数量优先',
    commissionMin: '佣金最低',
    fromValidator: '转出验证人节点',
    toValidator: '转入验证人节点',
    validator: '验证人节点',
    name: '节点名称',
    status: '状态',
    active: '活跃',
    candidate: '候选',
    jailed: '异常',
    minSelf: '最小自委托',
    address: '地址',
    detail: '委托详情',
    tokens: '抵押总量',
    commission: '佣金',
    max: '最高佣金',
    commissionChange: '修改佣金最大幅度',
    website: '网站',
    description: '描述',
    all: '委托全部',
    unbond: '赎回委托',
    unbondAll: '赎回全部',
    redelegate: '转移委托',
    redelegateAll: '转移全部',
    validatorDup: '验证人节点相同',
    unbonding: '解锁中',
    delegated: '已委托',
    unpaidReward: '未领取收益',
  },
  issue: {
    tokens: '我发行的Token',
    create: '发行新Token',
    fee: '服务费',
    feeInsuf: '账户余额不足',
    symbol: 'Token符号',
    name: '名称',
    id: 'ID',
    time: '发行时间',
    supply: '发行总量',
    basic: '基础信息',
    basicBrif: '必填项，Token创建后不可修改',
    decimals: '小数位数',
    nameEg: '如：Hashgard',
    symbolEg: '如：GARD',
    supplyEg: '如：21000000',
    nameInvalid: '名称长度必须是 3 到 32',
    symbolInvalid: '符号长度必须是 2 到 8',
    supplyInvalid: '发行总量超出上限',
    describe: '描述信息',
    describeBrif: '非必填，可以后期修改',
    org: '组织机构名称',
    website: '网站地址',
    logo: 'Token 图标',
    intro: 'Token 描述',
    orgEg: 'E.g. Hashgard 基金会',
    websiteEg: 'E.g. www.hashgard.io',
    logoEg: '可公开访问的图片链接地址',
    lengthInvalid: '长度超出限制',
    setting: 'Token 功能设置',
    settingBrif: '以下功能默认开启, 一旦关闭将不可再次打开。',
    mint: '管理员可增发',
    freeze: '管理员可冻结',
    burn: '管理员可销毁',
    burnHolder: '普通用户可销毁',
    burnAny: '管理员可强制销毁其他用户Token',
    detail: 'Token详情',
    modify: '修改Token描述信息',
    switchWarn: '该功能一旦关闭将不可再次打开!',
    tab1: '基础设置',
    tab2: '增发/销毁',
    tab3: '冻结/解冻',
    tab4: '转移所有权',
    closeOk: 'Token功能关闭成功!',
  },
  mint: {
    mint: '增 发',
    burn: '销 毁',
    address: '目标地址',
    action: '操作类型',
  },
  freeze: {
    freeze: '冻 结',
    unfreeze: '解 冻',
    type: '类型',
    status: '冻结状态',
    in: 'Token 转入',
    out: 'Token 转出',
    all: '转入 + 转出',
    end: '到期时间',
    none: '没有地址冻结',
  },
  assets: {
    available: '可 用',
    lock: '锁 定',
  },
  receiveVoucher: {
    extract: '提 取',
  },
  lockInput: {
    name: '名称',
    title: '锁定列表',
    boxName: '盒子名称',
    currency: '币 种',
    lockTime: '解锁时间',
    creatTime: '创建时间',
    allOut: '全部锁定',
    currentBalance: '当前余额',
    lock: '锁 定',
    lockInfo: '锁定信息',
    lockCurrency: '锁定币种',
    lockAddress: '锁定地址',
    lockNumber: '锁定数量',
    status: '状态',
    all: '全部',
    locked: '锁定中',
    unlocked: '已解锁',
  },
  future: {
    title: '远期支付盒子',
    creat: '创建支付盒子',
    searchPlaceholder: '支付盒子名称',
    name: '名称',
    paymentPeriod: '支付期数',
    status: '状态',
    totalPayment: '支付总量',
    operation: '操作',
    paymentTitle: '支付标题',
    paymentdescribe: '盒子描述限150字',
    allow: '允许交易收款凭证',
    import: '批量导入',
    paymentTime: '支付时间',
    paymentTime1: '第一期支付时间',
    paymentTime2: '第二期支付时间',
    paymentAddress: '支付地址',
    paymentQuantity: '支付数量',
    manualAddition: '手动添加',
    template: '模版',
    importTimeAndNumber: '导入时间名单和数量',
    stage: '期',
    inject: '注入',
    withdraw: '取回',
    activation: '激活',
    ReceiveCer: '收款凭证交易',
    detail: '支付详情',
    ongoing: '进行中',
    closed: '已关闭',
    fuDe: '支付盒子详情',
    confrimInfo: '确认支付信息',
    incorrectValues: '数值有误',
    addressSplit: '多个地址用“，”分隔开',
    number: '数字',
    duplication: '地址重复',
    injectNumber: '注入数量',
    expire: '已到期',
  },
  deposit: {
    deposit: '存款',
    allDeposits: '全部存款',
    myIssue: '我发行的',
    myInvolved: '我参与的',
    creatDeposit: '创建存款盒子',
    creatDepositBox: '创建存款盒子',
    all: '全部',
    toBeActivated: '待激活',
    AdsorptionPeriod: '存款吸纳期',
    DepositPeriod: '存款锁定期',
    over: '已关闭',
    completed: '已完成',
    searchPlaceholder: '发起人地址',
    name: '名称',
    type: '种类',
    status: '状态',
    Deadline: '截止时间',
    startTime: '开始时间',
    AnnualInterestRate: '年利率%',
    target: '最低目标数量',
    depositNumber: '吸纳存款总量',
    depositCurrency: '存款币种',
    depositCap: '吸纳存款总量',
    depositLimit: '最低目标数量',
    MinimumFraction: '单位数量',
    InterestCurrency: '利息币种',
    TotalInterest: '利息总量',
    IntakeDepositStartTime: '利息注入结束时间',
    IntakeDepositEndTime: '吸纳存款结束时间',
    DepositAndInterestDeliveryTime: '存款及利息交割时间',
    DepositItemDescription: '存款项目描述',
    Allow: '允许存款凭证交易',
    creat: '创 建',
    default: '如果不填写，默认为1',
    TotalPayment: '支付总额',
    depositBoxDetail: '存款盒子详情',
    Deposited: '已存入',
    Injected: '已注入',
    noReached: '未达成',
    Achieved: '已达成',
    see: '查 看',
    Retrieve: '取 回',
    CreateAddress: '创建地址',
    inject: '注 入',
    injectToken: '注入token',
    retrieveToken: '取回token',
    NeedInjected: '还需注入',
    MaximumReturn: '最多取回',
    cancelDeposit: '取消存款',
    depositQuantity: '存入数量',
    expectedInterest: '预计利息',
    depositDetail: '存入详情',
    time: '时间',
    order: '序号',
    totalInjection: '注入总额',
    timeError: '时间错误',
    enterQuantity: '请输入数量',
    notLessTime: '不能小于当前时间',
    PositiveNumber: '必须是大于0的数字',
    depositTime: '存款时间',
    multiple: '请输入{price}的倍数',
  },
  owner: {
    brif: '转移管理员权限是【非常危险】的操作，一旦转给其他地址，该Token将从你的【Token发行列表】中移除！',
    from: 'Token 所有者',
  },
  footer: {
    copyright: '© 2019 Hashgard Foundation Ltd. All Rights Reserved.',
  },
};
export default zh;
