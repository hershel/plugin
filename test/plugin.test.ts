import test from 'ava'

import { plugin as p } from '../src'

const ssoSymbol = Symbol.for('skip-override')

test('plugin is a function', t => {
  t.is(typeof p, 'function')
})

test('options should throw when not object', t => {
  const plugin = () => {}
  // @ts-ignore
  t.throws(() => p(plugin, 'test'), {
    message: 'options object should be an object'
  })
})

test('add sso symbol to fn', t => {
  const plugin = () => {}

  p(plugin)

  t.is(plugin[ssoSymbol], true)
})

test('when shouldSkipOverride is false, should not add sso symbol', t => {
  const plugin = () => {}

  p(plugin, { shouldSkipOverride: false })

  t.not(plugin[ssoSymbol], true)
})

test('should throw if plugin is not a function', t => {
  const plugin = 'plugin'

  // @ts-ignore
  t.throws(() => p(plugin), {
    message: 'plugin expects a function, instead got `string`'
  })
})
