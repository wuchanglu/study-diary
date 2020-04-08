const mongose = require('./db')
const Schema = mongose.Schema

const userSchema = new Schema(
  {
    phone: String,
    password: String,
    nick_name: String
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
  save() {}
}
module.exports = new UserDb()
