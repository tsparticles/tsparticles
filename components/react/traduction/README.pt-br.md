[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# react-tsparticles

[![npm](https://img.shields.io/npm/v/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles) [![npm](https://img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

Componente Oficial [tsParticles](https://github.com/matteobruni/tsparticles) para ReactJS

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Instalação

```shell
npm install react-tsparticles
```

ou

```shell
yarn add react-tsparticles
```

#### create-react-app

A partir da versão 1.17.0, existem dois templates oficiais para `create-react-app`:

- `cra-template-particles`: Template ReactJS simples com partículas em tela cheia, utilizando JavaScript
- `cra-template-particles-typescript`: Template ReactJS simples com partículas em tela cheia, utilizando TypeScript

Você pode facilmente instalar utilizando o comando `create-react-app` desta forma:

```shell script
create-react-app your_app --template particles
```

ou

```shell script
create-react-app your_app --template particles-typescript
```

## Como usar

### Código

Exemplo:

```javascript
import Particles from "react-tsparticles";

const App = () => {
    const particlesInit = (main) => {
        console.log(main);

        // você pode inicializar a instância tsParticles (main) aqui, adicionando formas personalizadas ou predefinições
    }
    
    const particlesLoaded = (container) => {
        console.log(container);
    }
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
                fpsLimit: 120,
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

Caso você tenha algum erro de typescript, `tsParticles` usa TypeScript `3.9.6` então instale pelo menos a versão 3.8
para usar a sintaxe `import type`.

## Demos

O website com a demo está [aqui](https://particles.js.org)

<https://particles.js.org>

Também existe uma coleção no CodePen ativamente mantida e atualizada [aqui](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
