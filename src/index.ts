import { Application as App, Client, version } from 'hershel'
import * as semver from 'semver'

const skipOverride = Symbol.for('skip-override')
const displayName = Symbol.for('hershel.display-name')

type pluginFn = App.Plugin<any, Client>

interface PluginHelperOptions {
  shouldSkipOverride?: boolean
  version?: string
  name?: string
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
  if (options.shouldSkipOverride) fn[skipOverride] = true
  if (options.version) checkVersion(options.version)
  if (!options.name) options.name = checkName(fn)

  // @ts-ignore
  fn[displayName] = options.name

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

/**
 * Try to retrieve the name of the plugin
 * @param fn plugin function
 */
function checkName(fn: Function) {
  if (fn.name.length > 0) return fn.name
  else return 'anonymous'
}
