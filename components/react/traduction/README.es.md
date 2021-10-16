[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# react-tsparticles

[![npm](https://img.shields.io/npm/v/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles) [![npm](https://img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

Componentes Oficiales de ReactJS [tsParticles](https://github.com/matteobruni/tsparticles)

## Instalación

```shell
npm install react-tsparticles react
```

o

```shell
yarn add react-tsparticles react
```

#### create-react-app

A partir de la versión 1.17.0, hay dos plantillas oficiales de `create-react-app`:

- `cra-template-particles`: Plantilla ReactJS simple con partículas en pantalla completa, usando JavaScript
- `cra-template-particles-typescript`: Plantilla ReactJS simple con partículas en pantalla completa, usando TypeScript

Puedes instalarlo simplemente usando el comando `create-react-app` así:

```shell script
create-react-app your_app --template particles
```

o

```shell script
create-react-app your_app --template particles-typescript
```

## Cómo usarlo?

### Código

Ejemplos:

_URL Remota_

```javascript
import Particles from "react-tsparticles";

const App = () => {
  const particlesInit = (main) => {
    console.log(main);

    // puede inicializar la instancia tsParticles (main) aquí, agregando formas personalizadas o ajustes preestablecidos
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <Particles id="tsparticles" url="http://foo.bar/particles.json" init={particlesInit} loaded={particlesLoaded} />
  );
};
```

_Objeto de Opciones_

```javascript
import Particles from "react-tsparticles";

const App = () => {
  const particlesInit = (main) => {
    console.log(main);

    // puede inicializar la instancia tsParticles (main) aquí, agregando formas personalizadas o ajustes preestablecidos
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
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
};
```

### Propiedades

| Propiedad            | Tipo     | Definición                                                                                                                                          |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| width           | string   | El ancho del canvas.                                                                                                                            |
| height          | string   | El alto del canvas.                                                                                                                           |
| options         | object   | Las opciones de la instancia de las partículas.                                                                                                              |
| url             | string   | Las opciones remotas de la url, llamadas usando una petición de AJAX                                                                        |
| style           | object   | Estilo del elemento canvas.                                                                                                                    |
| className       | string   | El nombre de la clase del contenedor del canvas.                                                                                                               |
| canvasClassName | string   | El nombre de la clase del canvas.                                                                                                                       |
| container       | object   | La instancia de [particles container](https://particles.js.org/docs/modules/_core_container_.html)                                              |
| init            | function | Esta función se llama después de la inicialización de la instancia de tsParticles, la instancia es el parámetro y puede cargar configuraciones o formas preestablecidas personalizadas aquí |
| loaded          | function | Esta función se llama cuando las partículas se cargan correctamente en el lienzo, el contenedor actual es el parámetro y puede personalizarlo aquí         |

Puedes encontrar los parametros de configuración [aquí](https://particles.js.org).

## Demos

El sitio demo es [aquí](https://particles.js.org)

<https://particles.js.org>

También hay una colección de CodePen que se mantiene y actualiza activamente [aquí](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
