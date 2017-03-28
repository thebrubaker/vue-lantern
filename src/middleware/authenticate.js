export default {
  handleBefore (app) {
    return (to, from, next) => {
      // If authenticated and accessing a guest only route, redirect home
      if (app.auth.authenticated() && to.meta && to.meta.guest) {
        return next('/home/dashboard')
      }

      // Redirect to `/login` if not authenticated
      if (!app.auth.authenticated() && to.path !== config('auth.login_route')) {
        return next('login')
      }

      // check if scoped, redirect to access denied
      if (!app.auth.allowed(to)) {
        // Raise alert: Access denied
        return next(false)
      }

      return next()
    }
  },
  handleAfter (app) {
    return (to, from) => {

    }
  }
}
