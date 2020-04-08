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
router.get('/login', async function(ctx, next) {
  const query = ctx.query
  const res = await UserDb.query(query.phone, query.password)
  ctx.body = setUserInfo(res)
})
router.post('/userInfoByid', async function(ctx, next) {
  const query = ctx.request.body
  const res = await UserDb.queryById(query.id)
  ctx.body = setUserInfo(res)
})
module.exports = router
