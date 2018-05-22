import VuePlugin from 'rollup-plugin-vue'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import { main, module } from './package.json'

export default {
  input: 'src/index.js',
  output: [{
    name: 'vc-toast',
    file: main,
    format: 'umd'
  }, {
    file: module,
    format: 'es'
  }],
  plugins: [
    VuePlugin(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    babel()
  ]
}
