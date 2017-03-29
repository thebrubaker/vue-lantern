export default class Blueprint {
  constructor (namespace, model) {
    this.namespace = namespace
    this.model = model
  }

  get name () {
    return this.model.name
  }
}
