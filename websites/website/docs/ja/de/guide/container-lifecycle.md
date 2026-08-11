# Container-Lebenszyklus

Ein `Container` ist die von `tsParticles.load(...)` zurückgegebene Laufzeitinstanz.

## Grundlegender Lebenszyklus

```ts
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

container = await tsParticles.load({ id: "tsparticles", options });
container.pause();
container.play();
container.destroy();
```

## Empfohlenes Muster

- `start`: Container mit aktuellen Optionen erstellen/neu erstellen.
- `stop`: `pause()`, wenn nicht sichtbar oder nicht erforderlich.
- `resume`: `play()`, wenn der Benutzer die Animation zurückhaben möchte.
- `destroy`: Ressourcen beim Routen-/Komponentenabbau freigeben.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Container.md>
