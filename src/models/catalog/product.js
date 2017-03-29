export default {

  /**
   * The driver used to retrieve the model.
   * @type {String}
   */
  driver: 'api',

  /**
   * The name of the model.
   * @type {String}
   */
  name: 'product',

  /**
   * The location of the model.
   * @type {String}
   */
  location: 'product',

  /**
   * If the driver supports loading relationships, list which
   * relationships you want loaded.
   * @type {Array}
   */
  with: [
    'inventory'
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
  },

  /**
   * Register events for the model.
   * @type {Object}
   */
  events: {

    /**
     * Fired when the model is created.
     * @var {string}  message  The event name.
     * @var {object}  data  The newly created product.
     */
    'created' (event, data) {
      console.log(`${this.name} was created.`, data)
    },

    /**
     * Fired when the model is created.
     * @var {string}  message  The event name.
     * @var {object}  data  The updated product.
     */
    'updated' (event, data) {
      console.log(`${this.name} was updated.`, data)
    },

    /**
     * Fired when the model is created.
     * @var {string}  message  The event name.
     * @var {object}  data  The updated product.
     */
    'deleted' (event, id) {
      console.log(`${this.name} was deleted.`, id)
    }
  },

  /**
   * The configuration for making a form in the data store for this model.
   * @type {Object}
   */
  form: {
    namespace: 'catalog/product/form',
    fields: {
      name: {
        default: '',
        validation: 'required|string',
        error: 'The Name is required.'
      },
      base_sku: {
        default: '',
        validation: 'required|string',
        error: 'The Base SKU is required.'
      },
      full_price: {
        default: '',
        validation: 'required|number',
        error: 'A full price is required.'
      },
      discount_price: {
        default: '',
        validation: 'number'
      }
    }
  },

  /**
   * The configuration for create a data store module.
   * @type {Object}
   */
  module: {
    namespace: 'catalog/product',
    bootstrap: [ 'getters', 'mutations' ],
    state: {
      'name': '',
      'thumbnail': '',
      'base_sku': '',
      'full_price': '',
      'discount_price': '',
      'inventory': ''
    }
  }
}
