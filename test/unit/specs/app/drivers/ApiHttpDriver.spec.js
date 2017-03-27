import ApiHttpDriver from 'src/app/drivers/ApiHttpDriver'

describe('ApiHttpDriver.js', () => {
  let http = {
    create: () => {},
    get: sinon.spy(),
    delete: sinon.spy(),
    post: sinon.spy(),
    patch: sinon.spy(),
    put: sinon.spy(),
    interceptors: {
      request: {
        use: sinon.spy()
      },
      response: {
        use: sinon.spy()
      }
    }
  }
  let auth = {
    authenticated: sinon.spy(),
    token: sinon.spy()
  }
  let config = {
    foo: 'bar'
  }
  sinon.stub(http, 'create').returns(http)

  it('should set an http service and configure the driver', () => {
    let driver = new ApiHttpDriver(http, auth, config)
    expect(http.create.called).to.be.true
    expect(driver.http).to.be.equal(http)
    expect(driver.auth).to.be.equal(auth)
    expect(driver.config).to.be.equal(config)
  })

  it('should forward driver calls to the http service with args', () => {
    let driver = new ApiHttpDriver(http, auth, config)

    driver.get('foo', { foo: 'bar' })
    driver.delete('foo', { foo: 'bar' })
    driver.post('foo', { data: true }, { foo: 'bar' })
    driver.patch('foo', { data: true }, { foo: 'bar' })
    driver.put('foo', { data: true }, { foo: 'bar' })

    expect(http.get.called).to.be.true
    expect(http.get.args[0][0]).to.equal('foo')
    expect(http.get.args[0][1].foo).to.equal('bar')
    expect(http.delete.called).to.be.true
    expect(http.delete.args[0][0]).to.equal('foo')
    expect(http.delete.args[0][1].foo).to.equal('bar')
    expect(http.post.called).to.be.true
    expect(http.post.args[0][0]).to.equal('foo')
    expect(http.post.args[0][1].data).to.equal(true)
    expect(http.post.args[0][2].foo).to.equal('bar')
    expect(http.patch.called).to.be.true
    expect(http.patch.args[0][0]).to.equal('foo')
    expect(http.patch.args[0][1].data).to.equal(true)
    expect(http.patch.args[0][2].foo).to.equal('bar')
    expect(http.put.called).to.be.true
    expect(http.put.args[0][0]).to.equal('foo')
    expect(http.put.args[0][1].data).to.equal(true)
    expect(http.put.args[0][2].foo).to.equal('bar')
  })

  it('should add request middleware to the http service', () => {
    let driver = new ApiHttpDriver(http, auth, config)
    let callback = sinon.spy()
    driver.addRequestMiddleware(callback)
    expect(http.interceptors.request.use.called).to.be.true
    expect(http.interceptors.request.use.args[0][0]).to.equal(callback)
  })

  it('should add response middleware to the http service', () => {
    let driver = new ApiHttpDriver(http, auth, config)
    let callback = sinon.spy()
    driver.addResponseMiddleware(callback)
    expect(http.interceptors.response.use.called).to.be.true
    expect(http.interceptors.response.use.args[0][0]).to.equal(callback)
  })
})
