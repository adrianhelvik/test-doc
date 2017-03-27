const assert = require('assert')

function testDocTranspiler(source) {
  const lines = source.split('\n')
  let codeMode = false
  let code = []
  let heading = 0

  for (let line of lines) {
    if (! codeMode) {
      code.push('//' + line)
    }
    let trimmedLine = line.trim()
    if (line.startsWith('#')) {
      let prevHeading = heading
      heading = /^[#]+/.exec(line)[0].length
      if (heading == prevHeading) {
        code.push(
          '})(); // ↔',
          ';(() => { // ↔'
        )
      }
      if (heading < prevHeading) {
        for (let i = heading; i < prevHeading; i++) {
          code.push('})(); // ' + heading + ' <- ' + prevHeading)
        }
      }
      if (heading > prevHeading) {
        for (let i = prevHeading; i < heading; i++) {
          code.push(';(() => { // ' + prevHeading + ' -> ' + heading)
        }
      }
    } else if (line.startsWith('```')) {
      codeMode = ! codeMode
    } else if (codeMode) {
      code.push(line)
    }
  }

  for (let i = 0; i < heading; i++) {
    code.push('})(); // ' + (heading - i - 1) + ' <- ' + (heading - i))
  }

  return code.join('\n')
}

module.exports = testDocTranspiler
