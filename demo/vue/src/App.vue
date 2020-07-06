<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png"/>
        <Particles id="tsparticles" :options="{
                                           background: {
                                             color: {
                                               value: '#0d47a1'
                                             }
                                           },
                                           fpsLimit: 60,
                                           interactivity: {
                                             detectsOn: 'window',
                                             events: {
                                               onClick: {
                                                 enable: true,
                                                 mode: 'push'
                                               },
                                               onHover: {
                                                 enable: true,
                                                 mode: 'repulse'
                                               },
                                               resize: true
                                             },
                                             modes: {
                                               bubble: {
                                                 distance: 400,
                                                 duration: 2,
                                                 opacity: 0.8,
                                                 size: 40,
                                                 speed: 3
                                               },
                                               push: {
                                                 quantity: 4
                                               },
                                               repulse: {
                                                 distance: 200,
                                                 duration: 0.4
                                               }
                                             }
                                           },
                                           particles: {
                                             color: {
                                               value: '#ffffff'
                                             },
                                             links: {
                                               color: '#ffffff',
                                               distance: 150,
                                               enable: true,
                                               opacity: 0.5,
                                               width: 1
                                             },
                                             collisions: {
                                               enable: true
                                             },
                                             move: {
                                               direction: 'none',
                                               enable: true,
                                               outMode: 'bounce',
                                               random: false,
                                               speed: 6,
                                               straight: false
                                             },
                                             number: {
                                               density: {
                                                 enable: true,
                                                 value_area: 800
                                               },
                                               value: 80
                                             },
                                             opacity: {
                                               value: 0.5
                                             },
                                             shape: {
                                               type: 'circle'
                                             },
                                             size: {
                                               random: true,
                                               value: 5
                                             }
                                           },
                                           detectRetina: true
                                         }"/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    declare module 'particles.vue';
    import Particles from "particles.vue";

    Vue.use(Particles);

    export default class App extends Vue {
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    #tsparticles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000000;
        z-index: -10;
    }
</style>
