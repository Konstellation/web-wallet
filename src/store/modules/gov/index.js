import chain from '../../../utils/chain';

export default {
    namespaced: true,
    state: {
        proposalList: [],
        proposalMap: {},
        proposals: [],
        votes: [],
        depositParams: {},
        loading: false,
    },
    getters: {},
    mutations: {
        setLoading (state, loading) {
            state.loading = loading;
        },
        setList (state, data) {
            state.proposalList = data;
        },
        setMap (state, data) {
            state.proposalMap = Object.assign({}, state.proposalMap, data);
        },
        setProposals (state, data) {
            state.proposals = data;
        },
        setVotes (state, data) {
            state.votes = data;
        },
        setDepositParams (state, data) {
            state.depositParams = data;
        },
    },
    actions: {
        async fetchAllProposals (context, params) {
            context.commit('setLoading', true);

            const {result: proposals} = await chain.fetchGovProposals({
                params,
            });
            if (proposals) {
                context.commit('setList', proposals);
                proposals.forEach(i => {
                    context.commit('setMap', {
                        [i.id]: i,
                    });
                });
            }

            context.commit('setLoading', false);

            return Promise.resolve(proposals);
        },
        async fetchDepositorProposals (context, currentAddress) {
            context.commit('setLoading', true);

            const {result: proposals} = await chain.fetchGovProposals({
                depositor: currentAddress,
            });
            if (proposals) {
                context.commit('setProposals', proposals);
            }
            context.commit('setLoading', false);

            return Promise.resolve(proposals);
        },
        async fetchProposal (context, id) {
            const {result: proposal} = await chain.fetchGovProposal(id);

            const {result: tally} = await chain.fetchGovProposalTally(id);
            const {result: votes} = await chain.fetchGovProposalVotes(id);

            proposal.votes = votes;
            proposal.tally = tally;

            if (proposal) {
                context.commit('setMap', {
                    [proposal.id]: proposal,
                });
            }

            return Promise.resolve(proposal);
        },
        create (context, {form, pass, keyStore}) {
            const proposer = chain.importAccount({keyStore, pass});
            console.log(form);
            // return chain.submitProposal({proposer, ...form});
        },
        deposit (context, {form, proposalId, pass, keyStore}) {
            const depositor = chain.importAccount({keyStore, pass});

            return chain.depositToProposal({depositor, proposalId, ...form});
        },
        vote (context, {form, proposalId, pass, keyStore}) {
            const voter = chain.importAccount({keyStore, pass});

            return chain.voteProposal({voter, proposalId, ...form});
        },
        async fetchProposalVotes (context, id) {
            const {result} = await chain.fetchGovProposalVotes(id);
            if (result) {
                context.commit('setVotes', result);
            }

            return Promise.resolve(result);
        },
        async fetchProposalVote (context, id) {
            const address = context.rootGetters['account/currentAddress'];
            const {result} = await chain.fetchGovProposalVote(id, address);

            return Promise.resolve(result);
        },
        async fetchProposalProposer (context, id) {
            const {result} = await chain.fetchGovProposalProposer(id);

            return Promise.resolve(result);
        },
        async fetchProposalDeposit (context, id) {
            const address = context.rootGetters['account/currentAddress'];
            const {result} = await chain.fetchGovProposalDeposit(id, address);

            return Promise.resolve(result);
        },
        async fetchProposalDeposits (context, id) {
            const {result} = await chain.fetchGovProposalDeposits(id);

            return Promise.resolve(result);
        },
        async fetchProposalTally (context, id) {
            const {result} = await chain.fetchGovProposalTally(id);

            return Promise.resolve(result);
        },
        async fetchDepositParams (context) {
            const {result: params} = await chain.fetchGovDepositParameters();
            if (params) {
                context.commit('setDepositParams', params);
            }

            return Promise.resolve(params);
        },
    },
};
