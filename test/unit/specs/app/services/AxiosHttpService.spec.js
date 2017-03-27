import AxiosHttpService from 'src/app/services/AxiosHttpService'
import axios from 'axios'

describe('AxiosHttpService.js', () => {
  it('should set axios as the service and configure the service.', () => {
    const config = {
      test: true
    }
    let http = new AxiosHttpService(config)
    expect(http.service).to.equal(axios)
    expect(http.config).to.equal(config)
  })

  it('should set the service defaults, such as timeout and headers', () => {
    const defaults = {
      timeout: 1234,
      headers: {
        common: {
          Accept: 'application/json'
        }
      }
    }
    let http = new AxiosHttpService()
    http.setDefaults(defaults)
    expect(http.service.defaults.timeout).to.equal(defaults.timeout)
    expect(http.service.defaults.headers.common.Accept).to.equal(defaults.headers.common.Accept)
  })

  it('should make requests for all HTTP methods', () => {
    let http = new AxiosHttpService()
    let config = { test: true }
    let url = 'http://testing.url'
    let data = { payload: true }

    sinon.spy(http.service, 'request')
    sinon.spy(http.service, 'create')
    sinon.spy(http.service, 'get')
    sinon.spy(http.service, 'delete')
    sinon.spy(http.service, 'head')
    sinon.spy(http.service, 'post')
    sinon.spy(http.service, 'put')
    sinon.spy(http.service, 'patch')

    http.request(config)
    expect(http.service.request.called).to.be.true
    expect(http.service.request.args[0][0]).to.equal(config)

    http.create(config)
    expect(http.service.create.called).to.be.true
    expect(http.service.create.args[0][0]).to.equal(config)

    http.get(url, config)
    expect(http.service.get.called).to.be.true
    expect(http.service.get.args[0][0]).to.equal(url)
    expect(http.service.get.args[0][1]).to.equal(config)

    http.delete(url, config)
    expect(http.service.delete.called).to.be.true
    expect(http.service.delete.args[0][0]).to.equal(url)
    expect(http.service.delete.args[0][1]).to.equal(config)

    http.head(url, config)
    expect(http.service.head.called).to.be.true
    expect(http.service.head.args[0][0]).to.equal(url)
    expect(http.service.head.args[0][1]).to.equal(config)

    http.post(url, data, config)
    expect(http.service.post.called).to.be.true
    expect(http.service.post.args[0][0]).to.equal(url)
    expect(http.service.post.args[0][1]).to.equal(data)
    expect(http.service.post.args[0][2]).to.equal(config)

    http.put(url, data, config)
    expect(http.service.put.called).to.be.true
    expect(http.service.put.args[0][0]).to.equal(url)
    expect(http.service.put.args[0][1]).to.equal(data)
    expect(http.service.put.args[0][2]).to.equal(config)

    http.patch(url, data, config)
    expect(http.service.patch.called).to.be.true
    expect(http.service.patch.args[0][0]).to.equal(url)
    expect(http.service.patch.args[0][1]).to.equal(data)
    expect(http.service.patch.args[0][2]).to.equal(config)
  })

  it('should have a method to configure a new request', () => {
    let http = new AxiosHttpService()
    let config = { test: true }

    sinon.spy(http, 'create')

    http.configure(config)

    expect(http.create.called).to.be.true
    expect(http.create.args[0][0]).to.equal(config)
  })

  it('should resolve an array of promises by passing them to the service all method', () => {
    let http = new AxiosHttpService()
    let promises = [
      { test: true }
    ]

    sinon.spy(http.service, 'all')

    http.all(promises)

    expect(http.service.all.called).to.be.true
    expect(http.service.all.args[0][0]).to.equal(promises)
  })

  it('should use request and response middleware', () => {
    let http = new AxiosHttpService()
    let callback = function () {}

    sinon.spy(http.service.interceptors.request, 'use')
    sinon.spy(http.service.interceptors.response, 'use')

    http.requestMiddleware(callback)
    http.responseMiddleware(callback)

    expect(http.service.interceptors.request.use.called).to.be.true
    expect(http.service.interceptors.request.use.args[0][0]).to.equal(callback)
    expect(http.service.interceptors.response.use.called).to.be.true
    expect(http.service.interceptors.response.use.args[0][0]).to.equal(callback)
  })
})
