import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import VuePlugin from 'rollup-plugin-vue'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import { uglify } from 'rollup-plugin-uglify'

export default [{
  input: 'src/index.js',
  output: {
    name: 'vc-toast',
    file: 'dist/vc-toast.js',
    format: 'umd'
  },
  plugins: [
    resolve(),
    commonjs(),
    VuePlugin(),
    postcss({
      extract: 'dist/css/vc-toast.css'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    babel()
  ]
}, {
  input: 'src/index.js',
  output: {
    name: 'vc-toast',
    file: 'dist/vc-toast.min.js',
    format: 'umd'
  },
  plugins: [
    resolve(),
    commonjs(),
    VuePlugin(),
    postcss({
      extract: 'dist/css/vc-toast.min.css',
      minimize: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    babel(),
    uglify()
  ]
}, {
  input: 'src/index.js',
  output: {
    name: 'vc-toast',
    file: 'dist/vc-toast.es.js',
    format: 'es'
  },
  plugins: [
    resolve(),
    commonjs(),
    VuePlugin(),
    postcss({
      extract: false,
      inject: false
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    babel()
  ]
}]
