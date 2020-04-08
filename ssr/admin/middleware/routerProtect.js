import { formatDataEQ } from '../assets/js/utils.js'
import axios from 'axios'
export default async function({ app, req, redirect, route, store, $axios }) {
  if (!store.state.userid) {
    try {
      window.location.href = `${window.location.origin}`
    } catch (error) {
      redirect({ path: '/' })
    }
  }
}
