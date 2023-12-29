import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.tsx',
  // output: [
  //   {
  //     file: 'dist/index.js',
  //     format: 'cjs',
  //     sourceMap: true,
  //   },
  //   {
  //     file: 'dist/index.esm.js',
  //     format: 'esm',
  //     sourceMap: true,
  //   }
  // ],
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    commonjs(),
    terser(),
    typescript({ tsconfig: './tsconfig.build.json', sourceMap: true }),
    postcss({
      modules: true,
    }),
  ]
};
