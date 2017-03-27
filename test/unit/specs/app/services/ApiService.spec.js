import ApiService from 'src/app/services/ApiService'

describe('ApiService.js', () => {
  it('should set a driver and configure the service.', () => {
    let driver = {
      test: true
    }
    const config = {
      paths: []
    }
    let api = new ApiService(driver, config)
    expect(api.driver).to.equal(driver)
    expect(api.config).to.equal(config)
    expect(api.pathList.length).to.equal(0)
    expect(api.params).to.be.a('object')
  })

  it('should return a new instance of itself. Changes to the previous instance should not alter the new instance.', () => {
    let driver = {}
    const config = {
      paths: []
    }
    let api = new ApiService(driver, config)

    api.pathList.push('foo')
    api.pathList.push('bar')

    expect(api.pathList[0]).to.equal('foo')
    expect(api.pathList[1]).to.equal('bar')

    api.params.with = 'foo,bar'

    let instance = api.newInstance()

    expect(instance.pathList.length).to.equal(api.pathList.length)
    expect(instance.pathList[0]).to.equal(api.pathList[0])
    expect(instance.pathList[1]).to.equal(api.pathList[1])
    expect(instance.params.with).to.equal(api.params.with)

    api.pathList.push('baz')

    expect(api.pathList[2]).to.equal('baz')
    expect(instance.pathList[2]).to.be.undefined
  })

  it('should configure an array of pathList to methods on the api service.', () => {
    let driver = {}
    const config = {
      paths: []
    }
    let api = new ApiService(driver, config)

    expect(api.foo).to.be.undefined
    expect(api.bar).to.be.undefined
    expect(api.baz).to.be.undefined

    let pathList = ['foo', 'bar', 'baz']
    api.configureRoutes(pathList)

    expect(api.foo).to.be.defined
    expect(api.bar).to.be.defined
    expect(api.baz).to.be.defined
  })

  it('should have configured path list as available methods that build a request.', () => {
    let driver = {}
    const config = {
      paths: ['foo', 'bar']
    }
    let api = new ApiService(driver, config)

    expect(typeof api.foo).to.equal('function')
    expect(api.foo(1).path()).to.equal('foo/1')
    expect(api.foo(1).pathList[0].name).to.equal('foo')
    expect(api.foo(1).pathList[0].id).to.equal(1)

    expect(typeof api.bar).to.equal('function')
    expect(typeof api.foo(1).bar).to.equal('function')
    expect(api.foo(1).bar(2).path()).to.equal('foo/1/bar/2')
    expect(api.foo(1).bar(2).pathList[1].name).to.equal('bar')
    expect(api.foo(1).bar(2).pathList[1].id).to.equal(2)
  })

  it('should request embedded relationships using the with method', () => {
    let driver = {}
    const config = {}
    let api = new ApiService(driver, config)

    expect(api.with('foo').params.with).to.equal('foo')
    expect(api.with(['foo', 'bar']).params.with).to.equal('foo,bar')
    expect(api.with(['foo', 'bar']).parameters()).to.equal('with=foo,bar')
  })

  it('should request paginated results.', () => {
    let driver = {}
    const config = {}
    let api = new ApiService(driver, config)

    expect(api.page(1, 20).params.page).to.equal(1)
    expect(api.page(1, 20).params.perPage).to.equal(20)
  })

  it('should request paginated results with a default per page value if none is provided.', () => {
    let driver = {}
    const config = {
      perPage: 15
    }
    let api = new ApiService(driver, config)

    expect(api.page(2).params.page).to.equal(2)
    expect(api.page(2).params.perPage).to.equal(15)
  })

  it('should request per page results.', () => {
    let driver = {}
    const config = {
      perPage: 15
    }
    let api = new ApiService(driver, config)

    expect(api.perPage(20).params.perPage).to.equal(20)
  })

  it('should set an array or string to a parameter.', () => {
    let api = new ApiService({}, {})

    expect(api.setParameter('test', 25).params.test).to.equal(25)
    expect(api.setParameter('test', ['foo', 'bar']).params.test).to.equal('foo,bar')

    sinon.spy(api, 'setParameter')
    try {
      api.setParameter(true)
    } catch (exception) {
      expect(api.setParameter.exceptions[0]).to.equal(exception)
    }
  })

  it('should append a path to the path list', () => {
    let api = new ApiService({}, {})

    expect(api.appendPath('product', 15).pathList.length).to.equal(1)
    expect(api.appendPath('product', 15).pathList[0].name).to.equal('product')
    expect(api.appendPath('product', 15).pathList[0].id).to.equal(15)
  })

  it('should render its path as a sting', () => {
    let api = new ApiService({}, {})

    expect(api.appendPath('product', 1).path()).to.equal('product/1')
    expect(api.appendPath('category', 15).path()).to.equal('product/1/category/15')
    expect(api.appendPath('foo').path()).to.equal('product/1/category/15/foo')
  })

  it('should merge configurations', () => {
    let api = new ApiService({}, {
      routes: ['foo'],
      perPage: 15
    })

    api.setParameter('foo', 'bazz')
    let mergedConfig = api.mergeConfig({
      params: {
        foo: 'bar'
      },
      perPage: 20
    })

    expect(mergedConfig.routes).to.be.defined
    expect(mergedConfig.params).to.be.defined
    expect(mergedConfig.perPage).to.be.defined
    expect(mergedConfig.perPage).to.equal(20)
    expect(mergedConfig.params.foo).to.equal('bazz')
  })

  it('should render the path and parameters as a string', () => {
    let api = new ApiService({}, {})
    expect(api.appendPath('foo', 'bar').setParameter('bizz', 'bazz').url()).to.equal('foo/bar?bizz=bazz')
  })

  it('should render the path and parameters as a string', () => {
    let api = new ApiService({}, {})
    sinon.spy(api, 'path')

    api.url()

    expect(api.path.called).to.be.true
  })

  it('should pass http requests to the driver', () => {
    let api = new ApiService({
      get: sinon.spy(),
      post: sinon.spy(),
      put: sinon.spy(),
      patch: sinon.spy(),
      delete: sinon.spy()
    }, {})
    let config = {
      foo: 'bar'
    }
    let data = {
      bizz: 'bazz'
    }

    api.get(config)
    api.post(data, config)
    api.put(data, config)
    api.patch(data, config)
    api.delete(config)

    expect(api.driver.get.called).to.be.true
    expect(api.driver.get.args[0][1].foo).to.equal(config.foo)
    expect(api.driver.post.called).to.be.true
    expect(api.driver.post.args[0][1]).to.equal(data)
    expect(api.driver.post.args[0][2].foo).to.equal(config.foo)
    expect(api.driver.put.called).to.be.true
    expect(api.driver.put.args[0][1]).to.equal(data)
    expect(api.driver.put.args[0][2].foo).to.equal(config.foo)
    expect(api.driver.patch.called).to.be.true
    expect(api.driver.patch.args[0][1]).to.equal(data)
    expect(api.driver.patch.args[0][2].foo).to.equal(config.foo)
    expect(api.driver.delete.called).to.be.true
    expect(api.driver.delete.args[0][1].foo).to.equal(config.foo)
  })

  it('should pass http requests to the driver without configs', () => {
    let api = new ApiService({
      get: sinon.spy(),
      post: sinon.spy(),
      put: sinon.spy(),
      patch: sinon.spy(),
      delete: sinon.spy()
    }, {})
    let data = {
      bizz: 'bazz'
    }

    api.get()
    api.post(data)
    api.put(data)
    api.patch(data)
    api.delete()

    expect(api.driver.get.called).to.be.true
    expect(api.driver.post.called).to.be.true
    expect(api.driver.post.args[0][1]).to.equal(data)
    expect(api.driver.put.called).to.be.true
    expect(api.driver.put.args[0][1]).to.equal(data)
    expect(api.driver.patch.called).to.be.true
    expect(api.driver.patch.args[0][1]).to.equal(data)
    expect(api.driver.delete.called).to.be.true
  })
})
