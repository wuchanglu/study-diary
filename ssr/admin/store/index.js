import { formatDataEQ } from '../assets/js/utils.js'
export const state = () => {
  const state = {
    userInfo: {},
    userid: ''
  }
  return state
}
export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  },
  setUserid(state, id) {
    state.userid = id
  }
}
export const getters = {
  getUserInfo: state => {
    return state.userInfo
  }
}
export const actions = {
  async nuxtServerInit({ commit }, { req, $axios }) {
    const cookie = formatDataEQ(req.headers.cookie)
    if (cookie.userid) {
      commit('setUserid', cookie.userid)
    }
    const res = await $axios.post('users/userInfoByid', {
      id: cookie.userid
    })
    if (res.data.code === 200) {
      commit('setUserInfo', res.data.userInfo)
    }
  }
}
