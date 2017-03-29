import directory from 'utilities/directory'
import { namespaceKeys } from 'utilities'

let events = directory('src/events')

export default Object.keys(events).map(channel => namespaceKeys(channel, events[channel]))
