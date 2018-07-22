import { Application as App, Client, version } from 'hershel'
import * as semver from 'semver'

const displayName = Symbol.for('hershel.display-name')
const skipOverride = Symbol.for('skip-override')
const meta = Symbol.for('plugin-metadata')

type pluginFn<O> = App.Plugin<O, Client>

interface PluginHelperOptions {
  shouldSkipOverride?: boolean
  hershel?: string
  name?: string
  /** allows to add custom metadata */
  [key: string]: any
}

/**
 * Plugin helper for Hershel
 * @param fn plugin function
 * @param options helper options
 */
export const plugin = <O>(
  fn: pluginFn<O>,
  options: PluginHelperOptions = { shouldSkipOverride: true }
) => {
  if (typeof fn !== 'function') {
    throw new TypeError(
      `plugin expects a function, instead got \`${typeof fn}\``
    )
  }

  if (
    typeof options !== 'object' ||
    Array.isArray(options) ||
    options === null
  ) {
    throw new TypeError('options object should be an object')
  }

  if (options.shouldSkipOverride) {
    // @ts-ignore because for TS, Symbol.for('a') !== Symbol.for('a')
    fn[skipOverride] = true
    delete options.shouldSkipOverride
  }

  if (options.hershel) {
    checkVersion(options.hershel)
    delete options.hershel
  }

  if (!options.name) options.name = checkName(fn)

  // @ts-ignore
  fn[displayName] = options.name
  // @ts-ignore
  fn[meta] = options

  return fn as App.Plugin<O, Client>
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
