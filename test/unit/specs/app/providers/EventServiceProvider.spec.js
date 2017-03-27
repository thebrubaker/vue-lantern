import EventServiceProvider from 'src/app/providers/EventServiceProvider'
import PubSubService from 'services/PubSubService'

describe('EventServiceProvider.js', () => {
  it('should bind an event service to the application', () => {
    let app = {
      bind: sinon.spy()
    }

    EventServiceProvider.boot(app)

    expect(app.bind.called).to.be.true
    expect(app.bind.args[0][0]).to.equal('events')
    expect(typeof app.bind.args[0][1]).to.equal('function')
    expect(app.bind.args[0][1]()).to.be.instanceOf(PubSubService)
  })

  it('should register all events', () => {
    let app = {
      events: {
        register: sinon.spy()
      }
    }
    EventServiceProvider.register(app)
    expect(app.events.register.called).to.be.true
  })
})
