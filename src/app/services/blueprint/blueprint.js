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
  constructor (config, relations = true) {
    this.config = this.configure(config)
    if (relations) this.setRelations()
    this._drivers = {
      'firebase': new FirebaseDriver(this),
      'algolia': new AlgoliaDriver(this),
      'laravel': new LaravelDriver(this)
    }
    this._driver = config.driver || 'no driver provided'
  }

  /**
   * Set the relations on a model.
   */
  setRelations () {
    this.config.hasMany.forEach(relation => {
      this[relation] = app.model(relation, false).belongsTo(this)
    })
  }

  /**
   * Link two blueprints together
   * @param  {Blueprint} blueprint  The blueprint to link to.
   * @return {Promise}  A promise that resolves with both blueprints.
   */
  link (blueprint) {
    return this._selectedDriver.link(blueprint)
  }

  /**
   * Set that the model belongs to another model as a relationship.
   * @param  {Blueprint} blueprint  The blueprint that is the parent.
   * @return {Blueprint}  This blueprint.
   */
  belongsTo (blueprint) {
    this.config.parent = blueprint

    return this
  }

  /**
   * Get the attributes for the blueprint.
   * @return {object}  The attributes.
   */
  data () {
    return this.config.attributes
  }

  /**
   * Return the attributes as JSON
   * @return {string}  The attributes as JSON
   */
  toJson (replacer, space) {
    return JSON.stringify(this.config.attributes, replacer, space)
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
      driver: config.driver,
      location: config.location,
      with: config.with,
      hasMany: config.hasMany,
      parent: null,
      children: [],
      id: config.id,
      transformRequest: config.transformRequest,
      transformResponse: config.transformResponse
    }
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
    if (this.config.with.indexOf(relation) === -1) {
      this.config.with.push(relation)
    }

    return this
  }

  /**
   * Fill the attributes of the blueprint.
   * @param  {object} attributes  The attributes to fill.
   * @return {Blueprint}  This blueprint.
   */
  fill (attributes) {
    this.config.attributes = this.config.transformResponse(attributes)

    return this
  }

  /**
   * Fetch a specific model by it's id.
   * @param  {string} id  The model's id.
   * @return {Promise}  A promise that resolves with the model.
   */
  fetch (id) {
    return this._selectedDriver.fetch(id).then(attributes => {
      this.config.id = id
      this.fill(attributes)
      app.events.fire(`${this.config.name}.fetched`, this)
      return Promise.resolve(this)
    })
  }

  /**
   * Fetch a specific model by it's id.
   * @param  {string} id  The model's id.
   * @return {Promise}  A promise that resolves with the model.
   */
  populate (id) {
    return this._selectedDriver.populate(id).then(attributes => {
      this.config.id = id
      this.fill(attributes)
      app.events.fire(`${this.config.name}.fetched`, this)
      return Promise.resolve(this)
    })
  }

  /**
   * Create a new model.
   * @param  {object} newData  The data to write.
   * @return {Promise}  A promise that resolves with the model.
   */
  create (data) {
    let payload = this.config.transformRequest(data)
    return this._selectedDriver.create(payload).then(({ id, attributes }) => {
      let blueprint = new Blueprint(this.config)
      blueprint.config.id = id
      blueprint.fill(attributes)
      app.events.fire(`${blueprint.config.name}.created`, blueprint)
      return Promise.resolve(blueprint)
    })
  }

  /**
   * Create a new model.
   * @param  {string} id  The model's id.
   * @param  {object} newData  The data to write.
   * @return {Promise}  A promise that resolves with the model.
   */
  update (id, data) {
    let payload = this.config.transformRequest(data)
    return this._selectedDriver.update(id, payload).then(attributes => {
      this.config.id = id
      this.fill(attributes)
      app.events.fire(`${this.config.name}.updated`, this)
      return Promise.resolve(this)
    })
  }

  /**
   * Delete a model.
   * @param  {string} id  The model's id.
   * @return {Promise}  A promise that resolves with true.
   */
  delete (id) {
    return this._selectedDriver.delete(id || this.config.id).then(() => {
      this.config.id = id
      app.events.fire(`${this.config.name}.deleted`, id)
      return Promise.resolve(true)
    })
  }

  /**
   * When a blueprint is coerced into a string, return it's attributes.
   * @return {object}  The attributes of the model.
   */
  toString () {
    return this.config.attributes
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

      return new Blueprint(this.config)
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
}
