import AlgoliaSearchService from 'src/app/services/AlgoliaSearchService'
import config from 'config/search'
import algoliasearch from 'algoliasearch'

describe('AlgoliaSearchService.js', () => {
  it('should configure algolia on construction.', () => {
    let search = new AlgoliaSearchService(config)
    let algolia = algoliasearch(config.id, config.key)
    expect(search.config).to.equal(config)
    expect(search.service).to.deep.equal(algolia)
  })

  it('should search algolia across multiple indices', () => {
    let service = new AlgoliaSearchService(config)
    sinon.spy(service, 'searchIndices')
    service.search(['foo', 'bar'], 'query')
    expect(service.searchIndices.called).to.be.true
  })

  it('should search algolia on a single index', () => {
    let service = new AlgoliaSearchService(config)
    sinon.spy(service, 'searchIndex')
    service.search('foo', 'query')
    expect(service.searchIndex.called).to.be.true
  })

  it('should console log an error if the index is the wrong type', () => {
    let service = new AlgoliaSearchService(config)
    sinon.spy(console, 'error')
    service.search(true, 'query')
    expect(console.error.called).to.be.true
  })

  it('should return a promise when searching an index', () => {
    let algolia = new AlgoliaSearchService(config)
    let promise = algolia.search('foo', 'query')
    expect(promise).instanceof(Promise)
  })

  it('should return a promise when searching indices', () => {
    let algolia = new AlgoliaSearchService(config)
    let promise = algolia.search(['foo', 'bar'], 'query')
    expect(promise).instanceof(Promise)
  })

  it('should map indices', () => {
    let algolia = new AlgoliaSearchService(config)
    let mapped = algolia.mapIndices(['foo', 'bar'], 'query', { foo: 'bar' })
    expect(mapped).to.deep.equal([
      {
        indexName: 'foo',
        query: 'query',
        params: {
          foo: 'bar'
        }
      },
      {
        indexName: 'bar',
        query: 'query',
        params: {
          foo: 'bar'
        }
      }
    ])
  })
})
