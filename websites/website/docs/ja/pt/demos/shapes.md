# Catalogo de formas

Este catalogo lista os valores mais comuns de `particles.shape.type` e mostra quando `particles.shape.options` adiciona controles especificos por forma.

Pastas de origem:

- <https://github.com/tsparticles/tsparticles/tree/main/shapes>
- Referencia de opcoes de forma: [`/options/particles-shape`](/pt/options/particles-shape)

## Tipos de forma comuns

- `circle` (padrao, sem opcoes extras de forma)
- `square` / `edge` (sem opcoes extras de forma)
- `triangle` (sem opcoes extras de forma)
- `line` (sem opcoes extras de forma)
- `polygon` (`options.polygon.sides`)
- `star` (`options.star.sides`, `options.star.inset`)
- `text` (`options.text.value`, `font`, `weight`, `style`, `close`)
- `emoji` (`options.emoji.value`)
- `image` / `images` (`options.image.src`, `name`, `width`, `height`, `gif`, `replaceColor`, `close`)

## Notas sobre aliases e bundles

- `square` e `edge` sao aliases da mesma forma.
- `character` e `char` sao aliases do mesmo grupo de opcoes.
- `image` e `images` usam o mesmo objeto de opcoes.
- A maioria das formas avancadas exige `@tsparticles/slim` (ou `@tsparticles/all`) ou pacotes de forma dedicados.

Para testar rapidamente com controles Start/Pause e JSON editavel, use [`/playground/shapes`](/pt/playground/shapes).
