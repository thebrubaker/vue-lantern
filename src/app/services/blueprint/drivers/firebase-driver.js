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
   * Return a new key from the direbase database.
   * @param  {string} location  A reference to a location.
   * @return {string} The newly created key.
   */
  newKey (location) {
    return this.firebase.database().ref(location).push().key
  }

  /**
   * Fetch data from the database by key.
   * @param  {string} id  The key of the model to be accessed.
   * @return {Object}  The model with the corresponding key.
   */
  fetch (key) {
    return new Promise((resolve, reject) => {
      this.firebase.database().ref(`${this.location}/${key}`).once('value').then(snapshot => {
        resolve(snapshot.val())
      }).catch(error => {
        reject(error)
      })
    })
  }

  /**
   * Create a new model in the database.
   * @param  {Object} data  The data to be saved.
   * @return {undefined}
   */
  create (data) {
    return this.firebase.database().ref(`${this.location}`).push(data)
  }
}
