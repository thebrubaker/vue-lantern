export default {

  /**
   * Middlware before the user hits a route.
   * @param  {Lantern} app  The application.
   * @return {undefined}
   */
  handleBefore ({ auth }) {
    return (to, from, next) => {
      // If authenticated and accessing a guest only route, redirect to appropriate page
      if (auth.authenticated() && to.meta && to.meta.guest) {
        return next(config('auth.redirect'))
      }

      // If not authenticated and not accessing the guest path, redirect to the guest path
      if (!auth.authenticated() && to.path !== config('auth.guest')) {
        return next(config('auth.guest'))
      }

      // If the user does not have the given access permissions, throw an error
      if (!app.auth.routeGuard(to)) {
        return next(false)
      }

      return next()
    }
  },

  /**
   * Middlware after a user hits a route.
   * @param  {Lantern} app  The application.
   * @return {undefined}
   */
  handleAfter (app) {
    return (to, from) => {

    }
  }
}