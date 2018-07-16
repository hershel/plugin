<h2 align="center">@hershel/plugin</h2>

<p align="center">
  <em>Plugin helper for <a href="https://github.com/hershel/hershel">Hershel</a></em>
</p>

When you don't want your plugin to have access to an instance of an encapsulated Hershel Client, you can

- Use the skip-override hidden property
- Use this module

In addition if you use this module when creating new plugins, you can declare the name and the expected Hershel version that your plugin needs.

## Install

```
npm i @hershel/plugin
```

[`hershel`](https://github.com/hershel/hershel) should be installed as well.

## Usage

This module can do for you:

    Add the skip-override property
    Check the minimum version of Fastify

## Example

```js
const myPlugin = plugin((instance, opts, next) => {
  // your code
  next()
})
```

If you need to set a minimum version of hershel for your plugin, just add the semver range

```js
const { plugin } = require('@hershel/plugin')

const myPlugin = (instance, opts, next) => {
  // your plugin code
  next()
}

plugin(myPlugin, { version: '1.x.x' })
```

## Thanks

Hershel uses part of Fastify's theoretical logic, a fast and low overhead web framework for Node.js.

## License

MIT
