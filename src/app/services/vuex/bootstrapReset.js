export default function bootstrapReset (module) {
  /**
   * Filters state for properties with `isValid` and reduces
   * a final boolean to see if the entire `state` is valid.
   * If a single attribute is invalid on the state, it will
   * return false.
   * @param  {object} state takes modified state
   * @return {boolean} boolean to see if the entire `state` is valid.
   */
  if (module.mutations['reset'] === undefined) {
    module.mutations['reset'] = function (state, resetState) {
      state = Object.assign(state, resetState)
    }
  }
}
