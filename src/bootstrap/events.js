import { importDirectory, namespaceKeys as namespaceChannel } from 'utilities'

const directory = require.context('../events', true, /\.js$/)
let events = importDirectory(directory)

/**
 * Map all the channels in an event list and namespace the keys with the name of the channel
 * @param  {object} events An object whose keys are channels
 * @return {array} An array of channels that have been namespaced
 */
export function mapChannels (events) {
  return Object.keys(events).map(channel => namespaceChannel(channel, events[channel]))
}

export default mapChannels(events)
