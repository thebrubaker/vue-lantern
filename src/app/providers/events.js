import { Events } from 'lantern-core'
import pubsub from 'pubsub-js'
import directory from 'utilities/directory'
import config from 'src/config/events'

/**
 * These services are booted during app initialization.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function boot (app) {
  app.bind('events', function (container) {
    return new Events(pubsub, config)
  })
}

/**
 * You can now use services that have been booted on app initialization to
 * register additional services.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function register (app) {
  app.events.register(directory('src/events'))
}

export default { boot, register }
