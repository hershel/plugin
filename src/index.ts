import { Application as App, Client, version } from 'hershel'
import * as semver from 'semver'

const ssoSymbol = Symbol.for('skip-override')

type pluginFn = App.Plugin<any, Client>

interface PluginHelperOptions {
  shouldSkipOverride?: boolean
  version?: string
}

/**
 * Plugin helper for Hershel
 * @param fn plugin function
 * @param options helper options
 */
export const plugin = (
  fn: pluginFn,
  options: PluginHelperOptions = { shouldSkipOverride: true }
) => {
  if (typeof fn !== 'function') {
    throw new TypeError(
      `plugin expects a function, instead got \`${typeof fn}\``
    )
  }

  // @ts-ignore because for TS, Symbol.for('a') !== Symbol.for('a')
  if (options.shouldSkipOverride) fn[ssoSymbol] = true
  if (options.version) checkVersion(options.version)

  return fn
}

/**
 * Check if plugin requested version is repected
 * @param version version
 */
function checkVersion(version: string) {
  if (typeof version !== 'string') {
    throw new TypeError(`expect version string, got '${typeof version}'`)
  }

  let pckgVersion: string
  try {
    pckgVersion = require('hershel/package.json').version.replace(
      /-rc\.\d+/,
      ''
    )
  } catch {
    throw new Error('`hershel` not found. Install it with `npm i hershel`')
  }

  if (version && !semver.satisfies(pckgVersion, version)) {
    throw new Error(
      `@hershel/plugin - expected '${version}' hershel version, '${pckgVersion}' is installed`
    )
  }
}
