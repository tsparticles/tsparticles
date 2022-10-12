[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# svelte-particles

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Virallinen [tsParticles](https://github.com/matteobruni/tsparticles) SvelteJS komponentti

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Asennus

```shell
npm install svelte-particles
```

tai

```shell
yarn add svelte-particles
```

## Käyttöohjeet

```html

<script>
    import Particles from "svelte-particles";
    import { loadFull } from "tsparticles";

    let particlesUrl = "http://foo.bar/particles.json";

    let particlesConfig = {
        particles: {
            color: {
                value: "#000",
            },
            links: {
                enable: true,
                color: "#000",
            },
            move: {
                enable: true,
            },
        },
    };

    let onParticlesLoaded = (event) => {
        const particlesContainer = event.detail.particles;

        // voit käyttää particlesContaineria kutsuaksesi kaikkia säiliö luokkien
        // (core kirjastosta) metodeja kuten play, pause, refresh, start, stop
    };

    let particlesInit = async (engine) => {
        // you can use main to customize the tsParticles instance adding presets or custom shapes
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    };
</script>

<Particles
        id="tsparticles"
        options="{particlesConfig}"
        on:particlesLoaded="{onParticlesLoaded}"
        particlesInit="{particlesInit}"
/>

<!-- tai -->

<Particles
        id="tsparticles"
        url="{particlesUrl}"
        on:particlesLoaded="{onParticlesLoaded}"
        particlesInit="{particlesInit}"
/>
```

### SSR

Particles-komponenttia ei ole rakennettu SSR:ää varten,
joten sinun täytyy pakottaa komponentin kutsu client puolelta `async import` avulla.

Esimerkki alla:

```html

<script>
    import { onMount } from "svelte";
    import { loadFull } from "tsparticles";

    let ParticlesComponent;

    onMount(async () => {
        const module = await import("svelte-particles");

        ParticlesComponent = module.default;
    });

    let particlesUrl = "http://foo.bar/particles.json";

    let particlesConfig = {
        particles: {
            color: {
                value: "#000",
            },
            links: {
                enable: true,
                color: "#000",
            },
            move: {
                enable: true,
            },
        },
    };

    let onParticlesLoaded = (event) => {
        const particlesContainer = event.detail.particles;

        // voit käyttää particlesContaineria kutsuaksesi kaikkia säiliö luokkien
        // (core kirjastosta) metodeja kuten play, pause, refresh, start, stop
    };

    let particlesInit = async (main) => {
        // Täällä voit alustaa tsParticles esiintymän (main), lisäämällä mukautettuja muotoja tai esiasetuksia
        // tämä lataa tsparticles-paketin, joka on helpoin tapa saada kaikki käyttövalmiiksi
        // alaken versiosta 2 voit lisätä vain tarvitsemasi ominaisuudet ja pienentää paketin kokoa
        await loadFull(main);
    };
</script>

<svelte:component
        this="{ParticlesComponent}"
        id="tsparticles"
        options="{particlesConfig}"
        on:particlesLoaded="{onParticlesLoaded}"
        particlesInit="{particlesInit}"
/>

<!-- tai -->

<svelte:component
        this="{ParticlesComponent}"
        id="tsparticles"
        url="{particlesUrl}"
        on:particlesLoaded="{onParticlesLoaded}"
        particlesInit="{particlesInit}"
/>
```

### TypeScript ongelmat

Käyttäjä raportoi TypeScript ongelmasta (#3963). Ongelma johtuu siitä, että tämä Svelte komponentti on rakennettu
TypeScriptillä.

Jos kohtaat saman ongelman, seuraa seuraavia ohjeita:

- asenna nämä paketit: `typescript`, `svelte-preprocess`.
- lisää `tsconfig.json` tiedosto projektiisi, seuraten
  esimerkkiä: <https://github.com/ivanhofer/sveltekit-typescript-showcase#configure-typescript> (katso tästä
  esimerkki: <https://github.com/ivanhofer/sveltekit-typescript-showcase/blob/main/tsconfig.json>)
- tuo (import) `svelte-preprocess` Svelte konfiguraatio tiedostoon, kuten
  tässä: `import preprocess from 'svelte-preprocess'` (katso tästä
  esimerkki: <https://github.com/ivanhofer/sveltekit-typescript-showcase/blob/c824e45338ffc1a9c907c63d00a6a0af4884a0e9/svelte.config.js#L2>)
- käytä `preprocess` funktiota sinun svelte configuraatio tiedostossa, kuten tässä: `preprocess: preprocess(),` (katso
  tästä
  esimerkki: <https://github.com/ivanhofer/sveltekit-typescript-showcase/blob/c824e45338ffc1a9c907c63d00a6a0af4884a0e9/svelte.config.js#L9>)

Tämän jälkeen kaiken pitäisi toimia

## Demot

Demo verkkosivu löytyy [täältä](https://particles.js.org)

<https://particles.js.org>

Aktiivisesti ylläpidetty ja päivitetty CodePen kokoelma löytyy [täältä](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
