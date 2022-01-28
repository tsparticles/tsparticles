[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# preact-particles

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

Componente Oficial [tsParticles](https://github.com/matteobruni/tsparticles) para Preact

## Instalação

```shell
npm install preact-particles
```

ou

```shell
yarn add preact-particles
```

## Como usar

### Código

Exemplo:

```javascript
import Particles from "preact-particles";

class App extends Component {
  render() {
    return (
      <Particles
        id="tsparticles"
        params={{
          background: {
            color: {
              value: "#0d47a1",
            },
          },
          fpsLimit: 60,
          interactivity: {
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
                area: 800,
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

### Propriedades

| Prop            | Tipo   | Definição                                                                                                           |
| --------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| width           | string | A largura do canvas.                                                                                             |
| height          | string | A altura do canvas.                                                                                            |
| options         | object | As options das instâncias de partículas.                                                                               |
| style           | object | O estilo do elemento canvas.                                                                                     |
| className       | string | Nome da classe do elemento que contém o canvas.                                                                                |
| canvasClassName | string | Nome da classe do canvas.                                                                                        |
| container       | object | Instância do [particles container](https://particles.js.org/docs/modules/_core_container_.html) |

Veja as configurações dos parâmetros [aqui](https://particles.js.org).

### Erros

Caso você tenha algum erro de typescript, `tsParticles` usa TypeScript `3.9.6` então instale pelo menos a versão 3.8 para usar a sintaxe `import type`.

## Demos

O website com a demo está [aqui](https://particles.js.org)

<https://particles.js.org>

Também existe uma coleção no CodePen ativamente mantida e atualizada [aqui](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
