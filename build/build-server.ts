import path from 'path'
import { rollup } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import { SERVER_INPUT, SERVER_OUTPUT } from './constants'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

const writeBundle = async () => {
  const bundle = await rollup({
    input: SERVER_INPUT,
    plugins: [
      esbuild({
        minify: true,
        platform: 'node',
        loaders: {
          '.json': 'json'
        },

      }),
      json(),
      nodeResolve({
        preferBuiltins: false
      }),
      commonjs()
    ]
  })

  const dir = path.resolve(SERVER_OUTPUT)
  await bundle.write({
    format: 'cjs',
    dir,
    sourcemap: false,
    exports: 'auto',
    preserveModules: true
  })
}

export const buildUtils = async () => {
  await writeBundle()
}
