export default {
  handleBefore (app) {
    return (to, from, next) => {
      app.store.set('layout/account.visible', false)
      return next()
    }
  },
  handleAfter (app) {
    return (to, from) => {
      app.store.dispatch('layout/reset')
    }
  }
}
