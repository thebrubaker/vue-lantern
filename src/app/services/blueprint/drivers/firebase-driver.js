export default class FirebaseBlueprintDriver {
  /**
   * Construct the Firebase Blueprint driver.
   * @param  {Blueprint} blueprint  The Blueprint model.
   * @return {FirebaseBlueprintDriver}  The driver.
   */
  constructor (blueprint) {
    this.blueprint = blueprint
    this.location = blueprint.config.location
    this.firebase = app.make('firebase')
  }

  /**
   * Fetch data from the database by key.
   * @param  {string} key  The key of the model to be accessed.
   * @return {Promise}  A promise that resolves with the model.
   */
  fetch (key) {
    return new Promise((resolve, reject) => {
      this.ref(key).once('value').then(snapshot => {
        if (!snapshot.val()) {
          reject(`${this.location}/${key} does not exist.`)
        }
        resolve(snapshot.val())
      })
    })
  }

  /**
   * Return a reference to the give model or a key for the given model.
   * @param  {string} key  A child reference.
   * @return {Reference}  A firebase reference.
   */
  ref (location) {
    return location === undefined
      ? this.firebase.database().ref(this.location)
      : this.firebase.database().ref(`${this.location}/${location}`)
  }

  /**
   * Gets a Reference for the location at the specified relative path.
   * @param  {[type]} path [description]
   * @return {[type]}      [description]
   */
  child (location) {
    return this.ref().child(location)
  }

  /**
   * Save a newly created key to it's parent relationship.
   * @param  {string} key  The new key.
   * @param  {Blueprint} parent  The parent blueprint.
   * @return {Promise}  A promise that resolves when everything has been saved.
   */
  saveParentRelationship (key, parent) {
    return Promise.all([
      this.ref(key).child(parent.config.location).set(parent.id),
      this.firebase.database()
        .ref(parent.config.location)
        .child(parent.id)
        .child(this.location)
        .child(key)
        .set(true)
    ])
  }

  /**
   * Create a new model in the database.
   * @param  {Object} data  The data to be saved.
   * @return {Promise} Resolves with the newly created resource
   */
  create (data) {
    let parent = this.blueprint.config.parent
    return this.ref().push(data).then(({ key }) => {
      this.saveParentRelationship(key, parent)
      return this.fetch(key).then(attributes => {
        return Promise.resolve({ id: key, attributes })
      })
    })
  }

  /**
   * Update a model in the database.
   * @param  {string} key  The key to be saved.
   * @param  {Object} data  The data to be saved.
   * @return {Promise} Resolves with the newly created resource
   */
  update (key, updatedData) {
    return this.fetch(key)
      .then(data => this.ref(key).set({ ...data, ...updatedData }))
      .then(() => this.fetch(key))
  }

  /**
   * Delete a model by it's key.
   * @param  {string} key  The key of the model to be accessed.
   * @return {Promise}  A promise that resolves with void
   */
  delete (key) {
    return this.fetch(key).then(() => {
      return this.ref(key).remove()
    })
  }
}
