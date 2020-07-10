/* eslint-disable no-param-reassign */
export default {
  state: {
    initComplete: false,
  },
  getters: {
    initComplete: (state) => state.initComplete,
  },
  mutations: {
    SET_INIT_COMPLETE(state) {
      state.initComplete = true;
    },
  },
  actions: {},
};
