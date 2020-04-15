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
