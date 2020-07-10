/* eslint-disable no-param-reassign */
export default {
  state: {
    dict: null,
  },
  getters: {
    dict: (state) => state.dict,
  },
  mutations: {
    SET_DICTS(state, dict) {
      state.dict = dict;
    },
  },
  actions: {},
};
