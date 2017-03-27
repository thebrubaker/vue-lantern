let { importDirectory } = require('./index')

/**
 * Import the config directory as an object.
 * @type {Object}
 */
let configuration = importDirectory(require.context('src/config', true, /\.js$/))

/**
 * Access a property on the configuration object using a dot-delimite string.
 * @param  {String} string  The property to access on config.
 * @return {mixed}  The configuration value.
 */
module.exports = function config (type) {
  // Split the type and traverse down the config object.
  return type.split('.').reduce((configuration, key) => {
    if (configuration[key] === undefined) {
      error(`You are trying to access an app configuration that does not exist: ${type}`)
    }
    return configuration[key]
  }, configuration)
}
