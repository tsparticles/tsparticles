## tsParticles - React Component

tsParticles React component, using [tsParticles](https://github.com/matteobruni/tsparticles).

Checkout the [demo page](https://particles.matteobruni.it).

---

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
            <Particles />
        );
    };

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
