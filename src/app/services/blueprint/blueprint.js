import { namespaceKeys } from 'utilities'

export default class Blueprint {

  /**
   * Constructor for the Blueprint model.
   * @param  {object} options  The options for the blueprint.
   * @return {Blueprint}  The Blueprint model.
   */
  constructor (options) {
    Object.assign(this, options)
  }

  /**
   * Boot the blueprint into the application.
   * @return {undefined}
   */
  boot () {
    if (this.events) this.registerEvents(this.events)
    if (this.module) this.registerModule(this.module)
    if (this.form) this.registerForm(this.form)
  }

  /**
   * Register all events configured on the model.
   * @return {undefined}
   */
  registerEvents (events) {
    this.app.events.registerChannel(namespaceKeys(this.name, events), this)
  }

  /**
   * Register a module with the data store service.
   * @param  {Object} module  The configuration for the module.
   * @return {undefined}
   */
  registerModule (module) {
    this.app.store.bootstrap.module(module)
    try {
      this.createStoreModule(module)
    } catch (exception) {
      throwNamespaceError(exception)
    }
  }

  /**
   * Register a module with the data store service.
   * @param  {Object} module  The configuration for the module.
   * @return {undefined}
   */
  registerForm (form) {
    let module = { namespace: form.namespace, bootstrap: ['form'], form: form.fields }
    this.app.store.bootstrap.module(module)
    try {
      this.createStoreModule(module)
    } catch (exception) {
      throwNamespaceError(exception)
    }
  }

  /**
   * Create a module in the data store.
   * @param  {Object} module  The configuration for the module.
   * @return {undefined}
   */
  createStoreModule (module) {
    module.namespaced = true

    if (module.namespace === undefined) {
      module.namespace = this.namespace
    }

    if (module.namespace && Array.isArray(module.namespace)) {
      return this.app.store.registerModule(module.namespace, module)
    }

    return this.app.store.registerModule(module.namespace.split('/'), module)
  }
}

/**
 * Throw an error if the user tries to register under a namespace that doesn't exist.
 * @param  {string} exception  Stack trace exception.
 * @return {undefined}
 */
function throwNamespaceError (exception) {
  error(`You may be trying to register a model in the store under a module that does not exist: ${this.module.namespace}`, 'Blueprint')
  throw new Error(exception)
}
