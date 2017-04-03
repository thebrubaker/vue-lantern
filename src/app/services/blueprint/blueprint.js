import FirebaseDriver from './drivers/firebase-driver'
import AlgoliaDriver from './drivers/algolia-driver'
import LaravelDriver from './drivers/laravel-driver'
import { namespaceKeys } from 'utilities'

export default class Blueprint {

  /**
   * Constructor for the Blueprint model.
   * @param  {object} config  The config for the blueprint.
   * @param  {object} driver  The driver for the blueprint.
   * @return {Blueprint}  The Blueprint model.
   */
  constructor (config, attributes = {}) {
    this._config = this.configure(config)
    this._attributes = attributes
    this._drivers = {
      'firebase': new FirebaseDriver(this),
      'algolia': new AlgoliaDriver(this),
      'laravel': new LaravelDriver(this)
    }
    this._driver = config.driver || 'no driver provided'
  }

  /**
   * Create a relationship with a blueprint.
   * @param  {Blueprint} blueprint  The blueprint.
   * @return {Blueprint}  Return itself.
   */
  belongsTo (blueprint) {
    this._selectedDriver.belongsTo(blueprint)

    return this
  }

  /**
   * When a blueprint is coerced into a string, return it's attributes.
   * @return {object}  The attributes of the model.
   */
  toString () {
    return this._attributes
  }

  /**
   * Get the attributes for the blueprint.
   * @return {object}  The attributes.
   */
  getAttributes () {
    return this._attributes
  }

  /**
   * Return the attributes as JSON
   * @return {string}  The attributes as JSON
   */
  toJson (replacer, space) {
    return JSON.stringify(this._attributes, replacer, space)
  }

  /**
   * Set the configuration of the blueprint, with some defaults added.
   * @param  {Model} config  The model configuration for the blueprint.
   * @return {undefined}
   */
  configure (config) {
    return {
      name: config.name,
      namespace: config.namespace,
      location: config.location,
      with: config.with,
      id: config.id,
      transformRequest: config.transformRequest,
      transformResponse: config.transformResponse
    }
  }

  /**
   * Change the driver for the blueprint.
   * @param  {string} type  The type of driver.
   * @return {Blueprint}  A new instance of the current blueprint with the newly selected driver.
   */
  get _driver () {
    return function (type) {
      if (this._drivers[type] === undefined) {
        return error(`The driver selected is not valid: '${type}'`, 'Blueprint')
      }

      return new Blueprint(this._config, type)
    }
  }

  /**
   * Set the selected driver from those that are available.
   * @param  {string} type  The driver to select.
   * @return {FirebaseDriver|AlgoliaDriver}  The driver implementation.
   */
  set _driver (type) {
    if (this._drivers[type] === undefined) {
      return error(`The driver selected is not valid: '${type}'`, 'Blueprint')
    }

    this._selectedDriver = this._drivers[type]
  }

  /**
   * An alias for create
   * @param  {object} data  The data to push
   * @return {Promise}  A promise that resolves with the response
   */
  push (data) {
    return this._selectedDriver.create(data)
  }

  /**
   * Push a relation onto the blueprint query.
   * @param  {string} relation  The relation.
   * @return {Blueprint}  The blueprint.
   */
  with (relation) {
    if (this._config.with.indexOf(relation) === -1) {
      this._config.with.push(relation)
    }

    return this
  }

  /**
   * Fill the attributes of the blueprint.
   * @param  {object} attributes  The attributes to fill.
   * @return {Blueprint}  This blueprint.
   */
  fill (attributes) {
    this._attributes = this._config.transformResponse(attributes)

    return this
  }

  /**
   * Fetch a specific model by it's id.
   * @param  {string} id  The model's id.
   * @return {Promise}  A promise that resolves with the model.
   */
  fetch (id) {
    return this._selectedDriver.fetch(id).then(attributes => {
      this.fill(attributes)
      app.events.fire(`${this._config.name}.fetched`, this)
      return Promise.resolve(this)
    })
  }

  /**
   * Create a new model.
   * @param  {object} newData  The data to write.
   * @return {Promise}  A promise that resolves with the model.
   */
  create (data) {
    let payload = this._config.transformRequest(data)
    return this._selectedDriver.create(payload).then(({ key, attributes }) => {
      this.key = key
      this.fill(attributes)
      app.events.fire(`${this._config.name}.created`, this)
      return Promise.resolve(this)
    })
  }

  /**
   * Create a new model.
   * @param  {string} id  The model's id.
   * @param  {object} newData  The data to write.
   * @return {Promise}  A promise that resolves with the model.
   */
  update (id, data) {
    let payload = this._config.transformRequest(data)
    return this._selectedDriver.update(id, payload).then(attributes => {
      this.fill(attributes)
      app.events.fire(`${this._config.name}.updated`, this)
      return Promise.resolve(this)
    })
  }

  /**
   * Delete a model.
   * @param  {string} id  The model's id.
   * @return {Promise}  A promise that resolves with true.
   */
  delete (id) {
    return this._selectedDriver.delete(id).then(() => {
      app.events.fire(`${this._config.name}.deleted`, id)
      return Promise.resolve(true)
    })
  }

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
}
