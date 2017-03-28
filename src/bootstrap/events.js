import { importDirectory, namespaceKeys as namespaceChannel } from 'utilities'

const directory = require.context('../events', true, /\.js$/)
let events = importDirectory(directory)

export default Object.keys(events).map(channel => namespaceChannel(channel, events[channel]))
