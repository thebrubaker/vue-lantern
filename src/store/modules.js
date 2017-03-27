import { importDirectory } from 'utilities'

const directory = require.context('./modules', false, /\.js$/)
let modules = importDirectory(directory)

export default modules
