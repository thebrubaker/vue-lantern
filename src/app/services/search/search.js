import AlgoliaSearchDriver from './algolia-search-driver'
import LaravelSearchDriver from './laravel-search-driver'

export default class SearchService {
  /**
   * Configure the algolia search service.
   * @param  {object} config The configuration for algolia.
   * @return {AlgoliaSearchService} The service.
   */
  constructor (container, config) {
    this.drivers = {
      algolia: new AlgoliaSearchDriver(config),
      laravel: new LaravelSearchDriver(container.api, config)
    }
    switch (config.driver) {
      case 'algolia':
        this.selected_driver = this.drivers.algolia
        break
      case 'laravel':
        this.selected_driver = this.drivers.laravel
        break
      default: error(`The driver you selected is not supported: ${config('search.driver')}`, 'Search')
    }
  }

  /**
   * Select a specific driver for performing search.
   * @param  {string} name  The name of the driver
   * @return {AlgoliaSearchDriver|LaravelSearchDriver}  The specified search driver.
   */
  driver (name) {
    if (this.drivers[name] === undefined) {
      return error(`${name} is not a valid search driver. Perhaps you misspelled the driver?`, 'SearchService')
    }

    return this.drivers[name]
  }

  /**
   * Send a search query to Algolia.
   * @param  {string} query The query to be searched.
   * @param  {array} config The indices to be searched.
   * @return {Promise} A promise that resolves with the response from Algolia.
   */
  search (query, config) {
    return this.selected_driver.search(query, config)
  }

  /**
   * Search many indices using a single query
   * @param  {array} indices An array of indices to search.
   * @param  {string} query   The query to be searched.
   * @param  {object} params  An object of configuration for the search.
   * @return {Promise} A promise that resolves with the response from Algolia.
   */
  searchIndices (indices, query, params = {}) {
    return this.selected_driver.searchIndices(indices, query, params)
  }

  /**
   * Search an index using a query.
   * @param  {string} index The index to be searched.
   * @param  {string} query   The query to be searched.
   * @param  {object} params  An object of configuration for the search.
   * @return {Promise} A promise that resolves with the response from Algolia.
   */
  searchIndex (index, query, params = {}) {
    return this.selected_driver.searchIndex(index, query, params)
  }
}
