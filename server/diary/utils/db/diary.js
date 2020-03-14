const mongose = require('./db')
const Schema = mongose.Schema

const diarySchema = new Schema(
  {
    phone: String,
    title: String,
    introduce: String,
    html: String,
    markdown: String,
    addTime: String
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
    const data = {
      phone: params.phone,
      title: params.title,
      introduce: params.introduce,
      html: params.html,
      markdown: params.markdown
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
}
module.exports = new diaryDb()
