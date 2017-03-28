export default {
  /**
   * The driver to use for search.
   * @type {string}
   */
  driver: 'algolia',

  /**
   * The drivers available for the search service.
   * @type {object}
   */
  drivers: {
    algolia: {
      id: env('ALGOLIA_ID'),
      key: env('ALGOLIA_KEY')
    },
    laravel: {}
  }
}
