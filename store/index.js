import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import app from './modules/app';
import user from './modules/user';
import dict from './modules/dict.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    user,
    dict,
  },
  plugins: [
    createPersistedState({
      // 配置 storage 实现方式
      // uni-app 的storage 实现, 全部使用同步方法
      storage: {
        getItem: (key) => uni.getStorageSync(key),
        setItem: (key, value) => uni.setStorageSync(key, value),
        removeItem: (key) => uni.removeStorageSync(key),
      },
      // 持久化模块配置
      reducer(state) {
        const {
          app: _app,
          user: userState,
          dict: dictState,
        } = state;
        const { ...appState } = _app;
        return {
          app: appState,
          user: userState,
          dict: dictState,
        };
      },
    }),
  ],
});
