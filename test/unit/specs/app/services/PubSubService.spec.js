import PubSubService from 'src/app/services/PubSubService'
import pubsub from 'pubsub-js'

describe('PubSubService.js', () => {
  it('should set pubsub as the service and configure the service.', () => {
    const config = {
      test: true
    }
    let events = new PubSubService(config)
    expect(events.service).to.equal(pubsub)
    expect(events.config).to.equal(config)
  })

  it('should register all channels in an event list', () => {
    let events = new PubSubService()
    let eventList = {
      channelOne: () => {},
      channelTwo: () => {},
      channelThree: () => {}
    }

    sinon.spy(events, 'registerChannel')

    events.register(eventList)

    expect(events.registerChannel.callCount).to.equal(3)
    expect(events.registerChannel.args[0][0]).to.equal(eventList.channelOne)
    expect(events.registerChannel.args[1][0]).to.equal(eventList.channelTwo)
    expect(events.registerChannel.args[2][0]).to.equal(eventList.channelThree)
  })

  it('should register all the events in a channel', () => {
    let events = new PubSubService()
    let channel = {
      eventOne: () => {},
      eventTwo: () => {},
      eventThree: () => {}
    }

    sinon.spy(events, 'subscribe')

    events.registerChannel(channel)

    expect(events.subscribe.callCount).to.equal(3)
    expect(events.subscribe.args[0][0]).to.equal('eventOne')
    expect(events.subscribe.args[0][1]).to.equal(channel.eventOne)
    expect(events.subscribe.args[1][0]).to.equal('eventTwo')
    expect(events.subscribe.args[1][1]).to.equal(channel.eventTwo)
    expect(events.subscribe.args[2][0]).to.equal('eventThree')
    expect(events.subscribe.args[2][1]).to.equal(channel.eventThree)
  })

  it('should allow a context for `this` when registering all the events in a channel', () => {
    let events = new PubSubService()
    let channel = {
      eventOne: () => {
        return this
      }
    }

    let context = {
      value: 123
    }

    sinon.spy(events, 'subscribe')

    events.registerChannel(channel, context)

    expect(events.subscribe.called).to.be.true
    expect(events.subscribe.args[0][0]).to.equal('eventOne')
    expect(events.subscribe.args[0][1]).to.be.a.function
  })

  it('should subscribe a message to a subscriber', () => {
    let events = new PubSubService()
    let eventOne = () => {}

    sinon.spy(events.service, 'subscribe')

    events.subscribe('message', eventOne)

    expect(events.service.subscribe.called).to.be.true
    expect(events.service.subscribe.args[0][0]).to.equal('message')
    expect(events.service.subscribe.args[0][1]).to.equal(eventOne)
  })

  it('should publish a message with data', () => {
    let events = new PubSubService()
    let data = { test: true }

    sinon.spy(events.service, 'publish')

    events.publish('message', data)

    expect(events.service.publish.called).to.be.true
    expect(events.service.publish.args[0][0]).to.equal('message')
    expect(events.service.publish.args[0][1]).to.equal(data)
  })

  it('should have an alias called fire for the publish command', () => {
    let events = new PubSubService()
    let data = { test: true }

    sinon.spy(events, 'publish')

    events.fire('message', data)

    expect(events.publish.called).to.be.true
    expect(events.publish.args[0][0]).to.equal('message')
    expect(events.publish.args[0][1]).to.equal(data)
  })

  it('should unsubscribe from a message', () => {
    let events = new PubSubService()
    let token = 'testing'

    sinon.spy(events.service, 'unsubscribe')

    events.unsubscribe(token)

    expect(events.service.unsubscribe.called).to.be.true
    expect(events.service.unsubscribe.args[0][0]).to.equal(token)
  })

  it('should clear all subscriptions', () => {
    let events = new PubSubService()

    sinon.spy(events.service, 'clearAllSubscriptions')

    events.clearAllSubscriptions()

    expect(events.service.clearAllSubscriptions.called).to.be.true
  })
})
