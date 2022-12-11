[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# solid-particles

[![npm](https://img.shields.io/npm/v/solid-particles)](https://www.npmjs.com/package/solid-particles) [![npm](https://img.shields.io/npm/dm/solid-particles)](https://www.npmjs.com/package/solid-particles)

Componentes oficiales de solid [tsParticles](https://github.com/matteobruni/tsparticles)

## Instalación

```shell
npm install solid-particles solid-js
```

or

```shell
yarn add solid-particles solid-js
```

## Cómo usarlo?

### Código

Examples:

_URL Remota_

```javascript
import Particles from "solid-particles";

function App() {
    return (
        <div class="App">
            <Particles
                id="tsparticles"
                options={{
                    background: {
                        color: "#000",
                    },
                    fullScreen: {
                        enable: true,
                    },
                }}
            />
        </div>
    );
}
```

_Objeto de Opciones_

```javascript
import Particles from "solid-particles";

class App extends Component {
    constructor(props) {
        super(props);

        this.particlesInit = this.particlesInit.bind(this);
        this.particlesLoaded = this.particlesLoaded.bind(this);
    }

    particlesInit(main) {
        console.log(main);

        // puede inicializar la instancia tsParticles (main) aquí, agregando formas personalizadas o ajustes preestablecidos
    }

    particlesLoaded(container) {
        console.log(container);
    }

    render() {
        return (
            <Particles
                id="tsparticles"
                init={this.particlesInit}
                loaded={this.particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "#0d47a1",
                        },
                    },
                    fpsLimit: 60,
                    interactivity: {
                        detectsOn: "canvas",
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40,
                            },
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outMode: "bounce",
                            random: false,
                            speed: 6,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            random: true,
                            value: 5,
                        },
                    },
                    detectRetina: true,
                }}
            />
        );
    }
}
```

### Propiedades

| Propiedad       | Tipo     | Definición                                                                                                                                                                                  |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| width           | string   | El ancho del canvas.                                                                                                                                                                        |
| height          | string   | El alto del canvas.                                                                                                                                                                         |
| options         | object   | Las opciones de la instancia de las partículas.                                                                                                                                             |
| url             | string   | Las opciones remotas de la url, llamadas usando una petición de AJAX                                                                                                                        |
| style           | object   | Estilo del elemento element.                                                                                                                                                                |
| className       | string   | El nombre de la clase del contenedor del canvas.                                                                                                                                            |
| canvasClassName | string   | El nombre de la clase del canvas.                                                                                                                                                           |
| container       | object   | La instancia de [particles container](https://particles.js.org/docs/modules/Core_Container.html)                                                                                            |
| init            | function | Esta función se llama después de la inicialización de la instancia de tsParticles, la instancia es el parámetro y puede cargar configuraciones o formas preestablecidas personalizadas aquí |
| loaded          | function | Esta función se llama cuando las partículas se cargan correctamente en el lienzo, el contenedor actual es el parámetro y puede personalizarlo aquí                                          |

Puedes encontrar los parametros de configuración [aquí](https://particles.js.org)

## Demos

Puedes ver el ejemplo oficial usando CodeSandbox [aquí](https://codesandbox.io/s/condescending-dan-7e0r9)

El sitio demo es [aquí](https://particles.js.org)

<https://particles.js.org>

También hay una colección de CodePen que se mantiene y actualiza activamente [aquí](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
