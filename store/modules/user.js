import {
  APP_CONST
} from '@/constants';
import {
  userApis
} from '@/apis'
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
      type,
      name,
      pwd,
      tel,
      code,
      rePwd
    }) {
      return new Promise(async (resolve, reject) => {
        let result = null
        if (type === APP_CONST.AUTH_MODES.ACCOUNT) {
          let {
            data: res
          } = await userApis.signinByPwd({
            name,
            pwd
          })
          result = res
        }
        if (type === APP_CONST.AUTH_MODES.CAPTCHA) {
          let {
            data: res
          } = await userApis.signinByCode({
            tel,
            code
          })
          result = res
        }
        // 处理结果
        if (result && result.token && result.userInfo) {
          commit('SET_USERINFO', result.userInfo)
          commit('SET_TOKEN', result.token)
          resolve(result.userInfo)
        } else {
          reject('返回信息格式不规范！')
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
  }
}
