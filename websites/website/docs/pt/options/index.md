# Referencia de opcoes

As opcoes de `tsParticles` sao profundas, entao esta pagina funciona como um mapa pratico antes de entrar em cada subopcao.

## Escolha o seu caminho de configuracao

- **Resultado visual rapido**: comece com um preset e sobrescreva os campos-chave.
- **Controle total**: defina `particles`, `interactivity` e `background` manualmente.
- **Abordagem config-first**: comece com `@tsparticles/configs` e refine com seguranca.

## Docs rapidas (locais)

- [`Background & Canvas`](/pt/options/background)
- [`Background Mask`](/pt/options/background-mask)
- [`Full Screen`](/pt/options/fullscreen)
- [`Motion`](/pt/options/motion)
- [`Manual Particles`](/pt/options/manual-particles)
- [`Themes`](/pt/options/themes)
- [`Particles`](/pt/options/particles)
- [`Particles Number`](/pt/options/particles-number)
- [`Particles Move`](/pt/options/particles-move)
- [`Particles Links`](/pt/options/particles-links)
- [`Particles Palette`](/pt/options/particles-palette)
- [`Particles Shape`](/pt/options/particles-shape)
- [`Particles Collisions`](/pt/options/particles-collisions)
- [`Particles Life`](/pt/options/particles-life)
- [`Particles Orbit`](/pt/options/particles-orbit)
- [`Particles Roll`](/pt/options/particles-roll)
- [`Particles Rotate`](/pt/options/particles-rotate)
- [`Interactivity`](/pt/options/interactivity)
- [`Interactivity Click`](/pt/options/interactivity-click)
- [`Interactivity Hover`](/pt/options/interactivity-hover)
- [`Interactivity Div`](/pt/options/interactivity-div)
- [`Interactivity Events`](/pt/options/interactivity-events)
- [`Interactivity Modes`](/pt/options/interactivity-modes)
- [`Plugin: Absorbers`](/pt/options/plugin-absorbers)
- [`Plugin: Emitters`](/pt/options/plugin-emitters)
- [`Plugin: Infection`](/pt/options/plugin-infection)
- [`Plugin: Polygon Mask`](/pt/options/plugin-polygon-mask)
- [`Performance Guide`](/pt/options/performance)

## Paginas de aprofundamento de particulas

- [`Particles Bounce`](/pt/options/particles-bounce)
- [`Particles Color`](/pt/options/particles-color)
- [`Particles Destroy`](/pt/options/particles-destroy)
- [`Particles Group`](/pt/options/particles-group)
- [`Particles Opacity`](/pt/options/particles-opacity)
- [`Particles Palette`](/pt/options/particles-palette)
- [`Particles Repulse`](/pt/options/particles-repulse)
- [`Particles Shadow`](/pt/options/particles-shadow)
- [`Particles Size`](/pt/options/particles-size)
- [`Particles Stroke`](/pt/options/particles-stroke)
- [`Particles Tilt`](/pt/options/particles-tilt)
- [`Particles Twinkle`](/pt/options/particles-twinkle)
- [`Particles Wobble`](/pt/options/particles-wobble)
- [`Particles ZIndex`](/pt/options/particles-zindex)

## Onde fica a documentacao de referencia

- Docs principais de opcoes: [`tsparticles/markdown/Options.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/Options.md)
- Paginas detalhadas de opcoes: [`tsparticles/markdown/Options/`](https://github.com/tsparticles/tsparticles/tree/main/markdown/Options)
- Interfaces de tipos: [`tsparticles/engine/src/Options/Interfaces`](https://github.com/tsparticles/tsparticles/tree/main/engine/src/Options/Interfaces)

## Opcoes raiz mais usadas

- `background`
- `fullScreen`
- `interactivity`
- `particles`
- `detectRetina`
- `preset`
- `responsive`

## Secoes mais usadas

- `background`: base para fundo do canvas e mascaramento.
- `particles.number`: quantidade e densidade.
- `particles.move`: velocidade, direcao e out modes.
- `particles.shape`: circulo, poligono, imagem, emoji, personalizado.
- `particles.palette`: troca rapida de conjuntos de cores coordenados.
- `interactivity`: modos hover/click e efeitos externos.
- `detectRetina`: equilibrio entre qualidade e performance em telas de alta densidade.

## Mapa de particulas (visualizacao aninhada)

Use esta arvore como apoio de navegacao antes de abrir paginas de detalhe:

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

Abra primeiro a documentacao raiz e depois as secoes de aprofundamento:

- Raiz: [`Particles`](/pt/options/particles)
- Em detalhe: [`Particles Number`](/pt/options/particles-number), [`Particles Move`](/pt/options/particles-move), [`Particles Links`](/pt/options/particles-links)

## Workflow seguro de opcoes

1. Comece com uma configuracao funcional de demos ou presets.
2. Altere uma secao por vez.
3. Valide com TypeScript (`IOptions`) no codigo da aplicacao.
4. Mantenha as opcoes de producao em arquivos JSON dedicados.

## Exemplo tipado minimo

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

## Guardrails de performance

- Prefira `@tsparticles/slim`, exceto quando precisar de plugins avancados.
- Mantenha a contagem de particulas proporcional a area do container.
- Faca perfil em dispositivos reais antes de adicionar interacoes pesadas.

## Referencias relacionadas

- Docs do pacote de configs: <https://github.com/tsparticles/tsparticles/blob/main/utils/configs/README.md>
- Pasta de presets: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- Pasta de paletas: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

Para detalhes completos de cada subopcao, use tambem as paginas fonte em `tsparticles/markdown/Options` listadas acima.
