[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# riot-particles

[![npm](https://img.shields.io/npm/v/riot-particles)](https://www.npmjs.com/package/riot-particles) [![npm downloads](https://img.shields.io/npm/dm/riot-particles)](https://www.npmjs.com/package/riot-particles)

Албан ёсны [tsParticles](https://github.com/matteobruni/tsparticles) RiotJS компонэнт

## Татах

```shell
npm install riot-particles riot
```

эсвэл

```shell
yarn add riot-particles riot
```

## Хэрхэн ашиглах

```html

<riot-particles id="tsparticles" options='{{
        background: {
            color: "#000"
        },
        fullScreen: {
            enable: true
        },
        particles: {
            links: {
                enable: true
            },
            move: {
                enable: true
            }
        }
    }}' particlesInit='{(main) => console.log(main)}' particlesLoaded='{(container) => console.log(container)}'/>

<script>
    import RiotParticles from 'riot-particles';

    export default {
        components: {
            RiotParticles
        }
    }
</script>

<!-- эсвэл -->

<riot-particles
        id="tsparticles"
        url="https://foo.bar/particles.json"
        particlesInit='{(main) => console.log(main)}' particlesLoaded='{(container) => console.log(container)}'/>
/>
```

## Жишээ

Жишээ [энд](https://particles.js.org)

<https://particles.js.org>

CodePen -ий байнга шинэчлэгдэж байдаг цуглуулга [энд](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
