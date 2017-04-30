<template>
  <div
    id="particles-js"
    :color="color"
    :linesColor="linesColor"
    :particlesNumber="particlesNumber"
    :shapeType="shapeType"
    :particleSize="particleSize"
    :linesWidth="linesWidth"
  ></div>
</template>
<script>
  /* eslint-disable */
  import particles from 'particles.js'
  export default {
    name: 'vue-particles',
    props: {
      color: {
        type: String,
        default: '#dedede'
      },
      particlesNumber: {
        type: Number,
        default: 80
      },
      shapeType: {
        type: String,
        default: "circle"
      },
      particleSize: {
        type: Number,
        default: 4
      },
      linesColor: {
        type: String,
        default: '#dedede'
      },
      linesWidth: {
        type: Number,
        default: 1
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.initParticleJS(
          this.color,
          this.particlesNumber,
          this.shapeType,
          this.particleSize,
          this.linesColor,
          this.linesWidth
        )
      })
    },
    methods: {
      initParticleJS (
        color,
        particlesNumber,
        shapeType,
        particleSize,
        linesColor,
        linesWidth
      ) {
        particlesJS('particles-js', {
          "particles": {
            "number": {
              "value": particlesNumber,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": color
            },
            "shape": {
              // circle, edge, triangle, polygon, star, image
              "type": shapeType,
              "stroke": {
                "width": 0,
                "color": "#192231"
              },
              "polygon": {
                "nb_sides": 5
              }
            },
            "opacity": {
              "value": 0.7,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": particleSize,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": linesColor,
              "opacity": 0.4,
              "width": linesWidth
            },
            "move": {
              "enable": true,
              "speed": 3,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "onresize": {

                "enable": true,
                "density_auto": true,
                "density_area": 400

              }
            },
            "modes": {
              "grab": {
                "distance": 140,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        });
      }

    }
  }
  /* eslint-disable */
</script>
