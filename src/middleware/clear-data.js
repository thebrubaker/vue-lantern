export default {
  handleBefore (app) {
    return (to, from, next) => {
      app.store.set('search-bar/searching', false)

      return next()
    }
  },
  handleAfter (app) {

  }
}
