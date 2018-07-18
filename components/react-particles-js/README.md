## Particles.js - React Component

![Particles](https://raw.githubusercontent.com/wufe/react-particles-js/master/demo/particles.png)

Implementation in **Typescript** + **React** of [Particles.js](https://github.com/VincentGarreau/particles.js/) by [Vincent Garreau](https://github.com/VincentGarreau).

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
| className | string | The class name of the canvas wrapper. |
| canvasClassName | string | the class name of the canvas. |

Find your parameters configuration [here](http://vincentgarreau.com/particles.js/).

### Added functionalities

#### Shadow

Adds blurred shadow to the lines of the canvas.

```js
import Particles from 'react-particles-js';

class App extends Component{
  
    render(){
        return (
            <Particles 
              params={{
            		particles: {
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "#3CA9D1",
            					blur: 5
            				}
            			}
            		}
            	}}
              style={{
                width: '100%',
                backgroundImage: `url(${logo})` 
              }}
            />
        );
    };

}
```

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

### What's next

The main purpose of this library is to be simple to use, also allowing to be customized.

To accomplish this, an experimental branch has been created in order to provide a boilerplate for the next version of this library.

A live demonstration can be found [here](http://timeon.space).

In this simple demo website, a new approach has been used, giving the application a powerful composability.  
Issues concerning best practices, usability, backward compatibility and performances are raising, so..

**Looking for contributors and mantainers**

All is needed is previous experience with Typescript.

If you are interested contact me privately.

Every PR will always be welcome.