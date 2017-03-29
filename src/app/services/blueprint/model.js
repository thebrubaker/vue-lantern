import Blueprint from './blueprint'

export default class ModelService {

  /**
   * Construct the service.
   * @param  {Lantern} app  The Lantern application.
   * @param  {Array} models  A list of models to be registered.
   * @return {ModelService}  The Model Service.
   */
  constructor (app, models) {
    this.app = app
    this.config = models
    this.models = this.boot(models)
  }

  /**
   * Return all models.
   * @return {Array}  An array of all models.
   */
  all () {
    return this.models
  }

  /**
   * Loop through each model and execute a callback.
   * @param  {Function} callback  The callback for registration.
   * @return {undefined}
   */
  register (callback) {
    Object.keys(this.models).forEach(key => {
      callback(this.models[key])
    })
  }

  /**
   * Load a model by namespace.
   * @param  {string} namespace  The namespace of the model.
   * @return {Blueprint}  The requested model.
   */
  load (namespace) {
    return this.models[namespace]
  }

  /**
   * Boot the models configuration into an array of Blueprints.
   * @param  {object} models  The models configuration.
   * @return {object}  A models object.
   */
  boot (models) {
    return Object.keys(models).reduce((carry, key) => {
      carry[key] = new Blueprint(key, models[key])
      return carry
    }, {})
  }
}
