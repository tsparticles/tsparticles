<template>
  <div class="main-section">
    <h3 class="section-title teko white">
      How to use
    </h3>
    <pre class="npm-code white">
              <code>
npm install vue-particles --save-dev
              </code>
     </pre>


    <div class="wrap-code text-left">
      <h4 class="white">
        Main file
      </h4>
      <pre class="language-js"><code>
// Main file
import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
        </code></pre>
    </div>
    <br>
    <div class="wrap-code text-left">
      <h4 class="white">
        App.vue file
      </h4>
      <pre class="language-html"><code>
{{appCode}}
        </code></pre>
    </div>

  </div>
</template>
<script>
  /* eslint-disable */
  const appCode = `<template>
      <div id="app">
        <vue-particles color="#ffffff"></vue-particles>
      </div>
   </template>`
    /* eslint-disable */
  export default {
    name: 'main-content',
    data () {
      return {
        appCode
      }
    }
  }
</script>
