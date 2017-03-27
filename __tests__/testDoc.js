const testDocTranspiler = require('../lib/testDocTranspiler')
const testDoc = require('../lib/testDoc')

test('it tests the documentation', () => {
  testDoc(__dirname + '/../readme.md')
})

test('it throws an error if the documentation failed', () => {
  expect(() => testDoc(__dirname + '/../fails.md'))
    .toThrow(/false == true/)
})
