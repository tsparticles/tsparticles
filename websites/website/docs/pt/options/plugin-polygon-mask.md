# Opção de plug-in: máscara poligonal

`polygonMask` restringe partículas a SVG ou regiões baseadas em polígonos.

## Exemplo

```ts
polygonMask: {
  enable: true,
  type: "inline",
  move: {
    radius: 10,
  },
  url: "https://particles.js.org/images/smalldeer.svg",
}
```

## Notas

- Use caminhos SVG otimizados para melhor desempenho em tempo de execução.
- Validar o carregamento do caminho e o comportamento de fallback.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/PolygonMask.md>
