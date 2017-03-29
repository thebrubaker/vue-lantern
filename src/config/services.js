/**
 * List all service providers you want registered with the application. A service provider
 * should have two methods: bind(app) and register(app).
 * @type {Object}
 */
export default {
  api: require('src/app/providers/api'),
  auth: require('src/app/providers/auth'),
  events: require('src/app/providers/events'),
  firebase: require('src/app/providers/firebase'),
  http: require('src/app/providers/http'),
  model: require('src/app/providers/model'),
  router: require('src/app/providers/router'),
  search: require('src/app/providers/search'),
  store: require('src/app/providers/store'),
  view: require('src/app/providers/view')
}
