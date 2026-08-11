# Reference des options

Les options `tsParticles` sont profondes. Cette page sert de carte pratique avant de plonger dans chaque sous-option.

## Choisir votre strategie de configuration

- **Resultat visuel rapide** : partez d'un preset puis surchargez les champs essentiels.
- **Controle complet** : definissez manuellement `particles`, `interactivity` et `background`.
- **Approche config-first** : commencez avec `@tsparticles/configs`, puis affinez pas a pas.

## Documentation rapide (locale)

- [`Background & Canvas`](/fr/options/background)
- [`Background Mask`](/fr/options/background-mask)
- [`Full Screen`](/fr/options/fullscreen)
- [`Motion`](/fr/options/motion)
- [`Manual Particles`](/fr/options/manual-particles)
- [`Themes`](/fr/options/themes)
- [`Particles`](/fr/options/particles)
- [`Particles Number`](/fr/options/particles-number)
- [`Particles Move`](/fr/options/particles-move)
- [`Particles Links`](/fr/options/particles-links)
- [`Particles Palette`](/fr/options/particles-palette)
- [`Particles Shape`](/fr/options/particles-shape)
- [`Particles Collisions`](/fr/options/particles-collisions)
- [`Particles Life`](/fr/options/particles-life)
- [`Particles Orbit`](/fr/options/particles-orbit)
- [`Particles Roll`](/fr/options/particles-roll)
- [`Particles Rotate`](/fr/options/particles-rotate)
- [`Interactivity`](/fr/options/interactivity)
- [`Interactivity Click`](/fr/options/interactivity-click)
- [`Interactivity Hover`](/fr/options/interactivity-hover)
- [`Interactivity Div`](/fr/options/interactivity-div)
- [`Interactivity Events`](/fr/options/interactivity-events)
- [`Interactivity Modes`](/fr/options/interactivity-modes)
- [`Plugin: Absorbers`](/fr/options/plugin-absorbers)
- [`Plugin: Emitters`](/fr/options/plugin-emitters)
- [`Plugin: Infection`](/fr/options/plugin-infection)
- [`Plugin: Polygon Mask`](/fr/options/plugin-polygon-mask)
- [`Performance Guide`](/fr/options/performance)

## Pages particules detaillees

- [`Particles Bounce`](/fr/options/particles-bounce)
- [`Particles Color`](/fr/options/particles-color)
- [`Particles Destroy`](/fr/options/particles-destroy)
- [`Particles Group`](/fr/options/particles-group)
- [`Particles Opacity`](/fr/options/particles-opacity)
- [`Particles Palette`](/fr/options/particles-palette)
- [`Particles Repulse`](/fr/options/particles-repulse)
- [`Particles Shadow`](/fr/options/particles-shadow)
- [`Particles Size`](/fr/options/particles-size)
- [`Particles Stroke`](/fr/options/particles-stroke)
- [`Particles Tilt`](/fr/options/particles-tilt)
- [`Particles Twinkle`](/fr/options/particles-twinkle)
- [`Particles Wobble`](/fr/options/particles-wobble)
- [`Particles ZIndex`](/fr/options/particles-zindex)

## Ou trouver la documentation de reference

- Docs options principales : [`tsparticles/markdown/Options.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/Options.md)
- Pages detaillees des options : [`tsparticles/markdown/Options/`](https://github.com/tsparticles/tsparticles/tree/main/markdown/Options)
- Interfaces TypeScript : [`tsparticles/engine/src/Options/Interfaces`](https://github.com/tsparticles/tsparticles/tree/main/engine/src/Options/Interfaces)

## Options racine les plus utilisees

- `background`
- `fullScreen`
- `interactivity`
- `particles`
- `detectRetina`
- `preset`
- `responsive`

## Sections les plus utilisees

- `background` : base du fond canvas et du masquage.
- `particles.number` : quantite et densite.
- `particles.move` : vitesse, direction et out modes.
- `particles.shape` : cercle, polygone, image, emoji, personnalise.
- `particles.palette` : changer rapidement des palettes coherentes.
- `interactivity` : modes hover/click et effets externes.
- `detectRetina` : compromis qualite/performance sur ecrans haute DPI.

## Carte des particules (vue imbriquee)

Utilisez cette arborescence comme aide de navigation avant d'ouvrir les pages detaillees :

```text
particles
|- number
|- color
|- shape
|- size
|- opacity
|- move
|- links
|- collisions
|- life
|- destroy
|- group
|- orbit
|- repulse
|- roll
|- rotate
|- shadow
|- stroke
|- tilt
|- twinkle
|- wobble
|- zIndex
`- palette
```

Ouvrez d'abord les docs racine, puis les approfondissements :

- Racine : [`Particles`](/fr/options/particles)
- Approfondissement : [`Particles Number`](/fr/options/particles-number), [`Particles Move`](/fr/options/particles-move), [`Particles Links`](/fr/options/particles-links)

## Workflow d'options fiable

1. Commencez avec une configuration valide issue des demos ou des presets.
2. Modifiez une section a la fois.
3. Validez avec TypeScript (`IOptions`) dans le code de l'application.
4. Gardez les options de production dans des fichiers JSON dedies.

## Exemple type minimal

```ts
import type { ISourceOptions } from "@tsparticles/engine";

export const particlesOptions: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    number: { value: 70 },
    move: { enable: true, speed: 1.5 },
  },
};
```

## Garde-fous performance

- Preferez `@tsparticles/slim` sauf besoin clair de plugins avances.
- Gardez le nombre de particules proportionnel a la surface du conteneur.
- Mesurez sur de vrais appareils avant d'ajouter des interactions lourdes.

## References associees

- Docs package configs : <https://github.com/tsparticles/tsparticles/blob/main/utils/configs/README.md>
- Dossier presets : <https://github.com/tsparticles/tsparticles/tree/main/presets>
- Dossier palettes : <https://github.com/tsparticles/tsparticles/tree/main/palettes>

Pour les details complets de chaque sous-option, utilisez aussi les pages source `tsparticles/markdown/Options` liees ci-dessus.
