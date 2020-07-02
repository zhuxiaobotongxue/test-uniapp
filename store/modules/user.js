import {
  APP_CONST
} from '@/constants'
export default {
  state: {
    userInfo: null,
    token: null
  },
  getters: {
    userInfo: state => state.userInfo,
    token: state => state.token,
    // 当userinfo 和 token 都存在时 即认定已经登录.
    hasSignin: state => !!(state.userInfo && state.token)
  },
  mutations: {
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    UPD_USERINFO(state, params){
      state.userInfo = Object.assign({}, state.userInfo, params)
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    CLEAR_SIGNIN_STATUS(state) {
      state.userInfo = null
      state.token = null
    }
  },
  actions: {
    signin({
      commit
    }, {
      token,
      userInfo
    }) {
      return new Promise(async (resolve, reject) => {
        if (token && userInfo) {
          commit('SET_TOKEN', token)
          commit('SET_USERINFO', userInfo)
          resolve(userInfo)
        } else {
          reject('token或userInfo无！')
        }
      })
    },
    signOut({
      commit
    }) {
      return new Promise(async (resolve, reject) => {
        // 处理退出逻辑
        commit('CLEAR_SIGNIN_STATUS')
        resolve()
      })
    },
    updateUserInfo({
      commit
    }, {
      field,
      value
    }) {
      return new Promise(async (resolve, reject) => {
        try {
          const params = {
            [field]: value
          }
          commit('UPD_USERINFO', params)
          resolve()
        } catch (err) {
          reject(err)
        }
      })
    },
  }
}
