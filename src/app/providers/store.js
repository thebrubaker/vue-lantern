import Store from 'services/vuex/store'

/**
 * These services are booted during app initialization.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function boot (key, app) {
  app.bind(key, function (container) {
    return new Store(config('store'))
  })
}

/**
 * You can now use services that have been booted on app initialization to
 * register additional services.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function register (app) {

}

export default { boot, register }
