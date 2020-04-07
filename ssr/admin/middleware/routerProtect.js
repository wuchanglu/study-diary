import { formatDataEQ } from '../assets/js/utils.js'

export default async function({ app, req, redirect, route }) {
  let query=null
  if(!req){
    query=formatDataEQ(document.cookie)
  }else{
    query = formatDataEQ(req.headers.cookie)
  }
  if (!query.key) {
    try {
      window.location.href = `${window.location.origin}`
    } catch (error) {
      redirect({ path: '/' })
    }
  }
}
