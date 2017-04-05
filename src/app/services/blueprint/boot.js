/**
 * Boot the blueprint into the application.
 * @return {undefined}
 */
boot () {
  // if (this._config.events) this.registerEvents(this._config.events)
  // if (this._config.module) this.registerModule(this._config.module)
  // if (this._config.form) this.registerForm(this._config.form)
}

/**
 * Register all events configured on the model.
 * @return {undefined}
 */
registerEvents (events) {
  app.events.registerChannel(namespaceKeys(this._config.name, events), this)
}

/**
 * Register a module with the data store service.
 * @param  {Object} module  The configuration for the module.
 * @return {undefined}
 */
registerModule (module) {
  try {
    this.createStoreModule(module)
  } catch (exception) {
    this.throwNamespaceError(module, exception)
  }
}

/**
 * Register a module with the data store service.
 * @param  {Object} module  The configuration for the module.
 * @return {undefined}
 */
registerForm (form) {
  let module = { namespace: form.namespace, bootstrap: ['form'], form: form.fields }
  try {
    this.createStoreModule(module)
  } catch (exception) {
    this.throwNamespaceError(module, exception)
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
    module.namespace = this._config.namespace
  }

  if (module.namespace && Array.isArray(module.namespace)) {
    return app.store.registerModule(module.namespace, module)
  }

  return app.store.registerModule(module.namespace.split('/'), module)
}

/**
 * Throw an error if the user tries to register under a namespace that doesn't exist.
 * @param  {string} exception  Stack trace exception.
 * @return {undefined}
 */
throwNamespaceError (module, exception) {
  error(`You may be trying to register a model in the store under a module that does not exist: ${module.namespace}`, 'Blueprint')
  throw new Error(exception)
}