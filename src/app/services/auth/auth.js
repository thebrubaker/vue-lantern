import FirebaseAuthDriver from './firebase-auth-driver'
import LaravelSearchDriver from './laravel-auth-driver'

export default class AuthService {

  /**
   * The constructor for the auth service.
   * @param  {HttpService} http The service for making http requests.
   * @param  {DataStoreService} store  The service for storing and retrieving data.
   * @param  {object} config Configuration for the auth service.
   * @return {AuthService} The authentication service.
   */
  constructor ({ api, firebase, store }, config) {
    this.drivers = {
      firebase: new FirebaseAuthDriver(firebase, store, config),
      laravel: new LaravelSearchDriver(api, store, config)
    }
    switch (config.driver) {
      case 'firebase':
        this.selected_driver = this.drivers.firebase
        break
      case 'laravel':
        this.selected_driver = this.drivers.laravel
        break
      default: error(`The driver you selected is not supported: ${config.driver}`, 'AuthService')
    }
  }

  /**
   * Returns the user's authentication status.
   * @return {Boolean} Returns true if the user is authenticated, otherwise false.
   */
  authenticated () {
    return this.selected_driver.authenticated()
  }

  /**
   * Determine if the user is allowed to access a given route.
   * @param  {object} guard  The guard object
   * @return {boolean}  Returns true if the user is authorized, otherwise false.
   */
  allowed (guard) {
    return this.selected_driver.allowed(guard)
  }

  /**
   * Return the current user's scopes
   * @return {array}  An array of the user's scopes.
   */
  scopes () {
    return this.selected_driver.scopes()
  }

  /**
   * Determine if the user is allowed to access a given route.
   * @param  {Route} to The route the user is trying to access.
   * @return {Boolean} Returns true if the user is authorized, otherwise false.
   */
  routeGuard (route) {
    return this.selected_driver.routeGuard(route)
  }

  /**
   * Return the current user.
   * @return {object} The authenticated user.
   */
  user () {
    return this.selected_driver.user()
  }

  /**
   * Clear the data and cache for the user and the authentication guard.
   * @return {undefined}
   */
  logout () {
    return this.selected_driver.logout()
  }

  /**
   * Send a login request with given credentials.
   * @param  {string} email  The username.
   * @param  {string} password  The password.
   * @return {Promise} Resolves with the authorized user.
   */
  attempt (email, password) {
    return this.selected_driver.attempt(email, password)
  }

  /**
   * Refresh the user's access token.
   * @return {undefined}
   */
  refreshToken () {
    return this.selected_driver.refreshToken()
  }
}
