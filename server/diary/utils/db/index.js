const mongose = require('./db')
const Schema = mongose.Schema

const userSchema = new Schema(
  {
    phone: String,
    password: String,
    nick_name: String,
    block_name: String,
    motto: String,
    avator: String
  },
  { collection: 'user' }
)

const userModal = mongose.model('user', userSchema)

class UserDb {
  constructor() {}
  query(phone, password) {
    return new Promise((resolve, reject) => {
      userModal.find({ phone, password }, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  queryById(id) {
    return new Promise((resolve, reject) => {
      userModal.find({ _id: id }, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  update(id, config) {
    let updateData = {}
    Object.keys(config).forEach(key => {
      updateData[key] = config[key]
    })
    console.log(id, config)
    return new Promise((resolve, reject) => {
      userModal.update({ _id: id }, updateData, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  save() {}
}
module.exports = new UserDb()
