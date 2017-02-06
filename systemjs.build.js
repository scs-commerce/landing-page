const Builder = require('systemjs-builder')
const builder = new Builder('client')

builder
  .trace('js/main.js')
  .then((moduleTree) => {
    builder.bundle(moduleTree, 'dist/js/main.js')
    .then(function () {
      console.log('Build complete')
    })
    .catch(function (err) {
      console.log('Build error')
      console.log(err)
    })
  })
