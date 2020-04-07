export const state = () => {
  const state = {
    userInfo: {}
  }
  return state
}
export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  }
}
export const getters = {
  getUserInfo: state => {
    return state.userInfo
  }
}
