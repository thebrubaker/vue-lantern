import { auth, router, store } from 'app'

export default {
  'login' (message, credentials) {
    store.set('login/resolving', true)
    auth.attempt(credentials).then(response => {
      store.set('login/resolving', false)
      router.push('/home/dashboard')
    }).catch(response => {
      store.set('login/resolving', false)
    })
  },
  'logout' (message, credentials) {
    auth.logout()
    store.dispatch('layout/account.toggle')
  }
}
