# Ciclo de vida do contêiner

Um `Container` é a instância de tempo de execução retornada por `tsParticles.load(...)`.

## Ciclo de vida básico

```ts
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

container = await tsParticles.load({ id: "tsparticles", options });
container.pause();
container.play();
container.destroy();
```

## Padrão recomendado

- `start`: cria/recria container com opções atuais.
- `stop`: `pause()` quando não está visível ou não é necessário.
- `resume`: `play()` quando o usuário deseja a animação de volta.
- `destroy`: recursos gratuitos na desmontagem de rotas/componentes.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Container.md>
