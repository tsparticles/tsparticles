// rollup.config.js
import vue from 'rollup-plugin-vue'
export default {
  entry: 'src/vue-particles/index.js',
  format: 'cjs', // 'cjs'
  dest: 'vue-particles/bundle.js', // equivalent to --output
  moduleName: 'VueParticles',
  plugins: [
    vue({ /* configuration options. */ })
  ]
}
