const fs = require('fs')
const path = require('path')
const testDocTranspiler = require('./testDocTranspiler')

function testDoc(filename) {
  filename = path.resolve(filename)

  let dirname = filename.split('/')
  dirname = dirname.slice(0, dirname.length - 1).join('/')
  const source = fs.readFileSync(filename, 'utf-8')
  const testSource = testDocTranspiler(source)
  const fn = new Function(
    'assert',
    'require',
    testSource
  )

  fn(
    require('assert'),
    mod => {
      if (mod.startsWith('.') || mod.startsWith('/')) {
        return require(path.resolve(dirname, mod))
      }
      let NODE_PATH = process.env.NODE_PATH
      console.log(NODE_PATH)
      process.env.NODE_PATH += ':' + __dirname
      console.log(NODE_PATH)
      const module = require(mod)
      process.env.NODE_PATH = NODE_PATH
      return module
    }
  )
}

module.exports = testDoc
