export default {

  /**
   * The driver used to retrieve the model.
   * @type {String}
   */
  driver: 'firebase',

  /**
   * Set the relationship between this model and any children it owns.
   * @type {Array}
   */
  hasMany: [
    'users'
  ]
}
