export default class AlgoliaBlueprintDriver {
  /**
   * Construct the Firebase Blueprint driver.
   * @param  {Blueprint} blueprint  The Blueprint model.
   * @return {FirebaseBlueprintDriver}  The driver.
   */
  constructor (blueprint) {
    this.blueprint = blueprint
    this.location = blueprint.location
    this.algolia = app.make('algolia')
  }

  /**
   * Fetch data from the database by id.
   * @param  {string} id  The id of the model to be accessed.
   * @return {Object}  The model with the corresponding id.
   */
  fetch (id) {
    return new Promise((resolve, reject) => {
      this.algolia.initIndex(this.location).getObject(id, (errorMessage, data) => {
        if (errorMessage) {
          error(errorMessage, 'AlgoliaBlueprintDriver')
          reject(errorMessage)
        } else {
          resolve(data)
        }
      })
    })
  }

  /**
   * Create a new model in the database.
   * @param  {Object} data  The data to be saved.
   * @return {undefined}
   */
  create (data) {
    error('The create method is not yet implemented.', 'AlgoliaBlueprintDriver')
  }
}
