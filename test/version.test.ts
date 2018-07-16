import test from 'ava'

import { plugin as p } from '../src'

test('should throw if version does not satisfies the plugin requested version', t => {
  function plugin(i, o, n) {
    n()
  }

  const v = require('hershel/package.json').version.replace(/-rc\.\d+/, '')

  t.throws(() => p(plugin, { version: '1000.1000.1000' }), {
    message: `@hershel/plugin - expected '1000.1000.1000' hershel version, '${v}' is installed`
  })
})

test('should throw if version is not a string', t => {
  function plugin(i, o, n) {
    n()
  }

  // @ts-ignore
  t.throws(() => p(plugin, { version: 1000 }), {
    message: `expect version string, got 'number'`
  })
})
