[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# riot-particles

[![npm](https://img.shields.io/npm/v/riot-particles)](https://www.npmjs.com/package/riot-particles) [![npm downloads](https://img.shields.io/npm/dm/riot-particles)](https://www.npmjs.com/package/riot-particles) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/matteobruni/tsparticles) RiotJS component

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Installation

```shell
npm install riot-particles
```

or

```shell
yarn add riot-particles
```

## Usage

```html
<riot-particles
    id="tsparticles"
    options='{{
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
    }}'
    particlesInit="{async (main) => {
        console.log(main);
        
        // this loads the tsparticles package bundle, it is the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main); 
    }}"
    particlesLoaded="{(container) => console.log(container)}"
/>

<script>
    import RiotParticles from "riot-particles";
    import { loadFull } from "tsparticles";

    export default {
        components: {
            RiotParticles,
        },
    };
</script>

<!-- or -->

<riot-particles
    id="tsparticles"
    url="https://foo.bar/particles.json"
    particlesInit="{async (main) => {
        console.log(main);
        
        // this loads the tsparticles package bundle, it is the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main); 
    }}"
    particlesLoaded="{(container) => console.log(container)}"
/>
/>
```

## Demos

The demo website is [here](https://particles.js.org)

<https://particles.js.org>

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
