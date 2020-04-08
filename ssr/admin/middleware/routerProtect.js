import { formatDataEQ } from '../assets/js/utils.js'

export default async function({ app, req, redirect, route,store }) {
  if (!store.state.userid) {
    try {
      window.location.href = `${window.location.origin}`
    } catch (error) {
      redirect({ path: '/' })
    }
  }
}
