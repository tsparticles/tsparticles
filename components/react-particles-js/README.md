## Particles.js - React Component

[![Particles][image]][hyperlink]

  [hyperlink]: https://rpj.bembi.org
  [image]: https://raw.githubusercontent.com/wufe/react-particles-js/master/img/particles.png (Particles)

Particles React component, using [tsParticles](https://github.com/matteobruni/tsparticles).

Checkout the [demo page](https://rpj.bembi.org).

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
| particlesRef | object | The instance of the [particles container](https://github.com/matteobruni/tsparticles/wiki/Particles-Container-class) |

Find your parameters configuration [here](https://particles.matteobruni.it).

---

### Added functionalities

#### Polygon mask support

Demo: [Polygon mask demo](https://rpj.bembi.org/#mask).

Available only since version `v2.4.0` (available with `npm install react-particles-js@2.4.0`).

##### Requirements

+ Only the first path of the svg will be fetched so you may want to join all path in your svg.
+ The **[SVGPathSeg polyfill](https://github.com/progers/pathseg)** is required.  
Add it in your index.html:

```html
<script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js"></script>
```

##### Example
```typescript
import Particles from 'react-particles-js';

class App extends Component{
  
    render(){
        return (
            <Particles 
                params={{
                    polygon: {
                        enable: true,
                        type: 'inside',
                        move: {
                            radius: 10
                        },
                        url: 'path/to/svg.svg'
                    }
                }} />
        );
    };

}
```

##### Parameters

+ `polygon.enable` (boolean; default false) - Whether the mask must be enabled
+ `polygon.url` (string) - The url of the svg  
+ `polygon.type` ('inline' | 'inside' | 'outside'; default 'inline') - The particles should be drawn over, inside or outside the svg path  
+ `polygon.scale` (number; default 1) - How much the svg must be scaled  
+ `polygon.move.radius` (number; default 10) - The radius which will be used as particles movement boundary  
+ `polygon.move.type` ('path' | 'radius'; default 'path') - Whether the particles should be bounded to the polygon path or to a given radius, while moving with `polygon.type = 'outside'` or `polygon.type = 'inside'` 
+ `polygon.inline.arrangement` ('random-point' | 'per-point' | 'one-per-point' | 'random-length' | 'equidistant'; default 'one-per-point') - Whether the particles disposition with `polygon.type = 'inline'` should be random or following some criteria; `'one-per-point'` overrides the number of the particles drawn.  
+ `polygon.draw.enable` (boolean; default false) - Whether the shape should be drawn on the canvas  
+ `polygon.draw.stroke.width` (number; default .5) - Draw stroke  
+ `polygon.draw.stroke.color` (string; default 'rgba(255, 255, 255, .1)') - Draw stroke color  

---

#### Multiple images

Lets you use multiple images as particle shape.  

Demo: [Multiple images demo](https://rpj.bembi.org/#images).

Available only since version `v2.4.0` (available with `npm install react-particles-js@2.4.0`).

##### Example

```typescript
import Particles from 'react-particles-js';

class App extends Component{
  
    render(){
        return (
            <Particles 
                params={{
                    particles: {
                        shape: {
                            type: 'images',
                            image: [
                                {src: 'path/to/first/image.svg', height: 20, width: 20},
                                {src: 'path/to/second/image.jpg', height: 20, width: 20},
                            ]
                        }
                    }
                }} />
        );
    };

}
```

---

#### Line link shadow

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

## Info and Major changes

Starting with v3.0.0 the react-particles-js library has switched its core functionality using [tsParticles](https://github.com/matteobruni/tsparticles).
This may introduce breaking changes but will allow the library be maintained more frequently.

---

### What's next

The main purpose of this library is to be simple to use, also allowing to be customized.

To accomplish this, an experimental branch has been created in order to provide a boilerplate for the next version of this library.

A live demonstration can be found [here](http://timeon.space).

In this simple demo website, a new approach has been used, giving the application a powerful composability.  
Issues concerning best practices, usability, backward compatibility and performances are raising, so..
