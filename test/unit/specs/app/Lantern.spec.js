import Lantern from 'src/app/Lantern'
import Bottle from 'bottlejs'

describe('Lantern.js', () => {
  it('should be configured and contain a dependency injection engine', () => {
    const config = {
      environment: 'testing'
    }
    let app = new Lantern(config)
    expect(app.config).to.equal(config)
    expect(app.environment).to.equal(config.environment)
    expect(app.bottle).to.be.instanceof(Bottle)
  })

  it('should boot and register service providers', () => {
    const config = {
      environment: 'testing'
    }
    let app = new Lantern(config)
    let provider = {
      boot: sinon.spy(),
      register: sinon.spy()
    }
    app.bootAndRegister([ provider ])
    expect(provider.boot.called).to.be.true
    expect(provider.register.called).to.be.true
  })

  it('should bind the implementation of a service to a name through dependency injection', () => {
    const config = {
      environment: 'testing'
    }
    let app = new Lantern(config)
    let functionSpy = sinon.spy(app.bottle, 'factory')
    let objectSpy = sinon.spy(app.bottle, 'service')
    app.bind('function', function () {})
    app.bind('object', {})
    expect(functionSpy.called).to.be.true
    expect(objectSpy.called).to.be.true
  })

  it('should bind the implementation of a service to an instance factory', () => {
    const config = {
      environment: 'testing'
    }
    let app = new Lantern(config)
    let spy = sinon.spy(app.bottle, 'instanceFactory')
    app.instance('name', function () {})
    expect(spy.called).to.be.true
  })

  it('should access core services from the dependency injection container', () => {
    const config = {
      environment: 'testing'
    }
    let app = new Lantern(config)
    app.bottle.container = {
      http: true,
      auth: true,
      events: true,
      store: true,
      router: true,
      api: true,
      view: true
    }
    expect(app.http).to.equal(app.bottle.container.http)
    expect(app.auth).to.equal(app.bottle.container.auth)
    expect(app.events).to.equal(app.bottle.container.events)
    expect(app.store).to.equal(app.bottle.container.store)
    expect(app.router).to.equal(app.bottle.container.router)
    expect(app.api).to.equal(app.bottle.container.api)
    expect(app.view).to.equal(app.bottle.container.view)
  })
})
