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
  providers: [

    // Application Service Providers
    require('src/app/providers/api'),
    require('src/app/providers/auth'),
    require('src/app/providers/events'),
    require('src/app/providers/http'),
    require('src/app/providers/router'),
    require('src/app/providers/search'),
    require('src/app/providers/store'),
    require('src/app/providers/view')

  ],

  /**
   * Aliases to services that should be loaded into the application.
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
