## Particles.js - React Component

Porting in **Typescript** + **React**.  
This is a fork of [Particles.js](https://github.com/VincentGarreau/particles.js/) by [Vincent Garreau](https://github.com/VincentGarreau).

---

## Installation

`npm install react-particles-js` || `yarn add react-particles-js`

## How to use

### Code

Example:

```javascript
import Particles from 'react-particles-js';

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

Find your parameters configuration [here](http://vincentgarreau.com/particles.js/).

---

### Reporting issues

+ Look for any related issues.  
+ If you find an issue that seems related, please comment there instead of creating a new one.  
+ If you find no related issue, create a new one.  
+ Include all details you can ( operative system, environment, interpreter version, etc.. ).  
+ Include the error log.  
+ Remember to check the discussion and update if there changes.  

### Contributing  

+ Fork the repository  
+ Create your feature branch  
+ Commit your changes and push the branch  
+ Submit a pull request

---

## Info

### Refactoring stages

+ Add comprehensive props to the component.  
+ Change params names.  
+ Change variable and function names into more readable/understable/maintainable ones.  
+ Update the structure of the code detaching defined functions from `this.params.fn` object.  
+ Tests.