# Guia de desempenho

Aqui estão as principais alavancas para evitar quedas de FPS.

## 1) Contagem de partículas

```ts
particles: {
  number: {
    value: 50,
    density: {
      enable: true,
      area: 900
    }
  }
}
```

Menos partículas = menos chamadas de desenho e menos colisões.

## 2) Movimento e links

- Reduza `move.speed` quando não precisar de efeito energético.
- Limite `links.distance` e `links.opacity`.
- Evite combinações pesadas (por exemplo `links` + `collisions` + efeitos avançados) em tela cheia.

## 3) Interatividade

- Mantenha apenas alguns modos ativos.
- No celular, considere desativar o modo suspenso.

## 4) Retina e redimensionamento

```ts
detectRetina: false;
```

Útil em contextos que priorizam o desempenho ou em dispositivos mais fracos.

## 5) Controle manual do ciclo de vida

Para seções caras, use controles explícitos:

- `start` no clique do usuário
- `stop`/`pause` quando a seção não está visível
- `destroy` na desmontagem de página/componente
