import actions from 'store/actions'
import getters from 'store/getters'
import modules from 'store/modules'

export default {
  /**
   * Force the Vuex store into strict mode. In strict mode any mutations
   * to Vuex state outside of mutation handlers will throw an Error.
   */
  strict: env('APP_DEBUG', true),

  /**
   * Actions for the store service.
   * @type {object}
   */
  actions,

  /**
   * Getters for the store service.
   * @type {object}
   */
  getters,

  /**
   * Modules for the store service.
   * @type {object}
   */
  modules,

  /**
   * Plugins to be registered with the store service.
   * @type {array}
   */
  plugins: []
}
