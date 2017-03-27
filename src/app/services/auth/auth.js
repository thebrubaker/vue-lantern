/**
 * An implementation of the Auth service. This service handles
 * authentication and authorization for users.
 */
export default class AuthService {

  /**
   * The constructor for the auth service.
   * @param  {HttpService} http The service for making http requests.
   * @param  {DataStoreService} store  The service for storing and retrieving data.
   * @param  {object} config Configuration for the auth service.
   * @return {AuthService} The authentication service.
   */
  constructor (http, store, config) {
    this.config = config
    this.store = store
    this.http = http.create(config)
  }

  /**
   * Returns the user's authentication status.
   * @return {Boolean} Returns true if the user is authenticated, otherwise false.
   */
  authenticated () {
    return this.token()
  }

  /**
   * Return the API access token.
   * @return {string} The api auth token.
   */
  token () {
    return this.store.get('auth/guard/access_token')
  }

  /**
   * Determine if the user is allowed to access a given route.
   * @param  {Route} to The route the user is trying to access.
   * @return {Boolean} Returns true if the user is authorized, otherwise false.
   */
  allowed (to) {
    return true
  }

  /**
   * Return the current user.
   * @return {object} The authenticated user.
   */
  user () {
    return {
      firstName: this.store.get('auth/user/first_name'),
      lastName: this.store.get('auth/user/last_name'),
      email: this.store.get('auth/user/email'),
      scopes: this.store.get('auth/user/scopes')
    }
  }

  /**
   * Clear the data and cache for the user and the authentication guard.
   * @return {undefined}
   */
  logout () {
    this.store.dispatch('auth/guard/reset')
    this.store.dispatch('auth/user/reset')
  }

  /**
   * Send a login request with given credentials.
   * @param  {string} credentials.username The username.
   * @param  {string} credentials.password The password.
   * @return {Promise} Resolves with the authorized user.
   */
  attempt ({ username, password }) {
    /**
     * Lets run a sequence of promises to
     * (1) Request and store the oauth token
     * (2) Request and store the user
     * (3) Resolve with the current user
     */
    return Promise.resolve()
      // (1)
      .then(() => {
        return this.http.post('oauth/token', this.oauthPayload({ username, password }))
      })
      // (2)
      .then(response => {
        this.store.commit('auth/guard/token_type', response.data.token_type).cache()
        this.store.commit('auth/guard/expires_in', response.data.expires_in).cache()
        this.store.commit('auth/guard/access_token', response.data.access_token).cache()
        this.store.commit('auth/guard/refresh_token', response.data.refresh_token).cache()
        return this.http.get('user')
      })
      // (3)
      .then(response => {
        this.store.commit('auth/user/first_name', response.data.first_name).cache()
        this.store.commit('auth/user/last_name', response.data.last_name).cache()
        this.store.commit('auth/user/email', response.data.email).cache()
        this.store.commit('auth/user/scopes', []).cache()
        return Promise.resolve(response.data)
      })
  }

  /**
   * Refresh the user's access token.
   * @return {undefined}
   */
  refreshToken () {
    return this.http.post('oauth/token', this.oauthRefreshPayload())
      .then(response => {
        this.store.commit('auth/guard/token_type', response.data.token_type).cache()
        this.store.commit('auth/guard/expires_in', response.data.expires_in).cache()
        this.store.commit('auth/guard/access_token', response.data.access_token).cache()
        this.store.commit('auth/guard/refresh_token', response.data.refresh_token).cache()
      })
  }

  /**
   * Merge the credentials with the other parameters required in an oauth request.
   * @param  {string} credentials The username and password for the user.
   * @return {object} The payload for requesting an access token.
   */
  oauthPayload (credentials) {
    return Object.assign(credentials, this.config.grant)
  }

  /**
   * Return the oauth parameters to refresh an access token.
   * @return {object} The payload for refreshing an access token.
   */
  oauthRefreshPayload () {
    return Object.assign(this.config.grant, {
      grant_type: 'refresh_token',
      refresh_token: this.store.get('auth/guard').refreshToken
    })
  }
}
