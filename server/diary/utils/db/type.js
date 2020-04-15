const mongose = require('./db')
const Schema = mongose.Schema
const typeSchema = new Schema(
  {
    userid: String,
    name: String,
    add_time: Number,
    update_time: Number
  },
  { collection: 'type' }
)
const typeModal = mongose.model('type', typeSchema)
class TypeDb {
  constructor() {}
  query(params = {}) {
    return new Promise((resolve, reject) => {
      typeModal.find(params, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  save(params) {
    return new Promise((resolve, reject) => {
      const save = new typeModal(params)
      save.save(params, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  update(id, params) {
    let data = {
      name: params.name
    }
    Object.keys(data).forEach(key => {
      if (!data[key]) {
        delete data[key]
      }
    })
    data.updateTime = +new Date()
    return new Promise((resolve, reject) => {
      typeModal.update({ _id: id }, data, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      typeModal.remove({ _id: id }, { justOne: true }, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
}
module.exports = new TypeDb()
