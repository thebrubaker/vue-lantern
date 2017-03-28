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
      apiKey: env('FIREBASE_API_KEY'),
      authDomain: env('FIREBASE_AUTH_DOMAIN'),
      databaseURL: env('FIREBASE_DATABASE_URL'),
      storageBucket: env('FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: env('FIREBASE_MESSAGING_SENDER_ID')
    },

    /**
     * The laravel driver for authentication.
     * @type {Object}
     */
    laravel: {
      auth_url: env('LARAVEL_AUTH_URL'),
      client_id: env('LARAVEL_AUTH_CLIENT_ID'),
      client_secret: env('LARAVEL_AUTH_CLIENT_SECRET'),
      grant_type: env('LARAVEL_AUTH_GRANT_TYPE'),
      scope: env('LARAVEL_AUTH_SCOPE', '*')
    }
  }
}
