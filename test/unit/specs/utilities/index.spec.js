import { getFilenames, importDirectory, namespaceKeys } from 'utilities'

describe('utilities', () => {
  describe('getFilenames', () => {
    it('should get the filenames from a webpack context', () => {
      let directory = function webpackContext (req) {}
      directory.keys = function () {
        return ['./index.js', './test.vue', './something.json']
      }
      sinon.spy(directory, 'keys')
      let filenames = getFilenames(directory)
      expect(filenames[0]).to.equal('index')
      expect(filenames[1]).to.equal('test')
      expect(filenames[2]).to.equal('something')
    })
  })
  describe('importDirectory', () => {
    it('should import and map a directory of files to an object where each key is the filename and value is the default export', () => {
      let imports = [
        {
          default: {
            login () {}
          }
        },
        {
          default: {
            create () {}
          }
        },
        {
          default: {
            delete () {}
          }
        }
      ]
      let files = importDirectory(imports, ['index', 'test', 'something'])
      expect(files.index).to.equal(imports[0].default)
      expect(files.test).to.equal(imports[1].default)
      expect(files.something).to.equal(imports[2].default)
    })
  })
  describe('namespaceKeys', () => {
    it('should namespace the keys of an object', () => {
      let object = {
        test: {
          bar: 123
        },
        something: {}
      }
      let newObject = namespaceKeys('foo', object)
      expect(newObject['foo.test']).to.equal(object.test)
      expect(newObject['foo.something']).to.equal(object.something)
    })
  })
})
