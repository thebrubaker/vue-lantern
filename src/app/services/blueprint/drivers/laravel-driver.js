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
  * Get the ID from the blueprint.
  * @return {string}  The id / key of the model.
  */
  get id () {
    return this.blueprint.config.id
  }

  /**
  * Get the parent from the blueprint.
  * @return {string}  The id / key of the model.
  */
  get parent () {
    return this.blueprint.config.parent
  }

  /**
  * Get the location from the blueprint.
  * @return {string}  The location.
  */
  get location () {
    return this.blueprint.config.location
  }

  /**
  * Get the location from the blueprint.
  * @return {string}  The location.
  */
  get with () {
    return this.blueprint.config.with
  }

  /**
   * Get the parameters to be sent with the request.
   * @return {object}  The params object.
   */
  get params () {
    let params = {}
    if (this.with) {
      params.with = this.with.join(',')
    }
    return params
  }

  /**
   * Fetch data from the database by id.
   * @param  {string} id  The id of the model to be accessed.
   * @return {Object}  The model with the corresponding id.
   */
  fetch (id) {
    return this.api.get(`${this.location}/${id}`, {
      params: this.params
    }).then(response => {
      return Promise.resolve(response.data)
    })
  }

  /**
   * Create a new model in the database.
   * @param  {Object} data  The data to be saved.
   * @return {undefined}
   */
  create (data) {
    let parent = this.parent
    return this.api.post(this.location, data).then(response => {
      if (parent) {
        this.saveParentRelationship(response.data.id, parent)
      }
      return Promise.resolve({ id: response.data.id, attributes: response.data })
    })
  }

  /**
   * Save a parent relationship
   * @param  {string} id  This model's id
   * @param  {Blueprint} parent  The parent blueprint.
   * @return {Promise}  A promise that resolves with the saved relationship
   */
  saveParentRelationship (id, parent) {
    let path = [this.parent.config.location, this.parent.config.id, this.location, id].join('/')
    return this.api.post(path).then(response => {
      return Promise.resolve(response.data)
    })
  }

  /**
   * Update a model in algolia.
   * @param  {string} id  The id of the model
   * @param  {Object} data  The data to be saved.
   * @return {undefined}
   */
  update (id, data) {
    return this.api.patch(`${this.location}/${id}`, data).then(response => {
      return Promise.resolve(response.data)
    })
  }

  /**
   * Delete a model from algolia.
   * @param  {string} id  The id of the model
   * @return {undefined}
   */
  delete (id) {
    return this.api.delete(`${this.location}/${id}`).then(response => {
      return Promise.resolve(response.data)
    })
  }
}
