export default {

  /**
   * The driver used for authentication.
   * @type {String}
   */
  driver: 'firebase',

  /**
   * The drivers available to use for authentication.
   * @type {Object}
   */
  drivers: {

    /**
     * The firebase driver for authentication
     * @type {Object}
     */
    firebase: {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      storageBucket: '',
      messagingSenderId: ''
    },

    /**
     * The laravel driver for authentication.
     * @type {Object}
     */
    laravel: {
      auth_url: '',
      client_id: '',
      client_secret: '',
      grant_type: '',
      scope: '*'
    }
  }
}
