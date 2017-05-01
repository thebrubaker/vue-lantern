import { Auth } from 'lantern-core'
import services from 'src/config/services'
import config from 'src/config/auth'

/**
 * These services are booted during app initialization.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function boot (app) {
  app.bind('auth', function ({ firebase, api, store }) {
    return new Auth({
      firebase: new Auth.FirebaseDriver(firebase, store, config),
      api: new Auth.ApiDriver(api, store, config, services.laravel)
    }, config)
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
