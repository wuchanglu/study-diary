const router = require('koa-router')()
const UserDb = require('../utils/db/index')
const { setUserInfo } = require('../utils/ctx/user')
router.prefix('/users')

router.get('/', function(ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function(ctx, next) {
  ctx.body = 'this is a users/bar response'
})
router.post('/registe', async function(ctx, next) {
  let data = {
    state: 100,
    message: ''
  }
  const query = ctx.request.body
  const check = await UserDb.query(query.phone, query.password)
  if (check.length) {
    data.message = '账号已存在'
    ctx.body = JSON.stringify(data)
    return
  }
  const res = await UserDb.save({
    phone: query.phone,
    password: query.password,
    nick_name: query.nick_name || '',
    block_name: query.block_name || '',
    motto: query.motto || '',
    avator: query.avator || ''
  })
  if (res) {
    data.state = 200
    data.message = '保存成功'
    data.id = res._id
  }
  ctx.body = JSON.stringify(data)
})
router.post('/login', async function(ctx, next) {
  const query = ctx.request.body
  const res = await UserDb.query(query.phone, query.password)
  ctx.body = setUserInfo(res)
})
router.post('/updateUserInfo', async function(ctx, next) {
  let query = {}
  ;({
    nickName: query.nick_name,
    blockName: query.block_name,
    motto: query.motto,
    avator: query.avator
  } = ctx.request.body)
  const id = ctx.request.body.userid
  Object.keys(query).forEach(key => {
    if (!query[key]) {
      delete query
    }
  })
  let res = await UserDb.update(id, query)
  if (res.n === 1 && res.ok === 1) {
    res = await UserDb.queryById(id)
  }
  ctx.body = setUserInfo(res)
})
router.post('/userInfoByid', async function(ctx, next) {
  const query = ctx.request.body
  const res = await UserDb.queryById(query.id)
  ctx.body = setUserInfo(res)
})
module.exports = router
