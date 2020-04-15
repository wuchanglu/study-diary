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
  },
  getUserid: state => {
    return state.userid
  }
}
export const actions = {
  async nuxtServerInit({ commit }, { params, req, $axios }) {
    console.log(params)
    const res = await $axios.post('users/userInfoByid', {
      id: params.block
    })
    if (res.data.code === 200) {
      commit('setUserInfo', res.data.userInfo)
    }
  }
}
