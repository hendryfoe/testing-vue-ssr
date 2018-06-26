export default {
  namespaced: true,
  state: () => ({
    count: 0,
    entities: [],
  }),
  actions: {
    increment({ commit }) {
      commit('increment');
    },
    fetch({ commit }) {
      commit('fetch');
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    fetch(state) {
      state.entities = [1, 2, 3];
    },
  },
};
