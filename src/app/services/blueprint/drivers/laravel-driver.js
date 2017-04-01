export default class AlgoliaBlueprintDriver {
  /**
   * Construct the Firebase Blueprint driver.
   * @param  {Blueprint} blueprint  The Blueprint model.
   * @return {FirebaseBlueprintDriver}  The driver.
   */
  constructor (blueprint) {
    this.blueprint = blueprint
    this.api = app.make('api')
  }

  /**
   * Set the model.
   * @param  {[type]} model [description]
   * @return {[type]}       [description]
   */
  set blueprint ({ model, location }) {
    this.model = model
    this.location = location
  }

  /**
   * Get the parameters to be sent with the request.
   * @return {object}  The params object.
   */
  get params () {
    let params = {}
    if (this.model.with) {
      params.with = this.model.with.join(',')
    }
  }

  /**
   * Fetch data from the database by id.
   * @param  {string} id  The id of the model to be accessed.
   * @return {Object}  The model with the corresponding id.
   */
  fetch (id) {
    return this.api.get(`${this.location}/${id}`, {
      params: this.params
    })
  }

  /**
   * Create a new model in the database.
   * @param  {Object} data  The data to be saved.
   * @return {undefined}
   */
  create (data) {
    return this.api.post(this.location, data)
  }

  /**
   * Update a model in algolia.
   * @param  {string} id  The id of the model
   * @param  {Object} data  The data to be saved.
   * @return {undefined}
   */
  update (id, data) {
    return this.api.patch(`${this.location}/${id}`, data)
  }

  /**
   * Delete a model from algolia.
   * @param  {string} id  The id of the model
   * @return {undefined}
   */
  delete (id) {
    return this.api.delete(`${this.location}/${id}`)
  }
}
