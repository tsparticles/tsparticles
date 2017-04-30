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

    <br>


    <div class="wrap-code text-left">
      <h4 class="white">
        Main.js file
      </h4>
      <pre class="language-js"><code>
import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
        </code></pre>
    </div>
    <br>
    <div class="wrap-code text-left">
      <h4 class="white">
        App.vue file - Simple example
      </h4>
      <pre class="language-html"><code>
{{appCode}}
        </code></pre>
    </div>
    <br>

    <div class="wrap-code text-left">
      <h4 class="white">
        App.vue file - Full example
      </h4>
      <pre class="language-html"><code>
{{appCodeFull}}
        </code></pre>
    </div>
    <br>

    <div class="wrap-table">
      <h4 class="white text-left">
       Props
      </h4>
      <table class="rwd-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>

        <tr>
          <td data-th="Name">color</td>
          <td data-th="Type">String</td>
          <td data-th="Default">#dedede</td>
          <td data-th="Description">Particle color</td>
        </tr>
        <tr>
          <td data-th="Name">particlesNumber</td>
          <td data-th="Type">Number</td>
          <td data-th="Default">80</td>
          <td data-th="Description">Amount of particles</td>
        </tr>
        <tr>
          <td data-th="Name">shapeType</td>
          <td data-th="Type">String</td>
          <td data-th="Default">"circle"</td>
          <td data-th="Description">
            Available shape types: "circle","edge","triangle",
            "polygon","star"
          </td>
        </tr>
        <tr>
          <td data-th="Name">particleSize</td>
          <td data-th="Type">Number</td>
          <td data-th="Default">4</td>
          <td data-th="Description">
            Size of single particle
          </td>
        </tr>
        <tr>
          <td data-th="Name">linesColor</td>
          <td data-th="Type">String</td>
          <td data-th="Default">#dedede</td>
          <td data-th="Description">
            Lines color
          </td>
        </tr>
        <tr>
          <td data-th="Name">linesWidth</td>
          <td data-th="Type">Number</td>
          <td data-th="Default">1</td>
          <td data-th="Description">
            Lines width
          </td>
        </tr>
      </table>
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
  const appCodeFull = `<template>
      <div id="app">
        <vue-particles
          color="#ffffff"
          linesColor="#ffffff"
          :particlesNumber="80"
          shapeType="circle"
          :particleSize="8"
          :linesWidth="3"
        >
        </vue-particles>
      </div>
   </template>`
    /* eslint-disable */
  export default {
    name: 'main-content',
    data () {
      return {
        appCode,
        appCodeFull
      }
    }
  }
</script>
