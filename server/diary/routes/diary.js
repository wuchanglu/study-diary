const router = require('koa-router')()
const DiaryDb = require('../utils/db/diary')
const TypeDb = require('../utils/db/type')
router.prefix('/diary')
router.get('/list', async function(ctx, next) {
  let data = {
    state: 100,
    list: []
  }
  const query = ctx.query
  const res = await DiaryDb.query({
    phone: query.phone
  })
  if (res && res.forEach) {
    data.state = 200
    data.list = res
  }
  ctx.body = JSON.stringify(data)
})
router.get('/detail', async function(ctx, next) {
  let data = {
    state: 100,
    data: {}
  }
  const query = ctx.query
  const res = await DiaryDb.query({
    _id: query.id
  })
  console.log(res)
  if (res && res.forEach) {
    data.state = 200
    data.data = res[0]
  }
  ctx.body = JSON.stringify(data)
})
router.post('/add', async function(ctx, next) {
  let data = {
    state: 100,
    message: ''
  }
  const query = ctx.request.body
  const check = checkSaveData(query)
  if (!check.can) {
    data.message = check.message
    ctx.body = JSON.stringify(data)
    return
  }
  const res = await DiaryDb.save({
    phone: query.phone,
    title: query.title,
    introduce: query.introduce,
    html: query.html,
    markdown: query.markdown,
    addTime: +new Date(),
    userid: query.userid,
    typeid: query.typeid
  })
  if (res) {
    data.state = 200
    data.message = '保存成功'
    data.id = res._id
  }
  ctx.body = JSON.stringify(data)
})
router.post('/update', async function(ctx, next) {
  let data = {
    state: 100,
    message: ''
  }
  const query = ctx.request.body
  console.log(query)
  if (!query.id) {
    data.message = '参数错误'
    ctx.body = JSON.stringify(data)
    return
  }
  const res = await DiaryDb.updated(query)
  if (res.ok) {
    data.state = 200
    data.message = '修改成功'
  }
  ctx.body = JSON.stringify(data)
})
router.post('/del', async function(ctx, next) {
  let data = {
    state: 100,
    message: '删除失败'
  }
  const query = ctx.request.body
  const res = await DiaryDb.delete(query.id)
  if (res.n === 1 && res.ok === 1) {
    data = {
      state: 200,
      message: '删除成功'
    }
  }
  ctx.body = JSON.stringify(data)
})
router.get('/type/list', async function(ctx, nex) {
  const query = ctx.query
  let res = await TypeDb.query({ userid: query.userid })
  res = JSON.parse(JSON.stringify(res))
  if (!query.limit) {
    const diaryList = await DiaryDb.query({
      userid: query.userid
    })
    const mapData = {}
    res.forEach(item => {
      mapData[item._id] = item
      mapData[item._id].children = []
    })
    diaryList.forEach(item => {
      mapData[item.typeid].children.push(item)
    })
  }
  let data = {
    state: 200,
    list: res
  }
  ctx.body = JSON.stringify(data)
})
router.post('/type/add', async function(ctx, next) {
  let data = {
    state: 100,
    message: ''
  }
  const query = ctx.request.body
  const res = await TypeDb.save({
    userid: query.userid,
    name: query.name,
    add_time: new Date().valueOf()
  })
  if (res) {
    data.state = 200
    data.message = '保存成功'
    data.id = res._id
  }
  ctx.body = JSON.stringify(data)
})
router.post('/type/del', async function(ctx, next) {
  let data = {
    state: 100,
    message: '删除失败'
  }
  const query = ctx.request.body
  const res = await TypeDb.delete(query.id)
  if (res.n === 1 && res.ok === 1) {
    data = {
      state: 200,
      message: '删除成功'
    }
  }
  ctx.body = JSON.stringify(data)
})
router.post('/type/update', async function(ctx, next) {
  let data = {
    state: 100,
    message: ''
  }
  const query = ctx.request.body
  const res = await TypeDb.update(query.id, {
    name: query.name
  })
  console.log(res)
  if (res.n === 1 && res.ok === 1) {
    data = { state: 200, message: '更新成功' }
  }
  ctx.body = JSON.stringify(data)
})

function checkSaveData(params) {
  const res = {
    can: true,
    message: ''
  }
  if (!params.title) {
    res.message = '缺失参数：title'
    res.can = false
    return res
  }
  if (!params.introduce) {
    res.message = '缺失参数：introduce'
    res.can = false
    return res
  }
  if (!params.html) {
    res.message = '缺失参数：html'
    res.can = false
    return res
  }
  if (!params.markdown) {
    res.message = '缺失参数：markdown'
    res.can = false
    return res
  }
  return res
}
module.exports = router
