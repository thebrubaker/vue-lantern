import Vuex from 'vuex'
import Vue from 'vue'
import bootstrap from './bootstrap'
import Cache from './Cache'

Vue.use(Vuex)

export default class VuexStoreService {

  /**
   * Bootstraps modules and creates a new Vuex store
   * @param  {object} config  Store configuration.
   * @return {undefined}
   */
  constructor (config) {
    bootstrapModules(config.modules)
    this.vuex = new Vuex.Store(config)
    this.config = config
    this.bootCachedData()
  }

  /**
   * Boot the data store by loading cached data
   * @param {object} list of filenames as an object
   * @return {array} list of keys to boot from cache
   */
  bootCachedData (list) {
    Object.keys(this.vuex['_mutations']).forEach(item => {
      this.loadFromCache(item)
    })
  }

  /**
   * Commit a mutation
   * @param  {string} key that needs to be updated
   * @param  {any} value for said key
   * @return {Cache} Cache
   */
  commit (key, value) {
    this.vuex.commit(key, value)

    return new Cache(key, value)
  }

  /**
   * Dispatch an action
   * @param  {string} type Constant that gets captured by the store's reducer
   * @param  {any} payload Object store mutator
   * @return {object} dispatch
   */
  dispatch (type, payload) {
    return this.vuex.dispatch(type, payload)
  }

  /**
   * Replace the store's root state. Use this only for state
   * hydration / time-travel purposes.
   * @param {object} state as it currently exists
   * @return {object} state updated state
   */
  replaceState (state) {
    return this.vuex.replaceState(state)
  }

  /**
   * Reactively watch a getter function's return value, and call the callback
   * when the value changes. The getter receives the store's state as the
   * only argument. Accepts an optional options object that takes the same
   * options as Vue's vm.$watch method. To stop watching, call the returned
   * handle function.
   * @param  {Function} getter store's current state
   * @param  {Function} callback executes when change is detected
   * @param  {object}  options optional, i.e. vm.$watch method
   * @return {Function} $watch
   */
  watch (getter, callback, options) {
    return this.vuex.watch(getter, callback, options)
  }

  /**
   * Subscribe to store mutations. The handler is called after every mutation and
   * receives the mutation descriptor and post-mutation state as arguments.
   * @param  {Function} handler callback
   * @returns {Function} callback
   */
  subscribe (handler) {
    return this.vuex.subscribe(handler)
  }

  /**
   * Get a property from the store using `getters`
   * @param  {string} key that needs to be updated
   * @return {mixed} returns the value of the updated key or an error log if key
   * is missing.
   */
  get (key) {
    if (typeof this.vuex.getters[key] === 'undefined') {
      return console.error(`You are trying to access an undefined getter "${key}" on your data store.`)
    }

    return this.vuex.getters[key]
  }

  /**
   * Set a property through an action on the store
   * @param {string} key that needs setting
   * @param {any} value the value passed
   * @return {Function} commit
   */
  set (key, value) {
    return this.commit(key, value)
  }

  /**
   * Load some data into the store from cache by key
   * @param {string} key in localStorage
   * @return {undefined} undefined
   */
  loadFromCache (key) {
    let value = JSON.parse(window.localStorage.getItem(key))
    if (value !== null) {
      this.set(key, value)
    }
  }

  /**
   * Map a new state to a module in the data store.
   * @param  {[type]} module   [description]
   * @param  {[type]} newState [description]
   * @return {[type]}          [description]
   */
  mapState (module, newState) {
    Object.keys(newState).forEach(key => {
      let name = `${module}/${key}`
      if (this.vuex['_mutations'][name] !== undefined) {
        this.set(name, newState[key])
      }
    })
  }
}

/**
 * Bootstrap getters and mutations on the store
 * @param  {object} modules list of modules with namespaces
 * @return {undefined} undefined does not return anything
 */
function bootstrapModules (modules) {
  Object.keys(modules).forEach(key => {
    bootstrapModule(modules[key])
    if (modules[key].modules) {
      bootstrapModules(modules[key].modules)
    }
  })
}

/**
 * Instantiates/maps getters, mutations and actions for each derived module.
 * @param  {object} module each module in the store
 * @return {[type]}        [description]
 */
function bootstrapModule (module) {
  if (!module.bootstrap) {
    return
  }

  bootstrap.setDefaults(module)

  module.bootstrap.forEach(type => {
    bootstrapType(type, module)
  })
}

/**
 * Execute the type of bootstrap to run.
 * @param  {string} type  The bootstrap type.
 * @return {undefined}
 */
function bootstrapType (type, module) {
  if (type === 'form') {
    return bootstrap.form(module)
  }

  if (type === 'table') {
    return bootstrap.table(module)
  }

  if (type === 'getters') {
    return bootstrap.getters(module)
  }

  if (type === 'mutations') {
    return bootstrap.mutations(module)
  }

  throw new Error('[Vuex Bootstrap] You are attempting to bootstrap a type that does not exist: ' + type)
}
