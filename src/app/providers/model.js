import ModelService from 'services/blueprint/model'
import directory from 'utilities/directory'
import config from 'src/config/model'

/**
 * These services are booted during app initialization.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function boot (app) {
  app.bind('model', function (container) {
    let model = new ModelService(directory('src/models'), config)

    return (name, loadRelations) => model.create(name, loadRelations)
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
