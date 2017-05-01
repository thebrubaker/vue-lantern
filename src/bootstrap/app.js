let { App } = require('lantern-core')
let config = require('src/config/app').default

let app = new App(config)

if (Window && config.debug) Window.app = app

module.exports = app

config.aliases.forEach(alias => {
  module.exports[alias] = app[alias]
})
