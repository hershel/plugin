import * as hershel from 'hershel'
import test from 'ava'

import { plugin } from '../src'

test('should skip override in Hershel', t => {
  const bot = new hershel.Client()

  const shouldAddProperty = plugin((i, o, n) => {
    i.set('test', 'test text')
    n()
  })

  const shouldNotAddProperty = plugin(
    (i, o, n) => {
      i.set('test2', 'test text')
      n()
    },
    { shouldSkipOverride: false }
  )

  bot.register(shouldAddProperty)
  bot.register(shouldNotAddProperty)

  return bot.ready().then(() => {
    t.is(bot.get('test'), 'test text')
    t.not(bot.get('test2'), 'test text')
  })
})
