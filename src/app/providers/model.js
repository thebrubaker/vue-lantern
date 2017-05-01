import { Model } from 'lantern-core'
import directory from 'utilities/directory'
import config from 'src/config/model'

/**
 * These services are booted during app initialization.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function boot (app) {
  app.bind('model', function (container) {
    Model.Blueprint.FirebaseDriver.load(container.firebase)
    Model.Blueprint.ApiDriver.load(container.api)
    Model.Blueprint.AlgoliaDriver.load(container.algolia)

    Model.Blueprint.load({
      firebase: Model.Blueprint.FirebaseDriver,
      api: Model.Blueprint.ApiDriver,
      algolia: Model.Blueprint.AlgoliaDriver
    })

    let model = new Model(directory('src/models'), config)

    return name => model.create(name)
  })
}

/**
 * You can now use services that have been booted on app initialization to
 * register additional services.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function register (app) {
  // app.model.boot()
}

export default { boot, register }
