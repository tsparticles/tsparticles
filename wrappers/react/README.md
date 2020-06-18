# ReactJS  
  
![npm](https://img.shields.io/npm/v/react-tsparticles) ![npm](https://img.shields.io/npm/dm/react-tsparticles)  
  
## Installation  
  
`npm install react-tsparticles`  
  
or  
  
`yarn add react-tsparticles`  
  
## How to use  
  
### Code  
  
Example:  
  
```javascript  
import Particles from 'react-tsparticles';  
  
class App extends Component{  
     render(){  
 return (
 <Particles id="tsparticles" params={{
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
}} />
     );
  } 
}
```  
  
### Props  
  
| Prop | Type | Definition |  
| --- | --- | --- |  
| width | string | The width of the canvas. |  
| height | string | The height of the canvas. |  
| params | object | The parameters of the particles instance. |  
| style | object | The style of the canvas element. |  
| className | string | The class name of the canvas wrapper. |  
| canvasClassName | string | the class name of the canvas. |  
| container | object | The instance of the [particles container](https://github.com/matteobruni/tsparticles/wiki/Particles-Container-class) |  
  
Find your parameters configuration [here](https://particles.matteobruni.it).  
  
### Errors  
  
If you have typescript errors `tsParticles` uses TypeScript `3.9.3` so try installing at least 3.8 for `import type` syntax.  
  
## 3rd Party  
  
A 3rd-party component is available too, read more [here](https://github.com/Wufe/react-particles-js)  
