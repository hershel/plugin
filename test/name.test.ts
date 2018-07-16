import test from 'ava'

import { plugin as p } from '../src'

const displayName = Symbol.for('hershel.display-name')

test('name should be anonymous for anonymous function', t => {
  const plugin = p(() => {})

  t.is(plugin[displayName], 'anonymous')
})

test('`displayName` should be the name of the function', t => {
  function testPlugin() {}

  p(testPlugin)

  t.is(testPlugin[displayName], 'testPlugin')
})

test('`name` set in options should override function name', t => {
  function testPlugin() {}

  p(testPlugin, { name: 'test' })

  t.is(testPlugin[displayName], 'test')
})
