const router = require('koa-router')()
const UserDb = require('../utils/db/index')

router.prefix('/users')

router.get('/', function(ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function(ctx, next) {
  ctx.body = 'this is a users/bar response'
})
router.get('/login', async function(ctx, next) {
  console.log(ctx.query)
  const query = ctx.query
  const res = await UserDb.query(query.phone, query.password)
  let data = {
    code: 100
  }
  if (res.length) {
    data.code = 200
    data.userInfo = res[0]
  }
  ctx.body = JSON.stringify(data)
})
module.exports = router
