import { formatDataEQ } from '../assets/js/utils.js'
import axios from 'axios'
export default async function({ app, req, redirect, route, store, $axios }) {
  if (!store.state.userid && route.path !== '/registe') {
    try {
      window.location.href = `${window.location.origin}`
    } catch (error) {
      redirect({ path: '/' })
    }
  } else if (route.path === '/') {
    try {
      window.location.href = `${window.location.origin}/home/person`
    } catch (error) {
      redirect({ path: '/home/person' })
    }
  }
}
