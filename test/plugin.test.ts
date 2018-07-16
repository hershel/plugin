import test from 'ava'

import { plugin as p } from '../src'

const ssoSymbol = Symbol.for('skip-override')

test('plugin is a function', t => {
  t.is(typeof p, 'function')
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