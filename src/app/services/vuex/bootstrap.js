import form from './bootstrapForm'
import table from './bootstrapTable'

export function getters (module) {
  Object.keys(module.state).forEach(key => {
    if (module.getters[key] === undefined) {
      module.getters[key] = function (state) {
        return state[key]
      }
    }
  })
}

export function mutations (module) {
  Object.keys(module.state).forEach(key => {
    if (module.mutations[key] === undefined) {
      module.mutations[key] = function (state, value) {
        state[key] = value
      }
    }
  })
}

export function setDefaults (module) {
  if (!module.state) {
    module.state = {}
  }

  if (!module.getters) {
    module.getters = {}
  }

  if (!module.mutations) {
    module.mutations = {}
  }

  if (!module.actions) {
    module.actions = {}
  }
}

export default { setDefaults, getters, mutations, form, table }
