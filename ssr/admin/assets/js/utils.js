import OSS from 'ali-oss'
/**
 * 上传文件至阿里云
 * @param {文件} file
 */
function upload(file) {
  const path = `${new Date().valueOf()}-${file.name}`
  let client = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: 'LTAI4Fu1Tpw8RmLMnFbwj1pR',
    accessKeySecret: '3QjgdQLwUT5a9Qdefn0UJAuJ3azFUR',
    bucket: 'wcl-bucket'
  })
  return new Promise((resolve, reject) => {
    client
      .put(path, file)
      .then(res => {
        try {
          resolve(res.url)
        } catch (err) {
          reject(err)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * 拷贝字符串到粘贴板
 * @param {要拷贝的字符串} str
 */
function copyStr(str) {
  const input = document.createElement('input')
  // input.style.visibility = 'hidden'
  input.style.opacity = 0
  input.value = str
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
  return true
}
/**
 * 字符串转对象
 * @param {要转换的字符串 xx=aaa,yy=bbb} str
 */
function formatDataEQ(str = '') {
  let obj = {}
  try {
    str.split(/[,;]/g).forEach(item => {
      const data = item.trim().split('=')
      if (data.length) {
        obj[data[0]] = data[1]
      }
    })
  } catch (error) {}
  return obj
}
export { upload, copyStr, formatDataEQ }
