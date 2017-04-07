import Blueprint from './blueprint'

export default class ModelService {

  /**
   * Construct the service.
   * @param  {Array} models  A list of models to be registered.
   * @return {ModelService}  The Model Service.
   */
  constructor (models, config) {
    this.config = config
    this.models = this.mapModels(models)
  }

  /**
   * Set the default properties on each model.
   * @param  {array} models  The models to register
   * @return {Object}  The mapped models.
   */
  mapModels (models) {
    return Object.keys(models).reduce((carry, key) => {
      carry[key] = {
        name: models[key].name || key.split('/').pop(),
        driver: models[key].driver || this.config.driver,
        namespace: models[key].namespace || key,
        location: models[key].location || key.split('/').pop(),
        with: models[key].with || [],
        hasMany: models[key].hasMany || [],
        belongsTo: models[key].belongsTo || [],
        id: models[key].id || null,
        attributes: models[key].attributes || {},
        transformRequest: models[key].transformRequest || function (data) { return data },
        transformResponse: models[key].transformResponse || function (data) { return data }
      }
      return carry
    }, {})
  }

  /**
   * Create a new Blueprint instance from a model.
   * @param  {string} name  The type of model to create.
   * @param  {boolean} loadRelations  True if you want to load relations on the model.
   * @return {Blueprint}  The blueprint of that model.
   */
  create (name, loadRelations) {
    if (this.models[name] === undefined) {
      throw new Error(`You are trying to create an invalid model: ${name}`)
    }

    return new Blueprint(this.models[name], loadRelations)
  }

  /**
   * Loop through each model and execute a callback.
   * @param  {Function} callback  The callback for registration.
   * @return {undefined}
   */
  register (callback) {
    Object.keys(this.blueprints).forEach(key => {
      callback(this.blueprints[key])
    })
  }

  /**
   * Load a model by namespace.
   * @param  {string} namespace  The namespace of the model.
   * @return {Blueprint}  The requested model.
   */
  load (namespace) {
    if (this.blueprints[namespace] === undefined) {
      return error(`You are trying to access a model that does not exist: ${namespace}`, 'Model')
    }

    return this.blueprints[namespace]
  }

  /**
   * Boot the models configuration into an array of Blueprints.
   * @param  {object} models  The models configuration.
   * @return {object}  A models object.
   */
  createBlueprints (models) {
    return Object.keys(models).reduce((carry, key) => {
      if (this.hasConflict(models[key])) {
        throw new Error('You are trying to register a model in the data store that conflicts with another model.')
      }
      carry[key] = new Blueprint({ namespace: key, ...models[key] })
      return carry
    }, {})
  }

  /**
   * Check if there is a conflict registering a module in the data store.
   * @param  {Model}  model  The model to be checked.
   * @return {Boolean} Returns true if there is a conflict.
   */
  hasConflict (model) {
    if (this.conflicts[model.module.namespace]) {
      return true
    }
    if (this.conflicts[model.form.namespace]) {
      return true
    }
    this.conflicts[model.module.namespace] = true
    this.conflicts[model.form.namespace] = true
    return false
  }

  /**
   * Boot all models into the application.
   * @return {undefined}
   */
  boot () {
    Object.keys(this.blueprints).forEach(key => this.blueprints[key].boot())
  }
}
