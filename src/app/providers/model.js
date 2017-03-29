import ModelService from 'services/blueprint/model'
import directory from 'utilities/directory'

/**
 * These services are booted during app initialization.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function boot (key, app) {
  app.bind(key, function (container) {
    let service = new ModelService(app, directory('models'))

    let model = namespace => service.load(namespace)
    model.all = service.all.bind(service)
    model.register = service.register.bind(service)

    return model
  })
}

/**
 * You can now use services that have been booted on app initialization to
 * register additional services.
 * @param  {Lantern} app The application.
 * @return {undefined}
 */
function register (app) {

}

export default { boot, register }
