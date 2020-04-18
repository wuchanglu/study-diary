const mongose = require('./db')
const Schema = mongose.Schema

const diarySchema = new Schema(
  {
    title: String,
    introduce: String,
    html: String,
    markdown: String,
    addTime: String,
    userid: String,
    typeid: String
  },
  { collection: 'diary' }
)

const diaryModal = mongose.model('diary', diarySchema)

class diaryDb {
  constructor() {}
  query(params = {}) {
    return new Promise((resolve, reject) => {
      diaryModal.find(params, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  save(params) {
    return new Promise((resolve, reject) => {
      const save = new diaryModal(params)
      save.save(params, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  updated(params) {
    let data = {
      title: params.title,
      introduce: params.introduce,
      html: params.html,
      markdown: params.markdown,
      userid: params.userid,
      typeid: params.typeid
    }
    Object.keys(data).forEach(key => {
      if (!data[key]) {
        delete data[key]
      }
    })
    data.updateTime = +new Date()
    return new Promise((resolve, reject) => {
      diaryModal.update({ _id: params.id }, data, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      diaryModal.remove({ _id: id }, { justOne: true }, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
}
module.exports = new diaryDb()
