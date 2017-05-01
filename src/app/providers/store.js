import { Store } from 'lantern-core'
import Vue from 'vue'
import Vuex from 'vuex'
import config from 'src/config/store'

/**
 * These services are booted during app initialization.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function boot (app) {
  app.bind('store', function (container) {
    return new Store(Vue, Vuex, config)
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
