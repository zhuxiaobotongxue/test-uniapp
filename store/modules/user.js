/* eslint-disable no-param-reassign */
export default {
  state: {
    userInfo: null,
    token: null,
  },
  getters: {
    userInfo: (state) => state.userInfo,
    token: (state) => state.token,
    // 当userinfo 和 token 都存在时 即认定已经登录.
    hasSignin: (state) => !!(state.userInfo && state.token),
  },
  mutations: {
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    UPD_USERINFO(state, params) {
      state.userInfo = {
        ...state.userInfo,
        ...params,
      };
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    CLEAR_SIGNIN_STATUS(state) {
      state.userInfo = null;
      state.token = null;
    },
  },
  actions: {
    signin({
      commit,
    }, {
      token,
      userInfo,
    }) {
      return new Promise((resolve, reject) => {
        if (token && userInfo) {
          commit('SET_TOKEN', token);
          commit('SET_USERINFO', userInfo);
          resolve({
            code: 200,
            userInfo
          });
        } else {
          reject(new Error('token或userInfo无！'));
        }
      });
    },
    signOut({
      commit,
    }) {
      return new Promise((resolve, reject) => {
        try {
          commit('CLEAR_SIGNIN_STATUS');
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
    updateUserInfo({
      commit,
    }, {
      field,
      value,
    }) {
      return new Promise((resolve, reject) => {
        try {
          const params = {
            [field]: value,
          };
          commit('UPD_USERINFO', params);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
  },
};
