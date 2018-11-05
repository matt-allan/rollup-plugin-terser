const assert = require('assert');
const { rollup } = require("rollup");
const terser = require('../');

describe('rollup-plugin-terser', () => {
  it('minifies', async () => {

    const bundle = await rollup({
      input: 'test/fixtures/unminified.js',
      plugins: [terser()]
    });

    const result = await bundle.generate({ format: 'cjs' });

    assert.equal(result.code, '\'use strict\';\n\nvar name="Matt";"M"==name[0]&&console.log("Hello "+name);\n');
  });

  it('uses options', async () => {
    const bundle = await rollup({
      input: 'test/fixtures/unminified.js',
      plugins: [
        terser({ output: { comments: 'all' } })
      ]
    });

    const result = await bundle.generate({ format: 'cjs' });

    assert.equal(result.code, '\'use strict\';\n\n// say hello\nvar name="Matt";"M"==name[0]&&console.log("Hello "+name);\n');
  });

  it('generates a source map by default', async () => {
    const bundle = await rollup({
      input: 'test/fixtures/unminified.js',
      plugins: [terser()]
    });

    const result = await bundle.generate({ format: 'cjs', sourcemap: true });

    assert.ok(result.map);
  });

  it('allows disabling source maps', async () => {
    const bundle = await rollup({
      input: 'test/fixtures/unminified.js',
      plugins: [terser({ sourceMap: false })]
    });

    const result = await bundle.generate({ format: 'cjs' });

    assert.equal(result.map, null);
  });

  it('throws if Terser throws', async () => {
    await assert.rejects((async () => {
      const bundle = await rollup({
        input: 'test/fixtures/error.js',
        plugins: [terser({ sourceMap: false })]
      });

      await bundle.generate({ format: 'cjs' });
    })());
  });

  it('raises warnings if Terser raises warnings', async () => {
    let warnings = [];
    const bundle = await rollup({
      input: 'test/fixtures/unminified.js',
      onwarn (warning) {
        warnings.push(warning);
      },
      plugins: [terser({ sourceMap: { content: 'inline' } })],
    });

    await bundle.generate({ format: 'cjs' });

    assert.equal(1, warnings.length);
    assert.equal('inline source map not found', warnings.pop().message);
  });

  it('allows disabling warnings', async () => {
    let warnings = [];
    const bundle = await rollup({
      input: 'test/fixtures/unminified.js',
      onwarn (warning) {
        warnings.push(warning);
      },
      plugins: [terser({ warnings: false, sourceMap: { content: 'inline' } })],
    });

    await bundle.generate({ format: 'cjs' });

    assert.equal(0, warnings.length);
  });
});
