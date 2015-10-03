# file-replace-stream

[![Build Status](https://img.shields.io/travis/jarofghosts/file-replace-stream.svg?style=flat-square)](https://travis-ci.org/jarofghosts/file-replace-stream)
[![npm install](https://img.shields.io/npm/dm/file-replace-stream.svg?style=flat-square)](https://www.npmjs.org/package/file-replace-stream)
[![npm version](https://img.shields.io/npm/v/file-replace-stream.svg?style=flat-square)](https://www.npmjs.org/package/file-replace-stream)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![License](https://img.shields.io/npm/l/file-replace-stream.svg?style=flat-square)](https://github.com/jarofghosts/file-replace-stream/blob/master/LICENSE)

## example

```javascript
var fileReplaceStream = require('file-replace-stream')

// ... a short time later

aStreamOfSomethingImportant.pipe(fileReplaceStream('tracking-file.txt'))
```

Every time that `aStreamOfSomethingImportant` emits, the contents of
`tracking-file.txt` will be updated with the latest emission.

## api

`fileReplaceStream(filename) -> transformStream`

* Writing to `transformStream` queues a write to `filename`.
* Data writes will be dropped if they are superseded by others. In practice
  this should have no consequence.
* Writes are guaranteed to occur in order, so the latest data will always be
  what is written to `filename`.

## license

MIT
