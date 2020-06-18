# jQuery  
  
![npm](https://img.shields.io/npm/v/jquery-particles) ![npm](https://img.shields.io/npm/dm/jquery-particles)  
  
## Installation  
  
```shell script  
npm install jquery-particles  
```  
  
or from jsDelivr  
  
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/jquery-particles/badge)](https://www.jsdelivr.com/package/npm/jquery-particles)  
  
```html  
<!-- first include tsParticles -->  
<script src="https://cdn.jsdelivr.net/npm/tsparticles@1.16.0/dist/tsparticles.min.js"></script>  
<!-- then include jquery wrapper -->  
<script src="https://cdn.jsdelivr.net/npm/jquery-particles@1.16.0/dist/jquery.particles.min.js"></script>  
```  
  
## How to use  
  
HTML  
  
```html  
<div id="tsparticles"></div>  
```  
  
```javascript  
$("#tsparticles")  
 .particles() .init({
  background: {
    color: {
      value: "#0d47a1"
    }
  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",
    events: {
      onClick: {
        enable: true,
        mode: "push"
      },
      onHover: {
        enable: true,
        mode: "repulse"
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
      value: "#ffffff"
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
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
      type: "circle"
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
}, function (container) { // container is the particles container where you can play/pause or stop/start. // the container is already started, you don't need to start it manually. } );  
// or  
  
$("#tsparticles")  
 .particles() .ajax("particles.json", function (container) { // container is the particles container where you can play/pause or stop/start. // the container is already started, you don't need to start it manually. });
```
