export default {

  /**
   * The driver used to retrieve the model.
   * @type {String}
   */
  driver: 'firebase',

  /**
   * If the driver supports loading relationships, define which
   * relationships you want loaded with the model.
   * @type {Array}
   */
  with: [
    'messages',
    'groups',
    'posts'
  ],

  /**
   * Set the relationship between this model and any children it owns.
   * @type {Array}
   */
  hasMany: [
    'messages',
    'posts'
  ],

  /**
   * Transform the request before it is sent.
   * @param  {object} data
   * @return {object}
   */
  transformRequest (data) {
    return data
  },

  /**
   * Transform the response before it hits the app.
   * @param  {object} data
   * @return {object}
   */
  transformResponse (data) {
    return data
  }

  /**
   * Register events for the model.
   * @type {Object}
   */
  // events: {

  //   /**
  //    * Fired when the model is fetched.
  //    * @var {string}  message  The event name.
  //    * @var {object}  data  The newly created product.
  //    */
  //   'fetched' (event, data) {
  //     console.log(`[Event Fired: ${event}] ${this.name} was fetched.`, data)
  //   },

  //   /**
  //    * Fired when the model is created.
  //    * @var {string}  message  The event name.
  //    * @var {object}  data  The newly created product.
  //    */
  //   'created' (event, data) {
  //     console.log(` [Event Fired: ${event}] ${this.name} was created.`, data)
  //   },

  //   /**
  //    * Fired when the model is created.
  //    * @var {string}  message  The event name.
  //    * @var {object}  data  The updated product.
  //    */
  //   'updated' (event, data) {
  //     console.log(`[Event Fired: ${event}] ${this.name} was updated.`, data)
  //   },

  //   /**
  //    * Fired when the model is created.
  //    * @var {string}  message  The event name.
  //    * @var {object}  data  The updated product.
  //    */
  //   'deleted' (event, id) {
  //     console.log(`[Event Fired: ${event}] ${this.name} was deleted.`, id)
  //   }
  // },

  /**
   * The configuration for creating a data store form module.
   * @type {Object}
   */
  // form: {
  //   namespace: 'profile/form',
  //   fields: {
  //     first_name: {
  //       default: '',
  //       validation: 'required|string',
  //       error: 'The first name is required.'
  //     },
  //     last_name: {
  //       default: '',
  //       validation: 'required|string',
  //       error: 'A last name is required.'
  //     }
  //   }
  // },

  /**
   * The configuration for creating a data store module.
   * @type {Object}
   */
  // module: {
  //   namespace: 'profile',
  //   bootstrap: [ 'getters', 'mutations' ],
  //   state: {
  //     'first_name': '',
  //     'last_name': ''
  //   }
  // }
}
