## tsParticles - React Component ![Node.js CI](https://github.com/matteobruni/react-tsparticles/workflows/Node.js%20CI/badge.svg)

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

### Errors

If you have typescript errors `tsParticles` uses TypeScript `3.9.3` so try installing at least 3.8 for `import type` syntax.

## Need More Help?

[![Slack](https://cdn.matteobruni.it/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI)
