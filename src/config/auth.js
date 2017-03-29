export default {

  /**
   * Where to redirect a guest user on an auth check.
   */
  'guest': '/login',

  /**
   * Where to redirect an authorized user.
   */
  'redirect': '/dashboard',

  /**
   * The namespace of the user object in the data store
   */
  'user_namespace': 'auth/user',

  /**
   * The namespace of the guard object in the data store
   */
  'guard_namespace': 'auth/guard',

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
      client_id: env('LARAVEL_AUTH_CLIENT_ID'),
      client_secret: env('LARAVEL_AUTH_CLIENT_SECRET'),
      grant_type: env('LARAVEL_AUTH_GRANT_TYPE'),
      scope: env('LARAVEL_AUTH_SCOPE', '*')
    }
  }
}
