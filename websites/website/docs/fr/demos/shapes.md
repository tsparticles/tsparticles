# Catalogue des formes

Ce catalogue recense les valeurs les plus courantes de `particles.shape.type` et indique quand `particles.shape.options` ajoute des controles specifiques a une forme.

Dossiers source :

- <https://github.com/tsparticles/tsparticles/tree/main/shapes>
- Reference des options de forme : [`/options/particles-shape`](/fr/options/particles-shape)

## Types de formes courants

- `circle` (par defaut, sans options de forme supplementaires)
- `square` / `edge` (sans options de forme supplementaires)
- `triangle` (sans options de forme supplementaires)
- `line` (sans options de forme supplementaires)
- `polygon` (`options.polygon.sides`)
- `star` (`options.star.sides`, `options.star.inset`)
- `text` (`options.text.value`, `font`, `weight`, `style`, `close`)
- `emoji` (`options.emoji.value`)
- `image` / `images` (`options.image.src`, `name`, `width`, `height`, `gif`, `replaceColor`, `close`)

## Notes sur les alias et les bundles

- `square` et `edge` sont des alias de la meme forme.
- `character` et `char` sont des alias du meme groupe d'options.
- `image` et `images` utilisent le meme objet d'options.
- La plupart des formes avancees necessitent `@tsparticles/slim` (ou `@tsparticles/all`) ou des packages de forme dedies.

Pour les tester rapidement avec controles Start/Pause et JSON editable, utilisez [`/playground/shapes`](/fr/playground/shapes).
