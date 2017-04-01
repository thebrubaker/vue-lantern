/**
 * If the response comes back 401, log the user out and return them
 * to the guest route.
 */
export default {
  success: response => response,
  failure: error => {
    if (error.response.status === 401 && app.auth.authenticated()) {
      app.auth.logout()
      app.router.push(app.auth.config.guest)
    }
  }
}
