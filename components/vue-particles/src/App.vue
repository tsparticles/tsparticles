<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <div class="wrap-banner">
      <div class="main-title">
        <h2>
          Vue-Particles
        </h2>
        <p class="subtitle">
          Vue.js component for particles backgrounds
        </p>
      </div>
      <vue-particles color="#ffffff" linesColor="#ffffff"></vue-particles>

    </div>
    <main-content></main-content>
    <foot></foot>
  </div>
</template>

<script>
  import Foot from './components/Foot'
  import MainContent from './components/Main'
  export default {
    name: 'app',
    components: {
      Foot,
      MainContent
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style lang="scss">
  *,
  *:after,
  *:before {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    margin: 0;
    background: linear-gradient(45deg, hsl(0, 0%, 49%) 0%, hsla(158, 21%, 69%, 0) 70%), linear-gradient(135deg, hsl(203, 49%, 13%) 10%, hsla(203, 64%, 52%, 0) 80%), linear-gradient(225deg, hsl(0, 0%, 0%) 10%, hsla(189, 54%, 37%, 0) 80%), linear-gradient(315deg, hsl(0, 0%, 70%) 100%, hsla(238, 24%, 45%, 0) 70%);
  }

  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  code[class*="language-"],
  pre[class*="language-"],
  pre,
  code {
    font-family: Menlo, Monaco, Andale Mono, Ubuntu Mono, monospace !important;
    font-size: .95em;
  }

  pre.language-js {
    max-width: 550px;
    margin: 1rem auto !important;
  }

  .npm-code {
    background: #292929;
    border-radius: 3px;
    box-shadow: inset 0px 0px 39px rgba(0, 0, 0, 0.74);
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  h3 {
    font-weight: 100;
    font-size: 2rem;
  }

  .white {
    color: #ffffff;
  }

  .teko {
    font-family: 'Teko', sans-serif;
  }

  .text-left {
    text-align: left;
  }

  .text-center {
    text-align: center;
  }

  #particles-js {
    background-image: url("./assets/sky.jpg");
    background-size: cover;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .wrap-banner {
    position: relative;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-flex;
    display: flex;
    height: 100%;
    justify-content: center;
  }

  .main-section {
    max-width: 550px;
    margin: auto;
    padding: 0 1rem;
  }

  .main-title {
    color: #fff;
    z-index: 999;

    h2 {
      font-size: 7rem;
      font-family: 'Teko', sans-serif;
      text-shadow: 8px 8px #000000;
      text-transform: uppercase;
      margin: 0;
      @media (max-width: 767px) {
        font-size: 3rem;
      }
    }
    p.subtitle {
      font-size: 1.7rem;
      margin: 0;
      @media (max-width: 767px) {
        font-size: 1rem;
      }
    }
  }

  .section-title {
    margin: 2rem 0 0 0;
  }

  .footer {
    margin: 1rem 0;
  }
</style>
