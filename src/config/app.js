export default {

  /**
   * The name of your application.
   */
  'name': 'Lantern',

  /**
   * The dev environment
   * @type {String}
   */
  environment: env('APP_ENV', 'local'),

  /**
   * Enable debugging for your application and services.
   * @type {Boolean}
   */
  debug: env('APP_DEBUG', true),

  /**
   * Registers all service providers for the application.
   * @type {Array}
   */
  providers: {

    // Application Service Providers
    api: require('src/app/providers/api'),
    auth: require('src/app/providers/auth'),
    events: require('src/app/providers/events'),
    http: require('src/app/providers/http'),
    router: require('src/app/providers/router'),
    search: require('src/app/providers/search'),
    store: require('src/app/providers/store'),
    view: require('src/app/providers/view')

  },

  /**
   * Register aliases for the application. Each alias will access that service from the application container.
   * @type {array}
   */
  aliases: [

    'search',
    'api',
    'auth',
    'http',
    'events',
    'router',
    'view',
    'store'

  ]
}
