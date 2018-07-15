import { Application as App, Client } from 'hershel'

const ssoSymbol = Symbol.for('skip-override')

type pluginFn = App.Plugin<any, Client>

interface PluginHelperOptions {
  shouldSkipOverride?: boolean
}

export const plugin = (
  fn: pluginFn,
  options: PluginHelperOptions = { shouldSkipOverride: true }
) => {
  if (typeof fn !== 'function') {
    throw new TypeError(`plugin expects a function, instead got '${typeof fn}'`)
  }

  // @ts-ignore because for TS, Symbol.for('a') !== Symbol.for('a')
  if (options.shouldSkipOverride) fn[ssoSymbol] = true
  return fn
}
