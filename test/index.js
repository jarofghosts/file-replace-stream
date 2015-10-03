var fs = require('fs')
var path = require('path')

var test = require('tape')

var fileReplaceStream = require('../')

test('writes written data to provided file', function (t) {
  t.plan(2)

  var replaceStream = fileReplaceStream(path.join(__dirname, 'testfile'))

  replaceStream.on('data', function (str) {
    t.equal(str.toString(), 'rofl')
    t.equal(
      fs.readFileSync(path.join(__dirname, 'testfile'), {encoding: 'utf8'}),
      'rofl'
    )

    fs.unlinkSync(path.join(__dirname, 'testfile'))
  })

  replaceStream.end('rofl')
})

test('last write wins', function (t) {
  t.plan(2)

  var replaceStream = fileReplaceStream(path.join(__dirname, 'testfile'))

  replaceStream.on('data', function (str) {
    t.equal(str.toString(), 'last')
    t.equal(
      fs.readFileSync(path.join(__dirname, 'testfile'), {encoding: 'utf8'}),
      'last'
    )

    fs.unlinkSync(path.join(__dirname, 'testfile'))
    replaceStream.end()
  })

  replaceStream.write('first')
  replaceStream.write('second')
  replaceStream.write('third')
  replaceStream.write('fourth')
  replaceStream.write('fifth')
  replaceStream.write('last')
})
