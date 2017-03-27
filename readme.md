# Basic usage

`test-doc` is a rather simple utility. It serves as
a way to combine writing tests with writing documentation.

## Assertions
`test-doc` allows for assertions using the NodeJS assert
utility (`require('assert')`).

```javascript
assert(true)
```

## Importing modules
`test-doc` allows you to use require just like you would
in any NodeJS application.

### Project modules

```javascript
const message = require('./helloWorldMessage')
assert.equal(message, 'Hello world')
```

## Scoping

The natural question then is, can you use variables that
you declare in another code block? And the answer is that
variables are scoped within the same heading or a child
heading. Note that this is only supported when using
pound symbols (#) at the start of the line, without
any preceding space. If you want the variable to be in
the same scope you will have to use "=" and "-" for
creating headers.

### Example - part 1

```javascript
const myImportantVariable = 'here'
```

```javascript
assert.equal(myImportantVariable, 'here')
```

### example - part 2

```javascript
assert.equal(typeof myImportantVariable, 'undefined')
```

# Requiring external modules

```javascript
const _ = require('lodash')
const index = _.findIndex([1, 2, 3], x => x === 2)
assert.equal(index, 1)
```
