export default class FirebaseBlueprintDriver {
  /**
   * Construct the Firebase Blueprint driver.
   * @param  {Blueprint} blueprint  The Blueprint model.
   * @return {FirebaseBlueprintDriver}  The driver.
   */
  constructor (blueprint) {
    this.blueprint = blueprint
    this.location = blueprint.location
    this.firebase = app.make('firebase')
  }

  /**
   * Fetch data from the database by key.
   * @param  {string} key  The key of the model to be accessed.
   * @return {Object}  The model with the corresponding key.
   */
  fetch (key) {
    return new Promise((resolve, reject) => {
      this.ref(key).once('value').then(snapshot => {
        resolve({ id: snapshot.key, ...snapshot.val() })
      })
    })
  }

  /**
   * Return a reference to the give model or a key for the given model.
   * @param  {string} key  A child reference.
   * @return {Reference}  A firebase reference.
   */
  ref (key) {
    return key === undefined
      ? this.firebase.database().ref(this.location)
      : this.firebase.database().ref(`${this.location}/${key}`)
  }

  /**
   * Create a new model in the database.
   * @param  {Object} data  The data to be saved.
   * @return {Promise} Resolves with the newly created resource
   */
  create (data) {
    return this.ref().push(data).then(({ key }) => this.fetch(key))
  }
}
