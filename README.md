# rollup-plugin-terser

A rollup plugin to minify javascript with [Terser](https://github.com/terser-js/terser).  No other dependencies.

# Installation

```bash
npm install --save-dev @yuloh/rollup-plugin-terser
```

# Usage

Any options are passed directly to terser.  You can view the possible options in the [terser docs](https://github.com/terser-js/terser#api-reference).  Unless explicitly disabled the `sourceMap` and `warnings` options are enabled so they can be passed to Rollup.

```javascript
import terser from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'iife',
      file: 'dist/bundle.js'
    }
  ],
  plugins: [
    terser()
  ]
};
```

# Contributing

Contributions are welcome.  This project aims to provide a minimal wrapper for Terser so it can be used with Rollup.  Any features that aren't provided by Terser itself will likely be rejected.  You can lint and test your code with the commands `npm run lint` and `npm test`.