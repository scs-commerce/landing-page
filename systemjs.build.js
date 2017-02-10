// const fs = require('fs')
const path = require('path')
const glob = require('glob')
const Builder = require('systemjs-builder')

const config = {
  meta: { code: 'es6' },
  paths: {
    'npm:*': 'node_modules/*'
  },

  map: {
    'plugin-babel': 'npm:systemjs-plugin-babel/plugin-babel.js',
    'systemjs-babel-build': 'npm:systemjs-plugin-babel/systemjs-babel-node.js'
  },

  transpiler: 'plugin-babel',

  baseURL: '.',
  bundles: {
    './custom-elements.js': glob.sync('javascripts/custom-elements/**/*.js')
      .map(p => path.relative('javascripts/custom-elements', p))
      .map((file) => path.join('javascripts', 'custom-elements', file))
  },
  externals: ['zepto', 'document-register-element']
}

const builder = new Builder(config)

const bundles = Object.keys(config.bundles)
  .map((name) => builder.bundle(config.bundles[name], path.join('dist', 'javascripts', name)))

Promise.all(bundles).then(() =>
  builder.bundle('javascripts/main.js', 'dist/javascripts/main.js', config)
)
  .then(() => console.log('build finished'))
  .catch(e => console.log(e))
