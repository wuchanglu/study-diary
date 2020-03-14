const mongose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/diary'
mongose.connect(DB_URL)
mongose.connection.on('connected', function() {
  console.log('mongose connection open to ' + DB_URL)
})
/**
 * 连接异常 error 数据库连接错误
 */
mongose.connection.on('error', function(err) {
  console.log('mongose connection error: ' + err)
})
/**
 * 连接断开 disconnected 连接异常断开
 */
mongose.connection.on('disconnected', function() {
  console.log('mongose connection disconnected')
})

module.exports = mongose
