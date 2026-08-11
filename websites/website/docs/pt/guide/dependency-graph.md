# Gráfico de Dependência

Este é um mapa prático da camada de pacotes exposta no README principal do `tsParticles`.

Para o gráfico completo e exaustivo, consulte:

- <https://github.com/tsparticles/tsparticles/blob/main/README.md#dependency-graph>

## Fluxo de pacotes de alto nível

```text
tsParticles Engine
`- tsParticles Basic
   |- tsParticles Particles
   |- tsParticles Confetti
   |- tsParticles Fireworks
   `- tsParticles Slim
      `- tsparticles
         `- tsParticles All
```

## Como usar este mapa

- Comece com `engine` + `slim` para a maioria dos aplicativos de produção.
- Mude para `tsparticles` se precisar de interações/plug-ins extras integrados.
- Mude para `all` somente quando precisar do conjunto completo de recursos.
- Use pacotes dedicados (`confetti`, `fireworks`, `particles`) para efeitos focados.

## Páginas relacionadas

- [`/guide/getting-started`](/pt/guide/getting-started)
- [`/guide/installation`](/pt/guide/installation)
- [`/options/performance`](/pt/options/performance)
