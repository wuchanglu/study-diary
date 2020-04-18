function setUserInfo(res) {
  let data = {
    code: 100
  }
  if (res.length) {
    data.code = 200
    data.userInfo = res[0]
  }
  return JSON.stringify(data)
}
module.exports = {
  setUserInfo
}
