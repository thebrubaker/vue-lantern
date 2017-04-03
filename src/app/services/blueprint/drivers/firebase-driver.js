export default class FirebaseBlueprintDriver {
  /**
   * Construct the Firebase Blueprint driver.
   * @param  {Blueprint} blueprint  The Blueprint model.
   * @return {FirebaseBlueprintDriver}  The driver.
   */
  constructor (blueprint) {
    this.blueprint = blueprint
    this.firebase = app.make('firebase')
  }

  /**
   * Set the model.
   * @param  {[type]} model [description]
   * @return {[type]}       [description]
   */
  set blueprint ({ model, location }) {
    this.model = model
    this.relations = model.with || []
    this.location = location
  }

  /**
   * Fetch data from the database by key.
   * @param  {string} key  The key of the model to be accessed.
   * @return {Promise}  A promise that resolves with the model.
   */
  fetch (key) {
    return this.relations.length
      ? this.fetchWithRelations(key)
      : this.fetchReference(key)
  }

  /**
   * Fetch data from the database by key.
   * @param  {string} key  The key of the model to be accessed.
   * @return {Promise}  A promise that resolves with the model.
   */
  fetchReference (key) {
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
   * Fetch a model and any relations on that model
   * @param  {string} key  The key to retrieve.
   * @return {Promise}  A promise that resolves all requests.
   */
  fetchWithRelations (key) {
    return Promise.all(this.fetchRelations(key)).then(results => {
      return Promise.resolve(this.mapRelations(results))
    })
  }

  /**
   * Map the results of a request.
   * @param  {array} results  An array where index[0] is the model result, and
   * the remaining indices are the relationships.
   * @return {Object}  The mapped results.
   */
  mapRelations (results) {
    return this.relations.reduce((carry, relation, key) => {
      carry[relation] = results[key + 1]
      return carry
    }, results[0])
  }

  /**
   * Fetch the model and it's relations by a shared key
   * @param  {string} key  The key shared by all models
   * @return {array}  An array of promises.
   */
  fetchRelations (key) {
    return this.relations.reduce((carry, relation) => {
      carry.push(app.model(relation).fetch(key))
      return carry
    }, [this.fetchReference(key)])
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
