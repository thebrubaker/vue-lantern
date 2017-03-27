import { mapChannels } from 'bootstrap/events'

describe('bootstrap/events.js', () => {
  it('should map the channels on an event list', () => {
    let eventList = {
      auth: {
        login () {
          return 123
        },
        logout () {
          return 234
        }
      },
      product: {
        create () {
          return 345
        },
        delete () {
          return 456
        }
      }
    }
    let mappedChannels = mapChannels(eventList)
    expect(mappedChannels[0]).to.be.an('object')
    expect(mappedChannels[0]['auth.login']).to.be.a('function')
    expect(mappedChannels[0]['auth.login']).to.equal(eventList.auth.login)
  })
})
