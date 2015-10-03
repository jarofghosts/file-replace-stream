# file-replace-stream

## example

```javascript
var fileReplaceStream = require('file-replace-stream')

// ... a short time later

aStreamOfSomethingImportant.pipe(fileReplaceStream('tracking-file.txt'))
```

Every time that `aStreamOfSomethingImportant` emits, the contents of
`tracking-file.txt` will be updated with the latest emission.

## license

MIT
