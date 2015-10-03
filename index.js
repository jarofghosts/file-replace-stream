var fs = require('fs')

var through = require('through2')

module.exports = fileReplaceStream

function fileReplaceStream (path) {
  var stream = through(write, end)
  var toWrite = null
  var writing = false
  var fd

  fs.open(path, 'w', setFD)

  return stream

  function setFD (err, descriptor) {
    if (err) {
      stream.emit('err', err)

      return
    }

    fd = descriptor
    checkWrite()
  }

  function checkWrite () {
    if (!fd || toWrite === null || writing) {
      return
    }

    writing = true

    toWrite = new Buffer(toWrite)

    fs.write(fd, toWrite, 0, toWrite.length, 0, verifyWrite)

    toWrite = null

    function verifyWrite (err, written, string) {
      if (err) {
        stream.emit('error', err)

        return
      }

      stream.push(string)
      setImmediate(checkWrite)
      writing = false
    }
  }

  function write (data, _, next) {
    toWrite = data.toString()

    checkWrite()

    next()
  }

  function end (finish) {
    if (toWrite !== null || writing) {
      setImmediate(end, finish)

      return
    }

    if (fd) {
      fs.close(fd, checkError)
    } else {
      finish()
    }

    function checkError (err) {
      if (err) {
        stream.emit('error', err)

        return
      }

      finish()
    }
  }
}
