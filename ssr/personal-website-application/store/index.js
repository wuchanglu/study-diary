export const state = () => {
  const state = {
    userInfo: {
      name: 'aaa'
    }
  }
  try {
    if (sessionStorage.getItem('userInfo')) {
      state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    }
  } catch (error) {}
  return state
}
export const mutations = {
  setUserInfo(state, data) {
    sessionStorage.setItem('userInfo', JSON.stringify(data))
    state.userInfo = data
  }
}
